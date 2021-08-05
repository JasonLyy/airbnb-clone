import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as elb from '@aws-cdk/aws-elasticloadbalancingv2';
import { DockerImageAsset } from '@aws-cdk/aws-ecr-assets';
import * as path from 'path';
import { ListenerAction, ListenerCondition } from '@aws-cdk/aws-elasticloadbalancingv2';
import * as rds from '@aws-cdk/aws-rds';
import * as elasticache from '@aws-cdk/aws-elasticache';
import cdkOutputs from '../cdk-outputs.json';

interface AirbnbCloneServiceStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
  rds: rds.DatabaseInstance;
  redis: elasticache.CfnCacheCluster;
  alb: elb.ApplicationLoadBalancer;
  albSecurityGroup: ec2.SecurityGroup;
  cluster: ecs.Cluster;
}
export class AirbnbCloneServiceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: AirbnbCloneServiceStackProps) {
    super(scope, id, props);

    const albListener = new elb.ApplicationListener(this, 'alb-listener', 
    {
      loadBalancer: props.alb,
      port: 80,
      open: true
    });

    const serviceSecurityGroup = new ec2.SecurityGroup(this, 'service-securitygroup', {
      vpc: props.vpc,
      allowAllOutbound: true,
    })
    serviceSecurityGroup.connections.allowFrom(props.albSecurityGroup, ec2.Port.allTcp(), "Ingress Application Load Balancer");

    const backendTaskDefinition = new ecs.FargateTaskDefinition(this, 'backend-task-definition', {
      cpu: 256,
      memoryLimitMiB: 512,
    });
    const backendImageAsset = new DockerImageAsset(this, 'backend-image', {
      directory: path.resolve(__dirname, "..", '..', "backend", ),
      file: "Dockerfile.prod"
    });
    props.rds.secret!.grantRead(backendTaskDefinition.taskRole);
    backendTaskDefinition.addContainer('backend-container', {
      image: ecs.ContainerImage.fromDockerImageAsset(backendImageAsset),
      memoryLimitMiB: 256,
      portMappings: [{
        containerPort: 80
      }],
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: "backend"}),
      secrets: {
        DB_HOST: ecs.Secret.fromSecretsManager(props.rds.secret!, 'host'),
        DB_PORT: ecs.Secret.fromSecretsManager(props.rds.secret!, 'port'),
        DB_USER: ecs.Secret.fromSecretsManager(props.rds.secret!, 'username'),
        DB_PASSWORD : ecs.Secret.fromSecretsManager(props.rds.secret!, 'password'),
      },
      environment: { 
        ENV: "production",
        DB_NAME: 'postgres',
        DB_TIMEZONE: 'Australia/Melbourne',
        REDIS_HOST: props.redis.attrRedisEndpointAddress,
        REDIS_PORT: props.redis.attrRedisEndpointPort,
        JWT_SECRET: 'SHIELD_616'
      }
    });
    const backendService = new ecs.FargateService(this, 'backend-service', {
      cluster: props.cluster,
      taskDefinition: backendTaskDefinition,
      securityGroups: [serviceSecurityGroup],
      desiredCount: 1,
      
    });
    
    const backendTargetGroup = new elb.ApplicationTargetGroup(this, "alb-backend-target-group", {
      vpc: props.vpc,
      port: 80,
      protocol: elb.ApplicationProtocol.HTTP,
      targetType: elb.TargetType.IP,
      targets: [backendService],
      healthCheck: {
        path: "/backend/health",
      }
    });
    const backendRule = new elb.ApplicationListenerRule(this, 'alb-backend-rule', {
      listener: albListener,
      priority: 1,
      action: ListenerAction.forward([backendTargetGroup]),
      conditions: [ListenerCondition.pathPatterns(["/backend/*", "/backend/graphql/*"])],
    });
    albListener.addTargetGroups('alb-target-group-backend', {
      targetGroups: [backendTargetGroup]
    });

    console.log(cdkOutputs["airbnb-clone-cluster"].albdnsname);

    const frontendImageAsset = new DockerImageAsset(this, 'frontend-image', {
      directory: path.resolve(__dirname, "..", '..', "frontend", ),
      file: "Dockerfile.prod",
      buildArgs: {
        "BACKEND_HOST": cdkOutputs["airbnb-clone-cluster"].albdnsname
      }
    })
    const frontendTaskDefinition = new ecs.FargateTaskDefinition(this, 'frontend-task-definition', {
      cpu: 256,
      memoryLimitMiB: 512,
    });
    const frontendContainer = frontendTaskDefinition.addContainer('frontend', {
      image: ecs.ContainerImage.fromDockerImageAsset(frontendImageAsset),
      memoryLimitMiB: 256,
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: "frontend"}),
      portMappings: [{
        containerPort: 80
      }]
    });
    const frontendService = new ecs.FargateService(this, 'frontend-service', {
      cluster: props.cluster,
      taskDefinition: frontendTaskDefinition,
      securityGroups: [serviceSecurityGroup],
      desiredCount: 1,
    });

    const frontendTargetGroup = new elb.ApplicationTargetGroup(this, "alb-frontend-target-group", {
      vpc: props.vpc,
      port: 80,
      protocol: elb.ApplicationProtocol.HTTP,
      targetType: elb.TargetType.IP,
      targets: [frontendService]
    });
    frontendTargetGroup.registerListener(albListener);
    albListener.addTargetGroups('alb-target-group-frontend', {
      targetGroups: [frontendTargetGroup]
    });
  }
}
