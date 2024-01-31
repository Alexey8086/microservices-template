# moleculer-template


## Зависимости, которые храняться в node_moules
-    "@moleculer/channels": "^0.1.8",
-    "@moleculer/lab": "^0.6.4",
-    "ioredis": "^5.0.0",
-    "moleculer": "^0.14.26",
-    "moleculer-db": "^0.8.20",
-    "moleculer-db-adapter-mongo": "^0.4.15",
-    "moleculer-elasticsearch": "^1.1.8",
-    "moleculer-web": "^0.10.4",
-    "pino": "^8.17.2",
-    "redlock": "^4.2.0"
-    "amqplib": "^0.10.3",

## "Зависимости" приложения, запускаются в docker
## контейнере (одно приложение - один контейнер)
-    postgres
-    prometheus
-    grafana
-    rabbitMQ
-    redis
-    traefik
-    alertmanager
-    jaeger
-    elasticsearch

# docker-compose команды
docker-compose up -d
docker-compose up --build -d
docker-compose down -v
docker-compose down --volumes --remove-orphans

docker-compose logs --tail=0
docker-compose logs --tail=0 | docker-compose logs --no-log-prefix -f
docker-compose logs api

    удаляет все контейнеры
docker rm $(docker ps -aq)
    удаляет все образы
docker rmi $(docker images -q)

docker-compose up --build --force-recreate --volumes

You should not be using "localhost" to connect to the db, use the container name as the host/server. In this case, postgres_db

Чтобы подключиться к postgres из вне
DATABASE_URL = 'postgresql://devuser:devuser@localhost:5432/auth_service_database?schema=public'

# Linux cmds
sudo lsof -i :6379
sudo service redis-server stop

# https://www.reddit.com/r/docker/comments/n4w3w7/error_connect_econnrefused_1270015432/

When running locally, your exposing pg to local port 5432 when running in the container, your app has access to a different set of ip and dns registrations. It's not running in 'localhost' anymore but a virtual subnet. Docker has it's own dns resolution and maps the container names to their respective container (much like setting up a hosts alias).