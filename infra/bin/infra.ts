#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AirbnbCloneVpcStack } from '../lib/airbnb-clone-vpc-stack';
import { AirbnbCloneServiceStack } from '../lib/airbnb-clone-service-stack';
import { AirbnbCloneDbStack } from '../lib/airbnb-clone-db-stack';
import { AirbnbCloneClusterStack } from '../lib/airbnb-clone-cluster';

const app = new cdk.App();

const vpcStack = new AirbnbCloneVpcStack(app, 'airbnb-clone-vpc-stack', {
  stackName: "airbnb-clone-vpc",
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

const dbStack = new AirbnbCloneDbStack(app, 'airbnb-clone-db-stack', {
  stackName: "airbnb-clone-db",
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  vpc: vpcStack.vpc,
});

const clusterStack = new AirbnbCloneClusterStack(app, 'airbnb-clone-cluster-stack', {
  stackName: "airbnb-clone-cluster",
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  vpc: vpcStack.vpc,
})

const serviceStack = new AirbnbCloneServiceStack(app, 'airbnb-clone-service-stack', {
  stackName: "airbnb-clone-service",
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  vpc: vpcStack.vpc,
  rds: dbStack.rds,
  redis: dbStack.redis,
  alb: clusterStack.alb,
  albSecurityGroup: clusterStack.albSecurityGroup,
  cluster: clusterStack.cluster
});
serviceStack.addDependency(clusterStack);
