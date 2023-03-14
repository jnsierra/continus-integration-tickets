FROM amazoncorretto:17-alpine
RUN apk --no-cache add curl
ADD jar/api-business-0.0.1-SNAPSHOT.jar /opt/
ADD execute-jar.sh /opt/
ADD wait-for-discovery.sh /opt/
WORKDIR /opt/
#USER root
RUN chmod +x execute-jar.sh  
RUN chmod +x wait-for-discovery.sh
ENTRYPOINT  ["sh","/opt/execute-jar.sh"]
