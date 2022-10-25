#!/bin/bash
set -x
PATH=$PATH:/usr/local/bin; export PATH
REGION=us-east-1
REPOSITORY_NAME=web
CLUSTER=PROD
FAMILY=web
SERVICE_NAME=web

#STORE REPOSITORY URL IN VARIBALE
REPOSITORY_URI=`aws ecr describe-repositories --repository-names ${REPOSITORY_NAME} --region ${REGION} | jq .repositories[].repositoryUri | tr '"' ' '`

#REPLACE THE BUILD NUMBER AND REPOSITORY URI PLACEHOLDERS WITH THE CONSTANT ABOVE
cd ci-cd/prod-deploy/
sed -e 's/latest/dev-web-v_'${BUILD_NUMBER}'/g' prod-web-taskdef.json > prod-web-v-${BUILD_NUMBER}.json

#REGISTER TASK DEFINATION IN THE REPOSITORY
aws ecs  register-task-definition --family ${FAMILY} --container-definitions file://prod-web-v-${BUILD_NUMBER}.json  --execution-role-arn ecsTaskExecutionRole  --network-mode bridge  --requires-compatibilities EC2 --region ${REGION}

SERVICES=`aws ecs describe-services --services ${SERVICE_NAME} --cluster ${CLUSTER} --region ${REGION} | jq .failures[]`

# GET LATEST REVISION
REVISION=`aws ecs describe-task-definition --task-definition ${FAMILY} --region ${REGION} | grep revision | tr "/" " " | awk '{print $2}' | sed 's/"$//'`

#UPDATE SERVICES

aws ecs update-service --cluster ${CLUSTER} --region ${REGION} --service ${SERVICE_NAME} --desired-count 2 --task-definition ${FAMILY}:${REVISION} --deployment-configuration maximumPercent=100,minimumHealthyPercent=0 --force-new-deployment



