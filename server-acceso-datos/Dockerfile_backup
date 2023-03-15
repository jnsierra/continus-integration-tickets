FROM postgres:latest

ENV PATH=$PATH:/opt/amazon-corretto-17.0.6.10.1-linux-x64/bin
ENV PGPASSFILE /opt/pgpass.conf
ADD pgpass.conf /opt/

RUN apt-get update && \
    apt-get install curl -y

WORKDIR /opt/ 

RUN curl -LO https://corretto.aws/downloads/latest/amazon-corretto-17-x64-linux-jdk.tar.gz

RUN apt-get update && \
    apt-get install tar -y
RUN tar -xzf amazon-corretto-17-x64-linux-jdk.tar.gz && \
    rm -rf amazon-corretto-17-x64-linux-jdk.tar.gz

RUN chmod 0600 pgpass.conf

ADD jar/api-acceso-datos-0.0.1-SNAPSHOT.jar /opt/
ADD execute-jar.sh /opt/

COPY wait-for-postgres.sh /opt/
COPY wait-for-discovery.sh /opt/
RUN chmod +x wait-for-postgres.sh
RUN chmod +x wait-for-discovery.sh
RUN chmod +x execute-jar.sh  

ENTRYPOINT  ["sh","/opt/execute-jar.sh"]
