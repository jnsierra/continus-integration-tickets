FROM amazoncorretto:17-alpine
RUN apk --no-cache add curl
COPY jar/api-business*.jar /opt/
COPY execute-jar.sh /opt/
COPY wait-for-discovery.sh /opt/

RUN apk add --no-cache tzdata
ENV TZ=America/Bogota

WORKDIR /opt/
CMD mkdir repo_qr
#USER root
RUN chmod +x execute-jar.sh  
RUN chmod +x wait-for-discovery.sh
ENTRYPOINT  ["sh","/opt/execute-jar.sh"]
