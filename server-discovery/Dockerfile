FROM amazoncorretto:17-alpine

RUN apk add --no-cache tzdata
ENV TZ=America/Bogota

ADD jar/api-service-discovery.jar /opt/
ADD execute-jar.sh /opt/
WORKDIR /opt/
RUN chmod +x execute-jar.sh  
ENTRYPOINT  ["sh","/opt/execute-jar.sh"]
