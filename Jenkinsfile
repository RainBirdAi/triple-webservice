env.RELEASE_VERSION = '1.0'

node {
    stage 'Pull from Git'
    git branch: 'release', credentialsId: '4ae664cd-c65c-414e-8a26-b55da03d0520', url: 'git@github.com:RainBirdAi/triple-webservice.git'

    stage 'Docker Build'
    sh '''#!/bin/bash
    DOCKER_LOGIN=`aws ecr get-login --no-include-email --region eu-west-2`
    ${DOCKER_LOGIN}'''
    docker.build('666909753182.dkr.ecr.eu-west-2.amazonaws.com/triple-webservice:$RELEASE_VERSION.$BUILD_NUMBER')

    stage 'Docker Push'
    docker.image('666909753182.dkr.ecr.eu-west-2.amazonaws.com/triple-webservice:$RELEASE_VERSION.$BUILD_NUMBER').push()
    docker.image('666909753182.dkr.ecr.eu-west-2.amazonaws.com/triple-webservice:$RELEASE_VERSION.$BUILD_NUMBER').push('latest')

    stage 'Test Deploy'
    sh '''#!/bin/bash

    #Constants
    REGION=eu-west-2
    REPOSITORY_NAME=triple-webservice
    CLUSTER=Test-Rainbird
    FAMILY=`sed -n \'s/.*"family": "\\(.*\\)",/\\1/p\' taskdef.json`
    NAME=triple-webservice
    SERVICE_NAME=${NAME}-service
    SECURITY_GROUP=sg-0e9987d8900c5c171
    PRIVATE_SUBNET1=subnet-57c3f92c
    PRIVATE_SUBNET2=subnet-43ce840e
    TARGET_GROUP_ARN=arn:aws:elasticloadbalancing:eu-west-2:666909753182:targetgroup/TestTripleWebservice/dadfe9baa88bf323

    #Store the repositoryUri as a variable
    REPOSITORY_URI=`aws ecr describe-repositories --repository-names ${REPOSITORY_NAME} --region ${REGION} | jq .repositories[].repositoryUri | tr -d \'"\'`

    #Replace the build number and respository URI placeholders with the constants above
    sed -e "s;%BUILD_NUMBER%;${BUILD_NUMBER};g" -e "s;%RELEASE_VERSION%;${RELEASE_VERSION};g" -e "s;%REPOSITORY_URI%;${REPOSITORY_URI};g" taskdef.json > ${NAME}-${RELEASE_VERSION}.${BUILD_NUMBER}.json
    #sed -e "s;%BUILD_NUMBER%;${BUILD_NUMBER};g" -e "s;%RELEASE_VERSION%;${RELEASE_VERSION};g" -e "s;%REPOSITORY_URI%;${REPOSITORY_URI};g" svcdef.json > ${SERVICE_NAME}-${RELEASE_VERSION}.${BUILD_NUMBER}.json

    #Register the task definition in the repository
    aws ecs register-task-definition --family ${FAMILY} --cli-input-json file://${WORKSPACE}/${NAME}-${RELEASE_VERSION}.${BUILD_NUMBER}.json --region ${REGION}
    SERVICES=`aws ecs describe-services --services ${SERVICE_NAME} --cluster ${CLUSTER} --region ${REGION} | jq .failures[]`

    #Get latest revision
    REVISION=`aws ecs describe-task-definition --task-definition ${NAME} --region ${REGION} | jq .taskDefinition.revision`

    #Create or update service
    if [ "$SERVICES" == "" ]; then
      echo "entered existing service"
      DESIRED_COUNT=`aws ecs describe-services --services ${SERVICE_NAME} --cluster ${CLUSTER} --region ${REGION} | jq .services[].desiredCount`
      if [ ${DESIRED_COUNT} = "0" ]; then
        DESIRED_COUNT="1"
      fi
      aws ecs update-service --cluster ${CLUSTER} \
      --region ${REGION} --service ${SERVICE_NAME} \
      --task-definition ${FAMILY}:${REVISION} --desired-count ${DESIRED_COUNT} \
      --load-balancers "targetGroupArn="$TARGET_GROUP_ARN",containerName="$NAME",containerPort=8888" \
    else
      echo "entered new service"
      aws ecs create-service --cluster ${CLUSTER} \
      --service-name ${SERVICE_NAME} \
      --task-definition ${FAMILY} \
      --region ${REGION} --launch-type FARGATE \
      --desired-count 1 \
      --network-configuration "awsvpcConfiguration={subnets=["$PRIVATE_SUBNET1","$PRIVATE_SUBNET2"],securityGroups=["$SECURITY_GROUP"],assignPublicIp="DISABLED"}" \
      --load-balancers "targetGroupArn="$TARGET_GROUP_ARN",containerName="$NAME",containerPort=8888" \
      --deployment-configuration "maximumPercent=200,minimumHealthyPercent=0"

    fi'''

    sleep 60
    slackSend color: 'good', message: 'SUCCESS: Triple Webservice'
}
