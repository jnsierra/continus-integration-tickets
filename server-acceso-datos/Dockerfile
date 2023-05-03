# First stage
FROM postgres:15-alpine

ADD wait-for-postgres.sh /opt/

WORKDIR /opt/
RUN chmod +x wait-for-postgres.sh
CMD wait-for-postgres.sh $SERVER_BD

# Second stage 
FROM amazoncorretto:17-alpine

RUN apk add --no-cache tzdata
ENV TZ=America/Bogota

RUN apk --no-cache add curl
ADD jar/api-acceso-datos-0.0.1-SNAPSHOT.jar /opt/
ADD wait-for-discovery.sh /opt/
ADD execute-jar.sh /opt/

WORKDIR /opt/

RUN chmod +x execute-jar.sh
RUN chmod +x wait-for-discovery.sh

ENTRYPOINT  ["sh","/opt/execute-jar.sh"]
