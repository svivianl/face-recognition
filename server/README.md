## Env

- Clarifai's API key

`CLARIFAI_API_KEY`

- Website that can call the server

`WEBSITE`

- PostgresSql dev env

```
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
DB_PORT
DB_SSL
```

## Routes

| Routes                         | Methods   |
| ------------------------------ | --------- |
| /api/register                  | POST      |
| /api/signin                    | POST      |
| /api/signout                   | POST      |
| /api/user                      | GET, POST |
| /api/clarifai/face-recognition | POST      |

## Run App

- `npm start`
- `docker-compose up`
