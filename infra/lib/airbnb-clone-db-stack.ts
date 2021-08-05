import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as elasticache from '@aws-cdk/aws-elasticache';
import * as rds from '@aws-cdk/aws-rds';
import { RemovalPolicy } from '@aws-cdk/core';
import { StorageType } from '@aws-cdk/aws-rds';
import { ISecret } from '@aws-cdk/aws-secretsmanager';

interface AirbnbCloneDbStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}
export class AirbnbCloneDbStack extends cdk.Stack {
  public readonly rds: rds.DatabaseInstance
  public readonly redis: elasticache.CfnCacheCluster;
  
  constructor(scope: cdk.Construct, id: string, props: AirbnbCloneDbStackProps) {
    super(scope, id, props);
    
    const rdsSG = new ec2.SecurityGroup(this, 'ecs-sg',{
      vpc: props.vpc,
      allowAllOutbound: true
    });
    rdsSG.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(5432), 'Postgres Ingress Port');

    this.rds = new rds.DatabaseInstance(this, 'rds-instance', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_12_7
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      storageType: StorageType.GP2,
      // allocatedStorage: 20,
      // maxAllocatedStorage: 20,
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE
      },
      securityGroups: [rdsSG],
      removalPolicy: RemovalPolicy.DESTROY, // testing purposes only
      deletionProtection: false // testing purposes only
    });

    const redisSubnetGroup = new elasticache.CfnSubnetGroup(
      this,
      "redis-subnet-group",
      {
        cacheSubnetGroupName: 'redis-subnet-group',
        description: "redis subnet group id",
        subnetIds: props.vpc.privateSubnets.map(subnet => subnet.subnetId),
      }
    );
    const redisSecurityGroup = new ec2.SecurityGroup(this, 'redis-security-group', { vpc: props.vpc });
    redisSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(6379), 'Redis Ingress Port');


    this.redis = new elasticache.CfnCacheCluster(this, 'redis-cluster', {
      cacheNodeType: 'cache.t2.micro',
      engine: 'redis',
      engineVersion: '5.0.6',
      numCacheNodes: 1,
      port: 6379,
      azMode: 'single-az',
      cacheSubnetGroupName: redisSubnetGroup.cacheSubnetGroupName,
      vpcSecurityGroupIds: [ redisSecurityGroup.securityGroupId ]
    });
    this.redis.addDependsOn(redisSubnetGroup);
  }
}
