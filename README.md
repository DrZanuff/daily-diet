## Sbore

Uma API para controle de dieta diária, a Daily Diet API.
Desafio feito para o curso de node da Rocketseat.

### Regras da aplicação

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
      _As refeições devem ser relacionadas a um usuário._

  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta

- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário

  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta

- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

### Como rodar

Instalar dependências
`npm i`

Executar Migrations
`npm run migrate_latest`

Executar projeto
`npm run dev`

### Endpoints da Daily Diet API

#### User

- Create User

  - Descrição: Cria um novo usuário na aplicação.
  - Endpoint: POST /user/create
  - Corpo da Requisição:

  ```json
  {
    "name": "yourUserName",
    "password": "YourPassword"
  }
  ```

- Authenticate User

  - Descrição: Autentica um usuário na aplicação.
  - Endpoint: POST /user/auth
  - Corpo da Requisição:

  ```json
  {
    "name": "DrZanuff",
    "password": "101010"
  }
  ```

- Log Off User
  - Descrição: Desconecta um usuário da aplicação.
  - Endpoint: GET /user/logoff

##### Meal

- Create Meal

  - Descrição: Cria uma nova refeição na aplicação.
  - Endpoint: POST /meal/create
  - Corpo da Requisição:

  ```json
  {
    "description": "Lasanha de Vegetal",
    "date_time": "2024-04-16T20:36:52.622Z",
    "on_diet": true
  }
  ```

- Edit Meal

  - Descrição: Edita uma refeição existente na aplicação.
  - Endpoint: PATCH /meal/edit
  - Corpo da Requisição:

  ```json
  {
    "id": "61ef65ba-6eee-4799-988d-546d68cca425",
    "on_diet": false
  }
  ```

- List Meal

  - Descrição: Lista todas as refeições de um usuário.
  - Endpoint: POST /meal/list
  - Corpo da Requisição:

  ```json
  {
    "id": "5171027c-2d39-4d0b-b4b7-d7cf26b96613"
  }
  ```

- List Meals

  - Descrição: Lista todas as refeições.
  - Endpoint: POST /meal/list
  - Corpo da Requisição:

  ```json
  {}
  ```

- Delete Meal

  - Descrição: Deleta uma refeição existente na aplicação.
  - Endpoint: DELETE /meal/delete
  - Corpo da Requisição:

  ```json
  {
    "id": "93ce140f-8a4a-4968-8bd4-80d7d4f4d03b"
  }
  ```

- Summary
  - Descrição: Recupera as métricas de um usuário.
  - Endpoint: GET /user/summary
