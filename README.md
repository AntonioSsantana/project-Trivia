# Projeto Trivia React Redux

Este é um projeto de um jogo de trivia desenvolvido em JavaScript, utilizando, React e Redux para gerenciamento de estado. O objetivo do projeto é criar uma aplicação interativa onde os usuários possam responder perguntas de trivia.

## Funcionalidades

- Exibição de perguntas.
- Opções de resposta para cada pergunta.
- Feedback imediato sobre a resposta escolhida.
- Controle de pontuação do jogador.
- Exibição de ranking com as melhores pontuações.

## Dependências

O projeto utiliza as seguintes dependências:

- "@redux-devtools/extension": "3.2.2"
- "@testing-library/jest-dom": "^5.16.5"
- "@testing-library/user-event": "^13.0.0"
- "crypto-js": "^4.1.1"
- "prop-types": "^15.8.1"
- "react": "^18.2.0"
- "react-dom": "^18.2.0"
- "react-redux": "^8.0.2"
- "react-router-dom": "^5.3.3"
- "react-scripts": "^5.0.1"
- "redux": "^4.2.0"
- "redux-thunk": "^2.4.1"

```json
"dependencies": {
    "@redux-devtools/extension": "3.2.2",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/user-event": "^13.0.0",
    "crypto-js": "^4.1.1",
    "prop-types": "^15.8.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.0.2",
    "react-router-dom": "^5.3.3",
    "react-scripts": "^5.0.1",
    "redux": "^4.2.0",
    "redux-thunk": "^2.4.1"
  }
```

## Scripts

O projeto possui os seguintes scripts:

- `start`: Inicia o servidor de desenvolvimento.
- `build`: Cria a versão otimizada para produção do projeto.
- `test`: Executa os testes unitários.
- `test:watch`: Executa os testes em modo observação.
- `test:coverage`: Executa os testes e gera um relatório de cobertura.
- `lint:styles`: Executa a verificação de linting nos arquivos CSS.
- `lint`: Executa a verificação de linting nos arquivos JavaScript e JSX.
- `cy`: Executa os testes end-to-end.
- `cy:open`: Abre o Cypress para executar testes end-to-end no navegador Chrome.

```json
"scripts": {
    "cy": "env CY_CLI=true cypress run",
    "cy:open": "cypress open --e2e --browser chrome",
    "start": "react-scripts start ESLINT_NO_DEV_ERRORS=true",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "test:watch": "react-scripts test --watchAll",
    "eject": "react-scripts eject",
    "test:coverage": "react-scripts test --coverage --watchAll=false",
    "lint:styles": "npx stylelint '**/*.css'",
    "lint": "eslint --no-inline-config --no-error-on-unmatched-pattern -c .eslintrc.json . --ext .js,.jsx"
  }
```

## Equipe de Desenvolvimento

O projeto foi desenvolvido por uma equipe de 4 pessoas:

- [Antônio Santana](https://github.com/AntonioSsantana)
- [João Victor Schiavon](https://github.com/joaovictorschiavon)
- [Raphael Pacheco](https://github.com/RaphaelPach)
- [Iorran Ditscheiner](https://github.com/IorranDits)
