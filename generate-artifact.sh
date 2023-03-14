#!/bin/bash
PATH_PROYECT=$1

RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e ${RED}'[DEBUG]'${NC}' Stop registry'
docker stop repo-api
docker rm repo-api
echo -e ${RED}'[DEBUG]'${NC}' Run registry'
docker run -d --name repo-api -p 5000:5000 -v /volumenes/vol_registry:/var/lib/registry registry:latest

[ "$#" -ge 1 ] || { echo 'Usage: generate-artifact.sh <PATH_GIT_PROYECT>'; exit 1; } 
echo $#
echo -e ${RED}'[DEBUG]'${NC} ' Kill Java process'
pkill -9 java
echo -e ${RED}'[DEBUG]'${NC} ' Git pull proyect:' $1
git -C $1 pull

echo -e ${RED}'[DEBUG]'${NC}' Bajo el servicio de docker-compose '
docker-compose stop
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

echo -e ${RED}'[DEBUG]'${NC}' Delete images'
docker rmi localhost:5000/server-discovery:latest
docker rmi localhost:5000/server-gateway:latest
docker rmi localhost:5000/server-acceso-datos:latest
docker rmi localhost:5000/server-business:latest

echo -e ${RED}'[DEBUG]'${NC}' Build images '
cd server-discovery
docker build -t "localhost:5000/server-discovery:latest" .
cd ..
cd server-gateway
docker build -t "localhost:5000/server-gateway:latest" .
cd ..
echo -e ${RED}'[DEBUG]'${NC}' Construir imagen de acceso a datos'
cd server-acceso-datos
docker build -t "localhost:5000/server-acceso-datos:latest" .
cd ..
echo -e ${RED}'[DEBUG]'${NC}' Construccion imagen de business '
echo -e ${RED}'*****************************'${NC}
pwd
echo -e ${RED}'*****************************'${NC}
cd server-business
docker build -t "localhost:5000/server-business:latest" .
cd ..


echo -e ${RED}'[DEBUG]'${NC}' Push image services'
docker push localhost:5000/server-discovery:latest
docker push localhost:5000/server-gateway:latest
docker push localhost:5000/server-acceso-datos:latest
docker push localhost:5000/server-business:latest

echo -e ${RED}'[DEBUG]'${NC}' Up Docker Compose'
docker-compose up -d
