
![Logo](https://sidia.com/wp-content/uploads/2022/01/sidia.png)


# Sidia Aulas - Teste

Sistema de agendamentos de aulas por matéria e professor.


## Funcionalidades

- Cadastro de usuário
- Cadastro, edição e exclusão de agendamentos
- Cadastro, edição e exclusão de matérias (Administradores)
- Cadastro e exclusão de professores (Administradores)
- Cadastro e exclusão de permissões


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no **.env** que está na raiz do projeto

`MY_IP=""` *aqui você preenche com seu endereço IP local*
## Instalação

Instale o projeto utilizando docker-compose

```bash
  docker-compose --env-file .env up -d --build
```

### Configurar o banco de dados

Configure o banco de dados utilizando o próprio container

```bash
  docker exec -ti agendamento-backend sh -c "yarn init-application"
```
    
## Teste

Para rodar os testes basta executar

```bash
  docker exec -ti agendamento-backend sh -c "yarn test"
```


## Stack utilizada

**Front-end:** React, ContextAPI, Bootstrap5CSS

**Back-end:** Node, Express

**Banco de dados:** MySql

