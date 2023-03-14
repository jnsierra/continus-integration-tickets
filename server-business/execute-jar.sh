sh wait-for-discovery.sh $SERVER_DISCOVERY
java -jar -Dspring.profiles.active=$PROFILE_JAR api-business-0.0.1-SNAPSHOT.jar
