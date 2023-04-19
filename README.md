
<a name="readme-top"></a>
# continus-integration-tickets
Proyecto con el cual se puede desplegar el backend de tickets

## Tabla de contenido
* [Configuración Docker](#configuración-docker)
* [Volumenes](#volumenes)
* [Configuración url volumenes](#configuración-url-volumenes)
* [Arranque Backend](#arranque-backend)
* [Arrancamos Frontend](#arrancamos-frontend)

## Configuración Docker
Se debe realizar una pequeña configuración para permitir el transporte de información por medio de http al registry

* Creamos o modificamos el siguiente directorio.
```
/etc/docker/daemon.json
```
* Adicionamos lo siguiente en el archivo.
```
{ "insecure-registries":["<ip-server>:5000"] }
``` 
* Reiniciamos el servicio de docker
```
sudo service docker restart
```
## Volumenes
Para el correcto funcionamiento del proyecto se deben crear tres directorios para almacenar los volumenes de los servicios de base de datos, registry y repositorio de documentos de la aplicacion.

```bash
mkdir -p <PATH_VOLUMES_HOME>/vol_registry <PATH_VOLUMES_HOME>/vol_postgresql <PATH_VOLUMES_HOME>/vol_repository
```

## Configuración url volumenes
Se ingresa a ``` conf ``` en esta ruta se almacenaran los archivos con la variables de los volumenes que usaremos al desplegar docker compose.
Se creara un archivo por cada configuración personalizada que se desee.

* Crear una configuración personalizada:
```bash
touch <CUSTOM_CONFIG>.conf
```
* Insertamos la siguiente configuración en el archivo previamente creado `<CUSTOM_CONFIG>.conf`
```bash
VOL_PG=<PATH_VOL_POSTGRES>
VOL_REPO=<PATH_VOL_REPO>
PORT_EXPOSE_POSTGRES=<PORT_EXPOSE>
```
## Arranque Backend
Ejecutamos el siguiente comando
```bash
./generate-artifact.sh <PATH_GIT_BACK_PROYECT> <PATH_VOL_REGISTRY> <NAME_FILE_VAR_CONFIG_DOCKER_COMPOSE> <PORT_REGISTRY>
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Arrancamos Frontend
Ejecutamos el siguiente comando
```bash
./generate-front.sh  <PATH_GIT_FRONTEND_PROYECT> <NAME_PROYECT> <PORT_REGISTRY>
```
**NOTA:** Se debe tener en cuenta que el campo `<PORT_REGISTRY>` del arranque para backend y frontend debe ser el mismo

<p align="right">(<a href="#readme-top">back to top</a>)</p>



