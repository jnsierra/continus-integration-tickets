sh wait-for-discovery.sh $SERVER_DISCOVERY
java -jar -Dspring.profiles.active=$PROFILE_JAR api-public-users-0.0.1-SNAPSHOT.jar
