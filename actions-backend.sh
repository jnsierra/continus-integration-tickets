#!/bin/bash

ACTION=$1

RED='\033[0;31m'
NC='\033[0m' # No Color
GREEN="\e[32m"

echo "Este es el action $ACTION"

[ "$#" -eq 1 ] || { echo -e "${RED}Invalid use, please use as follows:${NC} actions-backend.sh <ACTION_EXECUTION(clean | restart | stop)> "; exit 1; }

if [[ "$ACTION" = "clean" || "$ACTION" = "restart" || "$ACTION" = "stop" ]] ; 
then 
  echo -e ${GREEN}'[INFO]'${NC}'Valid action'
else 
  echo -e ${RED}'[ERROR]'${NC}'Invalid action'
  exit 1;
fi

if [ "$ACTION" = "clean" ] ; then
  echo -e "${GREEN}[INFO]${NC} Clean jars in folders"
  echo -e "${GREEN}[INFO]${NC} server-business"
  rm -rf server-business/jar/*.jar
  echo -e "${GREEN}[INFO]${NC} server-public-user"
  rm -rf server-public-user/jar/*.jar

  echo -e "${GREEN}[INFO]${NC} server-acceso-datos"
  rm -rf server-acceso-datos/jar/*.jar

  echo -e "${GREEN}[INFO]${NC} server-discovery"
  rm -rf server-discovery/jar/*.jar

  echo -e "${GREEN}[INFO]${NC} server-gateway"
  rm -rf server-gateway/jar/*.jar

  echo -e "${GREEN}[INFO]${NC} server-front "
  rm -rf server-front/*
elif [ "$ACTION" = "restart" ] ; then
  echo -e "${GREEN}[INFO]${NC} delete stack"
  docker stack rm ticket-api
  echo -e "${GREEN}[INFO]${NC} deploy stack"
  docker stack deploy -c docker-compose-stack.yml ticket-api
elif [ "$ACTION" = "stop" ] ; then
  echo -e "${GREEN}[INFO]${NC} stop stack"
  docker stack rm ticket-api
fi


