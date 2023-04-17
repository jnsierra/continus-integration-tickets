#!/bin/bash
PATH_PROYECT=$1
NAME_PROYECT=$2
PORT_REGISTRY=$3

RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e ${RED}'[DEBUG]'${NC}' Borrar archivos del front'
rm -rf server-front/*

[ "$#" -eq 3 ] || { echo 'Usage: generate-front.sh <PATH_GIT_PROYECT> <NAME_PROYECT> <PORT_REGISTRY>'; exit 1; }
echo $#
echo -e ${RED}'[DEBUG]'${NC}' Git checkout main' ${PATH_PROYECT}
git -C ${PATH_PROYECT} checkout main

echo -e ${RED}'[DEBUG]'${NC}' Git pull proyect' ${PATH_PROYECT}
git -C ${PATH_PROYECT} pull

echo -e ${RED} '[DEBUG]' ${NC} ' Copiamos los archivos'
mkdir -p ./server-front/${NAME_PROYECT}
rsync -av --exclude '.angular/' --exclude '.editorconfig/' --exclude '.git/' --exclude 'node_modules/' ${PATH_PROYECT} ./server-front/

echo -e ${RED} '[DEBUG]' ${NC} ' Paramos el contenedor de front y lo borro '
docker stop frontend-hash
docker rm frontend-hash
echo -e ${RED} '[DEBUG]' ${NC} ' Borramos la imagen del docker'
docker rmi localhost:${PORT_REGISTRY}/frontend-hash:latest
echo -e ${RED} '[DEBUG]' ${NC} ' Construimos la imagen del docker' 
cd server-front/${NAME_PROYECT}
pwd
docker build -t "localhost:${PORT_REGISTRY}/frontend-hash:latest" .

echo -e ${RED} '[DEBUG]' ${NC} 'Hacemos push a la imagen'
docker push localhost:${PORT_REGISTRY}/frontend-hash:latest
echo -e ${RED} '[DEBUG]' ${NC} 'Hacemos run'
docker run -d -p 5010:80 \
     --name frontend-hash \
        localhost:${PORT_REGISTRY}/frontend-hash:latest 

