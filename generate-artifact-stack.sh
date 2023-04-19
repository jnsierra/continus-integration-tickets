#!/bin/bash
PATH_PROYECT=$1
PATH_VOL_REG=$2
FILE_CONFIG=$3
PORT_REGISTRY=$4


RED='\033[0;31m'
NC='\033[0m' # No Color


[ "$#" -eq 4 ] || { echo -e "${RED}Invalid use, please use as follows:${NC} generate-artifact.sh <PATH_GIT_BACK_PROYECT> <PATH_VOL_REGISTRY> <NAME_FILE_VAR_CONFIG_DOCKER_COMPOSE> <PORT_REGISTRY> "; exit 1; }

echo -e ${RED}'[DEBUG]'${NC}' Stop registry'
docker stop repo-api
docker rm repo-api
echo -e ${RED}'[DEBUG]'${NC}' Run registry'
docker run -d --name repo-api -p ${PORT_REGISTRY}:5000 -v ${PATH_VOL_REG}:/var/lib/registry registry:latest

# echo -e ${RED}'[DEBUG]'${NC} ' Kill Java process'
# pkill -9 java
echo -e ${RED}'[DEBUG]'${NC} ' Git pull proyect:' ${PATH_PROYECT}
git -C ${PATH_PROYECT} pull

echo -e ${RED}'[DEBUG]'${NC} ' Clean and install proyect with git '

M2_HOME='/opt/apache-maven-3.9.0'
PATH="$M2_HOME/bin:$PATH"
export PATH

echo -e ${RED}'[DEBUG]'${NC}' Clean proyect'
mvn -f ${PATH_PROYECT}/pom.xml clean
mvn -f ${PATH_PROYECT}/pom.xml install

echo -e ${RED}'[DEBUG]'${NC}' Copy jar services '
cp ${PATH_PROYECT}/api-service-discovery/target/api-service-discovery.jar ./server-discovery/jar/
cp ${PATH_PROYECT}/api-gateway/target/api-gateway.jar ./server-gateway/jar/
cp ${PATH_PROYECT}/api-acceso-datos/target/api-acceso-datos-0.0.1-SNAPSHOT.jar ./server-acceso-datos/jar/
cp ${PATH_PROYECT}/api-business/target/api-business-0.0.1-SNAPSHOT.jar ./server-business/jar/
cp ${PATH_PROYECT}/api-public-users/target/api-public-users-0.0.1-SNAPSHOT.jar ./server-public-user/jar/

echo -e ${RED}'[DEBUG]'${NC}' Bajo el servicio de docker-compose '
docker stack rm api-service
## docker-compose --env-file ./conf/${FILE_CONFIG} stop
## echo -e ${RED}'[DEBUG]'${NC}' Borro los contenedores'
## docker-compose --env-file ./conf/${FILE_CONFIG} rm -f

echo -e ${RED}'[DEBUG]'${NC}' Delete images'
docker rmi localhost:${PORT_REGISTRY}/server-discovery:latest
docker rmi localhost:${PORT_REGISTRY}/server-gateway:latest
docker rmi localhost:${PORT_REGISTRY}/server-acceso-datos:latest
docker rmi localhost:${PORT_REGISTRY}/server-business:latest
docker rmi localhost:${PORT_REGISTRY}/server-public-user:latest

echo -e ${RED}'[DEBUG]'${NC}' Build images '
cd server-discovery
docker build -t "localhost:${PORT_REGISTRY}/server-discovery:latest" .
cd ..
echo -e ${RED}'[DEBUG]'${NC}' Build gateway image '
cd server-gateway
docker build -t "localhost:${PORT_REGISTRY}/server-gateway:latest" .
cd ..
echo -e ${RED}'[DEBUG]'${NC}' Construir imagen de acceso a datos'
cd server-acceso-datos
docker build -t "localhost:${PORT_REGISTRY}/server-acceso-datos:latest" .
cd ..

echo -e ${RED}'[DEBUG]'${NC}' Construccion imagen de public '
echo -e ${RED}'*****************************'${NC}
pwd
echo -e ${RED}'*****************************'${NC}
cd server-public-user
docker build -t "localhost:${PORT_REGISTRY}/server-public-user:latest" .
cd ..

echo -e ${RED}'[DEBUG]'${NC}' Construccion imagen de business '
echo -e ${RED}'*****************************'${NC}
pwd
echo -e ${RED}'*****************************'${NC}
cd server-business
docker build -t "localhost:${PORT_REGISTRY}/server-business:latest" .
cd ..


echo -e ${RED}'[DEBUG]'${NC}' Push image services'
docker push localhost:${PORT_REGISTRY}/server-discovery:latest
docker push localhost:${PORT_REGISTRY}/server-gateway:latest
docker push localhost:${PORT_REGISTRY}/server-acceso-datos:latest
docker push localhost:${PORT_REGISTRY}/server-business:latest
docker push localhost:${PORT_REGISTRY}/server-public-user:latest

echo -e ${RED}'[DEBUG]'${NC}' Up Docker Compose'
docker stack deploy -c docker-compose-stack.yml ticket-api
