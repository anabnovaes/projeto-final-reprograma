# API de gestão de moradores e visitas do condomínio dos sonhos

## reprograma-projeto-final
Projeto final de API realizado na 14ª semana do bootcamp de backend da reprograma

## Objetivo projeto

Criar uma API de gestão de moradores e visitantes de um condomínio residencial.

O sistema possui três tipos de acesso: 
- ***moradores** - alteram seus dados cadastrais e consultam suas visitas
- **vigilantes** - alteram seus dados cadastrais, incluem e alteram visitantes.
- **admins** - Incluem, alteram e removem moradores e vigilantes.


## Tecnologias usadas

Para desenvolver o projeto utilizei a tecnologia Node JS. O download do Node é feito neste [link](https://nodejs.org/en/). A instalação é feita pelo procedimento padrão de instalação (next => next => ok).

 Para o download dos pacotes utilizei o NPM, porém você poderá usar o gerenciador de pacotes de sua preferência.

 Você também deverá instalar o MongoDB como banco de dados da aplicação.O download é realizado por este [link](https://www.mongodb.com/download-center)



## Pacotes utilizados

Para a execução da aplicação foram utilizadas as seguintes bibliotecas

*express
mongoose
jsonwebtoken
body-parser
dotenv-safe
bcryptjs
* 


## Instalação
 
 Para clonar este repositório você deverá acessar o git bash (Windows) ou terminal (Linux, MAC) e digitar o seguinte comando:

```sh
git clone https://github.com/anabnovaes/projeto-final-reprograma.git  

```

Após clonar o repositório e acessar o novo diretório criado, você deverá iniciar o node pelo seguinte comando (caso utilize o NPM)

```sh
npm install 

```

Se você está utilizando outro gerenciador de pacotes apenas altere o comando npm para seu respectivo instalador.

## Endpoints utilizados

Os endpoints criados foram os seguintes:

### Endpoints para administradores

POST /admin/login => realiza o login de um administrador, retornando apenas o token de acesso

POST /admin/ => Adiciona um novo admin

GET /admin/ => Lista todos os admins cadastrados

DELETE /admin/:id => Remove o admin do ID informado

POST /admin/vigilantes => Adiciona um novo vigilante

GET /admin/vigilantes => Lista todos os vigilantes cadastrados

GET /admin/vigilantes/:vigilanteID => Lista os dados do vigilante de acordo com o ID 

DELETE /vigilante/:id => Remove o vigilante do ID informado

POST admin/proprietarios/ => Adiciona um novo morador

GET /admin/proprietarios => Lista todos os moradores cadastrados

GET /admin/proprietarios/:proprietarioID => Lista os dados do morador de acordo com o ID 

DELETE /proprietarios/:IdProprietario => Remove o morador do ID informado




### Endpoints para vigilantes

POST /vigilantes/login => realiza o login de um vigilante

PATCH /vigilantes/:vigilanteId => Altera os dados de acesso de um vigilante

POST /vigilantes/:moradorId/visitantes => Inclui uma nova visita para o morador do ID informado

PATCH /vigilantes/:moradorId/visitantes/:visitanteId => Altera os dados cadastrais de uma visita pelo ID do morador e do visitante