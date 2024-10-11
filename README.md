# TesteMedIQ

Para executar esse aplicativo, é necessário ter o [Docker](https://docs.docker.com/get-started/get-docker/) instalado em sua máqiuna, e ter configurado um arquivo [`.env`](#arquivo-env)

Com o docker instalado e o arquivo .env configurados, basta inicializar a aplicação com o comando

```
docker compose up
```
e aguardar cerca de 2 minutos até o fim da inicialização do banco de dados e da inicialização do servidor backend.

## Arquivo .env

```
ENGINE_PORT=[Porta da Aplicação. Recomenda-se 8355]
ENGINE_SALT_ROUNDS=[Número de rounds para encrpitação de senhas com bcrypt. Se recomenda no mínimo 12]

# Respeitar esses valores, conforme configurado no arquivo compose.yaml
POSTGRES_HOST=postgres_mediq
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=senhasegurabancopostgres
POSTGRES_DB=postgres
DATABASE_URL=postgres://postgres:senhasegurabancopostgres@localhost/postgres

REDIS_HOSTNAME=auth_database
REDIS_PORT=6379
# REDIS_USERNAME=keydb
# REDIS_PASSWORD=senhasegurabancokeydb
REDIS_BEARER_TOKEN_LIFETIME=[Lifetime de um token de autenticação no servidor Redis. Estou usando 1800 por padrão]
```