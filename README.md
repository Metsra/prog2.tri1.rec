# Sistema Web de Confirmação de Participação em Evento

## 📌 Descrição do Sistema
Esta aplicação é uma Single Page Application (SPA) desenvolvida para gerir a confirmação de presença de convidados num evento. Através de uma interface dinâmica, os convidados podem pesquisar os seus nomes, confirmar a sua participação e informar a quantidade de acompanhantes, tudo isto sem recarregar a página.

Por questões de segurança e integridade das regras de negócio, o sistema não permite o registo manual de novos convidados através da interface; os nomes já se encontram previamente registados na base de dados do sistema. A aplicação apresenta também estatísticas em tempo real sobre o total de convidados, confirmados, ausentes e acompanhantes.

## 🛠️ Tecnologias Utilizadas
A aplicação foi construída utilizando uma separação clara entre front-end e back-end:

* **Front-end:** HTML5, CSS3 e JavaScript Vanilla. A comunicação é assíncrona, utilizando a API `fetch` para atualizar o DOM dinamicamente.
* **Back-end:** TypeScript executado em ambiente **Bun** (Node.js compatível). Todo o back-end foi desenhado com o paradigma de Orientação a Objetos.
* **Armazenamento de Dados:** Persistência baseada exclusivamente em manipulação de ficheiros locais utilizando o formato **JSON** (sem recurso a bases de dados relacionais ou NoSQL).

## 🚀 Instruções de Execução

Para executar este projeto localmente no seu computador, siga os passos abaixo:

1.  **Pré-requisitos:** Certifique-se de ter o [Bun](https://bun.sh/) instalado na sua máquina.
2.  **Abra o terminal** na pasta raiz do repositório (`prog2.tri1.rec`).
3.  **Inicie o servidor** executando o seguinte comando:
    ```bash
    bun run backend/server.ts
    ```
4.  **Aceda à aplicação:** Abra o seu navegador web e introduza o endereço `http://localhost:3000`.

## 📂 Explicação da Estrutura do Projeto

O projeto segue rigorosamente a estrutura e os requisitos estipulados para a atividade, garantindo a separação de responsabilidades (Front-end vs. Back-end):

```txt
prog2.tri1.rec/
│
├── frontend/             # Ficheiros estáticos do cliente (Single Page Application)
│   ├── index.html        # Estrutura principal e única da página.
│   ├── style.css         # Estilização do layout organizado.
│   └── app.js            # Lógica de interface, validações e comunicação (fetch) com o back-end.
│
├── backend/              # Lógica do servidor (Orientação a Objetos com mínimo de 4 classes)
│   ├── AppServer.ts      # Classe responsável por gerir o servidor HTTP e o encaminhamento das rotas.
│   ├── EventRegistry.ts  # Classe principal (Regras de negócio) que processa as pesquisas, estatísticas e confirmações.
│   ├── FileStorage.ts    # Classe dedicada exclusivamente à leitura e escrita de dados no sistema de ficheiros.
│   ├── Guest.ts          # Classe que modela as propriedades do Convidado.
│   └── server.ts         # Ficheiro de arranque que une as classes e inicia a escuta do servidor.
│
├── dados.json            # Base de dados exclusiva do sistema. Armazena o estado e as confirmações.
├── README.md             # Documentação central do projeto.
└── .gitignore            # Ficheiros e pastas ignorados pelo controlo de versão (ex: node_modules).
