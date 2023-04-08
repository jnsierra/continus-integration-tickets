#!/bin/bash
PATH_PROYECT=$1
NAME_PROYECT=$2

RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e ${RED}'[DEBUG]'${NC}' Borrar archivos del front'
rm -rf server-front/*

[ "$#" -ge 1 ] || { echo 'Usage: generate-front.sh <PATH_GIT_PROYECT>'; exit 1; }
echo $#
echo -e ${RED}'[DEBUG]'${NC}' Git checkout main' ${PATH_PROYECT}
git -C ${PATH_PROYECT} checkout main

echo -e ${RED}'[DEBUG]'${NC}' Git pull proyect' ${PATH_PROYECT}
git -C ${PATH_PROYECT} pull

echo -e ${RED} '[DEBUG]' ${NC} ' Copiamos los archivos'
cp -r ${PATH_PROYECT}/ ./server-front/

echo -e ${RED} '[DEBUG]' ${NC} ' Paramos el contenedor de front y lo borro '
docker stop frontend-hash
docker rm frontend-hash
echo -e ${RED} '[DEBUG]' ${NC} ' Borramos la imagen del docker'
docker rmi localhost:5000/frontend-hash:latest
echo -e ${RED} '[DEBUG]' ${NC} ' Construimos la imagen del docker' 
cd server-front/${NAME_PROYECT}
pwd
docker build -t "localhost:5000/frontend-hash:latest" .

docker push localhost:5000/frontend-hash:latest

docker run -d -p 5010:80 \
     --name frontend-hash \
        localhost:5000/frontend-hash:latest
