
![Logo](https://sidia.com/wp-content/uploads/2022/01/sidia.png)


# Sidia Classes - Test

Classroom scheduling system by subject and teacher.


## Functionalities

- User registration
- Registration and deletion of appointments
- Registration and deletion of subjects (Administrator)
- Registration and exclusion of teachers (Administrator)
- Deleting Users (Administrator)

## Installation

Clone the project

```bash
  git clone https://github.com/Aluciney/sidia-aulas.git
```

Enter the project directory

```bash
  cd sidia-aulas
```

## Environment Variables

To run this project, you will need to add the following environment variables to the **.env** that is at the root of the project

*here you fill with your local IP address*

```bash
  MY_IP=""
```

## Start services

Start the server

```bash
  docker-compose --env-file .env up -d --build
```

Configure the database

```bash
  docker exec -ti agendamento-backend sh -c "yarn init-application"
```

Access the project

http://localhost:8080

Admin access

```bash
  email: admin.app@sidia.com
  senha: 12345678
```


## Test

To run the tests, just run

```bash
  docker exec -ti agendamento-backend sh -c "yarn test"
```


## Used stack

**Front-end:** React, ContextAPI, Bootstrap5CSS

**Back-end:** Node, Express

**Banco de dados:** MySql

