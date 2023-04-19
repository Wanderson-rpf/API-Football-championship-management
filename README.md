# :soccer: API Football championship management :goal_net:

API desenvolvida no curso de desenvolvimento web da Trybe. O projeto consiste em desenvolver uma API para ser consumida pelo front-end, onde é informado os dados sobre partidas e classificações de futebol. Para este foi provido regras de negócio especificas, como, por exemplo, para adicionar novas partidas é necessário estar logado e ter o token validado.

API construída no modelo RestAPI com modelagem MSC, foram feitos também testes de integração.


<details><summary>Estrutura do projeto</summary></br>

O projeto é composto de 4 entidades importantes para sua estrutura:


:one: Banco de dados:
Será um container docker MySQL já configurado no docker-compose através de um serviço definido como db.
Tem o papel de fornecer dados para o serviço de backend.

:two: Back-end:
Deve rodar na porta 3001, pois o front-end faz requisições para ele nessa porta por padrão;
Sua aplicação deve ser inicializada a partir do arquivo app/backend/src/server.ts;
Garanta que o express é executado e a aplicação ouve a porta que vem das variáveis de ambiente;

:three: Front-end:
O front já está concluído, não é foi necessário necessário realizar modificações no mesmo.

:four: Docker:
O docker-compose tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando npm run compose:up;
</details>

---

## 🛠️ Construído com

Para a criação desta API foi utilizado.
- Modelo MSC (Model, Service e Controller)
- API Rest
- Docker
- Sequelize ORM
- Express
- JWT (Jason Web Token)
- Chai
- Sinon
- middleware de error
- TypeScript
- MySQL

---
## :green_circle: Rotas - endpoints

### Retornar todos os times cadastrados
``` http
GET /teams
```
<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  ...
  {
    "id": 15,
    "teamName": "São José-SP"
  },
  {
    "id": 16,
    "teamName": "São Paulo"
  }
]
```

</details>


### Retornar time especifico pelo ID
``` http
GET /teams/:id
```
<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
  {
	"id": 5,
	"teamName": "Cruzeiro"
  }
```

</details>

### Rota de login

Para este, a API deve receber no body um email e senha validos e que estejam cadastrados na base de dados.
Exemplo:
```json
{
  "email": "admin@admin.com",
  "password": "secret_admin"
}
```
``` http
POST /login
```
<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
{
  "token": Aqui será apresentado o token gerado para o usuário em questão.
}
```

Em caso de erro (status 400):
```json
{
  "message": "All fields must be filled"
}
```

Em caso de erro (status 401):
```json
{
  "message": "Invalid email or password"
}
```

</details>

### Retornando tipo de login

Para este, a API deve receber no campo Authorization do header, o token gerado no login.

``` http
GET /login/role
```
<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
{
  "role": "admin"
}
```

Em caso de erro (status 401):
```json
{
 "message": "Token not found"
}

ou

{
  "message": "Token must be a valid token"
}
```

</details>

### Retornando todas as partidas

``` http
GET /matches
```
<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
[
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  ...
  {
    "id": 47,
    "homeTeamId": 8,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 2,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Grêmio"
    },
    "awayTeam": {
      "teamName": "Santos"
    }
  },
  {
    "id": 48,
    "homeTeamId": 13,
    "homeTeamGoals": 1,
    "awayTeamId": 2,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Real Brasília"
    },
    "awayTeam": {
      "teamName": "Bahia"
    }
  }
]
```

</details>

### Retornando partidas pelo status

Para partidas em andamento:
``` http
GET /matches?inProgress=true
```

Para partidas finalizadas:
``` http
GET /matches?inProgress=false
```
<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
[
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  },
  ...
  {
    "id": 48,
    "homeTeamId": 13,
    "homeTeamGoals": 1,
    "awayTeamId": 2,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Real Brasília"
    },
    "awayTeam": {
      "teamName": "Bahia"
    }
  }
]
```

Em caso de erro (status 500):
```json
{
  "message": "Invalid parameter"
}
```

</details>

### Atualizar status de partida para finish
*ATENÇÃO: API deve receber no campo Authorization do header, o token gerado no login, caso contrário apresentará erro.*

``` http
PATCH /matches/:id/finish
```

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
{
  "message": "Finished"
}
```

Em caso de erro (status 404):
```json
{
  "message": "Match not found"
}
```

</details>

### Atualizar placar da partida
Para atualizar atualizar, a API deve receber no body, os gols do time da casa e de fora.

*ATENÇÃO: API deve receber no campo Authorization do header, o token gerado no login, caso contrário apresentará erro.*

```json
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

``` http
PATCH /matches/:id
```

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
{
  "message": "Score updated"
}
```

Em caso de erro (status 404):
```json
{
  "message": "Match not found"
}
```

</details>

### Adicionar nova partida
Para adicionar partida, a API deve receber no body, os ids e gols do time da casa e de fora.

*ATENÇÃO: API deve receber no campo Authorization do header, o token gerado no login, caso contrário apresentará erro.*

```json
{
  "homeTeamId": 1, 
  "awayTeamId": 2, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}
```

``` http
POST /matches
```

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 201):
```json
{
  "id": 49,
  "homeTeamId": 1,
  "awayTeamId": 2,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}
```

</details>

### Visualizar resumo de partidas em casa de todos os times

``` http
GET /leaderboard/home
```

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
[
  {
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },
  {
    "name": "Palmeiras",
    "totalPoints": 7,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 10,
    "goalsOwn": 5,
    "goalsBalance": 5,
    "efficiency": "77.78"
  },
  ...
  {
    "name": "Bahia",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 0,
    "goalsOwn": 4,
    "goalsBalance": -4,
    "efficiency": "0.00"
  }
]
```

</details>

### Visualizar resumo de partidas fora casa de todos os times

``` http
GET /leaderboard/away
```

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 7,
    "goalsOwn": 0,
    "goalsBalance": 7,
    "efficiency": "100.00"
  },
  {
    "name": "Corinthians",
    "totalPoints": 6,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 6,
    "goalsOwn": 2,
    "goalsBalance": 4,
    "efficiency": "66.67"
  },
  ...
  {
    "name": "Napoli-SC",
    "totalPoints": 0,
    "totalGames": 4,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 4,
    "goalsFavor": 1,
    "goalsOwn": 13,
    "goalsBalance": -12,
    "efficiency": "0.00"
  }
]
```

</details>

### Visualizar resumo total de partidas fora de casa e dentro de casa de todos os times

``` http
GET /leaderboard/
```

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": "86.67"
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": "80.00"
  },
  ...
  {
    "name": "Napoli-SC",
    "totalPoints": 2,
    "totalGames": 6,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 4,
    "goalsFavor": 3,
    "goalsOwn": 15,
    "goalsBalance": -12,
    "efficiency": "11.11"
  }
]
```

</details>

---

## 🚀 Visualização do projeto

1. Clonar o repositório

```bash
git clone https://github.com/Wanderson-rpf/API-Football-championship-management.git
```

2. Entre na pasta raiz (app)

```bash
cd API-Football-championship-management/app/
```

3. Executar docker-compose

*Para este é necessário ter o docker instalado.*

```bash
docker-compose up -d --build
```

4. Para rodar em modo de produção

```bash
npm start
```

5. Para rodar em modo de desenvolvimento

```bash
npm run dev
```

> OBS: O container esta configurado para iniciar em modo de desenvolvimento.

## :man_technologist: Feito por
[Wanderson Ricardo](https://www.linkedin.com/in/wanderson-ricardo-dev/)
