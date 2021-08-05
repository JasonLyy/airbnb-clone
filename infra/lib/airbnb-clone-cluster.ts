import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as elb from '@aws-cdk/aws-elasticloadbalancingv2';

interface AirbnbCloneServiceClusterProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}
export class AirbnbCloneClusterStack extends cdk.Stack {
  public alb: elb.ApplicationLoadBalancer;
  public albSecurityGroup: ec2.SecurityGroup;
  public cluster: ecs.Cluster;

  constructor(scope: cdk.Construct, id: string, props: AirbnbCloneServiceClusterProps) {
    super(scope, id, props);

    this.alb = new elb.ApplicationLoadBalancer(this, 'alb', {
      vpc: props.vpc,
      vpcSubnets: {
        subnets: props.vpc.publicSubnets
      },
      internetFacing: true,
    });
    this.albSecurityGroup = new ec2.SecurityGroup(this, 'alb-securitygroup', {
      vpc: props.vpc, 
      allowAllOutbound: true
    })
    this.albSecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "Allow HTTP traffic"
    );
    this.alb.addSecurityGroup(this.albSecurityGroup);
    
    this.cluster = new ecs.Cluster(this, 'cluster', {
      vpc: props.vpc,
    });

    new cdk.CfnOutput(this, 'alb-dns-name', {
      value: this.alb.loadBalancerDnsName,
      description: "DNS name of ALB load balancer",
      exportName: "albDnsName"
    });
  }
}
