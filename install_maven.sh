#!/bin/bash
MAVEN_VERSION=$1

[ "$#" -eq 1 ] || { echo 'Usage: maven_install.sh <VERSION_MAVEN>'; exit 1; }

mkdir maven
rm -rf ./maven/*
## Instalamos Java 17 
wget -O ./maven/java-17.tar.gz https://corretto.aws/downloads/latest/amazon-corretto-17-x64-linux-jdk.tar.gz 
wget -O ./maven/maven.tar.gz https://dlcdn.apache.org/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz

cd maven

tar -xvf java-17.tar.gz

rm -rf java-17.tar.gz


tar -xvf maven.tar.gz

rm -rf maven.tar.gz
DIRECTORY=$(pwd)

cat << EOF > /etc/profile.d/maven.sh
#!/bin/sh
export JAVA_HOME=${DIRECTORY}/amazon-corretto-17.0.7.7.1-linux-x64
export MAVEN_HOME=${DIRECTORY}/apache-maven-${MAVEN_VERSION}
export M2_HOME=${DIRECTORY}/apache-maven-${MAVEN_VERSION}
export M2=${DIRECTORY}/apache-maven-${MAVEN_VERSION}/bin
export PATH=${DIRECTORY}/apache-maven-${MAVEN_VERSION}/bin:${DIRECTORY}/amazon-corretto-17.0.7.7.1-linux-x64/bin:$PATH
EOF
source /etc/profile.d/maven.sh
echo maven installed to ${DIRECTORY}
mvn --version
