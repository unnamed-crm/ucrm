# Unnamed CRM

![example workflow](https://github.com/ignavan39/ucrm-go/actions/workflows/build.yml/badge.svg)

### How to start:

#### Local development

First start:
```bash
$ chmod +x ./.local/run  
$ ./.local/run
```
or do it yourself / the bottom line is that you need to create a subnet in docker
for example:
```bash
$ docker network create ucrm --subnet 172.4.4.0/24
$ docker-compose up --build
```

subsequent runs can simply be
```bash
$ docker-compose up --build
```

### Debug
```bash
$ docker-compose -f docker-compose.debug.yml up --build
```
## Database scheme

![scheme](./.assets/scheme.png)
