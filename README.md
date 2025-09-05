# FATEC Profº Jessen Vidal - São José dos Campos - 2º Semestre DSM - 2025

<p>Projeto desenvolvido para a API (Aprendizagem por Projeto Integrado) do 2° Semestre do curso Desenvolvimento de Software Multiplataforma (DSM) em parceria com a empresa <b>Newe Log</b>, no projeto de <b>Plataforma Integrada de Gestão</b>.</p>

> _A API se trata de um projeto submetido à metodologia de ensino em implantação na Fatec São José dos Campos, do qual os alunos formam equipes baseadas na metodologia ágil SCRUM, tendo um aluno como Scrum Master, um sendo o Product Owner e o restante dos integrantes como Dev Team._

## Visão Geral
  Este projeto tem como objetivo desenvolver uma plataforma única que centralize e padronize processos administrativos, comerciais e operacionais da Newe Log, garantindo maior eficiência e controle para a empresa. A solução permitirá a visualização de informações, notificações e relatórios de forma integrada.

  Atualmente, a Newe Log utiliza diversas ferramentas separadas para gerenciar checklists e cadastros, como o Microsoft Lists, Google Forms e Microsoft Forms. Essa fragmentação de processos e dados causa descentralização e falta de padronização, o que pode levar a retrabalho, erros e relatórios imprecisos. O projeto busca solucionar esse desafio, oferecendo uma solução integrada que simplifique o acesso e padronize as informações.

## Objetivo do produto
  O sistema tem como objetivo principal centralizar todos os processos e dados da empresa em uma única plataforma, oferecendo uma visão integrada da parte administrativa, comercial e operacional. Entre os principais recursos, destacam-se:
- Centralização de dados e processos em um único ambiente.

- Automação de eventos administrativos e treinamentos.

- Gestão de clientes e vendas (CRM) com histórico completo e funil comercial.

- Unificação de checklists operacionais dispersos em diferentes ferramentas.

- Relatórios estratégicos e dashboards em tempo real.

 ## 📊 Funcionalidades e Insights

<span id="backlog">

## 📋 Backlog / User Stories
| Rank | Prioridade | Sprint |                                                                                          User Story                                                                                         | Estimativa |                                                                                    Requisitos do Parceiro                                                                                   |
| :--: | :--------: | :----: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   1  |   🔴 Alta  |    1   |                                                  Eu como comercial, quero realizar o cadastro completo de clientes e departamento responsável, para inclui-los no sistema                                                 |      ?     |                                                                     Sistema de cadastro de clientes com campos completos                                                                    |
|   2  |   🔴 Alta  |    1   |                                                   Eu como comercial quero poder gerenciar os clientes cadastrados, para ver, atualizar e deletar clientes                                                   |      ?     |                                                                     Sistema de cadastro de clientes com campos completos                                                                    |
|   3  |   🔴 Alta  |    2   |                            Eu como cliente, quero unificar todos os checklists e cadastros atualmente utilizados em ferramentas distintas em uma única plataforma                           |      ?     |                                                                     Centralização e unificação de checklists e cadastros                                                                    |
|   4  |   🔴 Alta  |    2   |                            Eu como cliente, quero uma plataforma centralizada para visualização, padronização e simplificação do acesso para todos os envolvidos                            |      ?     |                                     Plataforma única de acesso, visualização e padronização que abranja o setor comercial, operacional e administrativo                                     |
|   5  |   🔴 Alta  |    2   |                                          Eu como cliente, quero gerenciar checklists padronizados, para maior controle e organizacao das operacoes                                          |      ?     |                                                         Checklists padronizados para empresa, agregados, frota e manutenção predial                                                         |
|   6  |   🔴 Alta  |    3   | Eu como cliente, quero notificações automáticas de eventos com link, confirmação ou recusa justificada, conclusão após participação, formulário de avaliação e documento padrão de registro |      ?     |                                                     Sistema de eventos com notificações, formulários e geração automática de relatórios                                                     |
|   7  |   🔴 Alta  |    3   |                                                Eu como cliente, quero acessar informações da parte comercial e operacional em um só ambiente                                                |      ?     |                                                              Integração de dados comerciais e operacionais na mesma plataforma                                                              |
|   8  |  🟠 Média  |    1   |                 Eu como comercial, quero ver e classificar meus clientes em um funil de vendas com classificação: Prospects, Inicial, Potencial, Manutenção, Em Negociação e Follow Up, para visualizar insights sobre o ciclo de vendas do cliente                  |      ?     | Funil de vendas com etapas definidas e classificações de clientes ---> *Aqui que acho que ficaria bom colocar tambem um quadro parecido com o do jura, para mostrar onde cada cliente esta* |
|   9  |  🟠 Média  |    1   |   Eu como gestor comercial, quero poder visualizar relatórios e gráficos quantitativos de interações, vendas efetuadas, clientes cadastrados, clientes por cidade e segmento, com filtros por dia, mês ou ano, afim de medir o desempenho de meus vendedores   |      ?     |                                                               Relatórios e dashboards com filtros e agrupamentos customizáveis                                                              |
|  10  |  🟠 Média  |    3   |                        Eu como cliente, quero visualizar a quantidade de funcionários e agregados, além dos veículos cadastrados para realizar uma análise de perfil                        |      ?     |                                                            Cadastro de funcionários, agregados e veículos com perfis atualizados                                                            |
|  11  |  🟡 Baixa  |    1   |                                             Eu como comercial, quero agendar tarefas e configurar lembretes, afim de acompanhar próximos contatos com clientes                                             |      ?     |                                                       Sistema de agendamento e lembretes integrado ao cadastro e histórico de clientes                                                      |
|  12  |  🟡 Baixa  |    1   |                                           Eu como comercial, quero medir o rendimento e a taxa de conversão das visitas em vendas do setor comercial, para medir o desempenho dos vendedores                                                |      ?     |                                                    Relatórios de desempenho do setor comercial com indicadores de conversão e faturamento                                                   |
|  13  |  🟡 Baixa  |    1   |                                           Eu como comercial, quero gerenciar o histórico completo das interações com clientes e relatórios detalhados das interações, para possibilitar futura auditoria                                          |      ?     |                                                    Visualização do histórico completo de interações com o cliente                                                   |
|  14  |  🟡 Baixa  |    2   |                                            Eu como cliente, quero que as informações dos fretes concluídos sejam automaticamente repassadas ao RH                                           |      ?     |                                                                  Integração de dados de fretes concluídos com o setor de RH                                                                 |
|  15  |  🟡 Baixa  |    3   |                                                             Eu como cliente, quero acompanhar a localização de cada funcionário                                                             |      ?     |                                                               Registro de localização de funcionários com histórico atualizado                                                              |

### ⏳ Status do projeto: 0/3 Sprint

## 🟢 Sprint 1 - Setor Comercial

| Rank | Prioridade |                                                                                        User Story                                                                                       | Estimativa | Sprint | Requisitos do Parceiro                                                                                                                                                                      |
| :--: | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   1  |   🔴 Alta  |                                               Eu como comercial, quero realizar o cadastro completo de clientes e departamento responsável, para inclui-los no sistema                                              |      ?     |    1   | Sistema de cadastro de clientes com campos completos                                                                                                                                        |
|   2  |   🔴 Alta  |                                    Eu como comercial quero poder gerenciar os clientes cadastrados, para ver, atualizar e deletar clientes                                   |      ?     |    1   | Registro e consulta de histórico detalhado de interações com clientes                                                                                                                       |
|   3  |  🟠 Média  |               Eu como comercial, quero ver e classificar meus clientes em um funil de vendas com classificação: Prospects, Inicial, Potencial, Manutenção, Em Negociação e Follow Up, para visualizar insights sobre o ciclo de vendas do cliente               |      ?     |    1   | Funil de vendas com etapas definidas e classificações de clientes |
|   4  |  🟠 Média  | Eu como gestor comercial, quero poder visualizar relatórios e gráficos quantitativos de interações, vendas efetuadas, clientes cadastrados, clientes por cidade e segmento, com filtros por dia, mês ou ano, afim de medir o desempenho de meus vendedores |      ?     |    1   | Relatórios e dashboards com filtros e agrupamentos customizáveis                                                                                                                            |
|   5  |  🟡 Baixa  |                                            Eu como comercial, quero agendar tarefas e configurar lembretes, afim de acompanhar próximos contatos com clientes                                            |      ?     |    1   | Sistema de agendamento e lembretes integrado ao cadastro e histórico de clientes                                                                                                            |
|   6  |  🟡 Baixa  |                                         Eu como comercial, quero medir o rendimento e a taxa de conversão das visitas em vendas do setor comercial, para medir o desempenho dos vendedores                                        |      ?     |    1   | Relatórios de desempenho do setor comercial com indicadores de conversão e faturamento                                                                                                      |
|   7  |  🟡 Baixa  |                                        Eu como comercial, quero gerenciar o histórico completo das interações com clientes e relatórios detalhados das interações, para possibilitar futura auditoria                                        |      ?     |    1   | Visualização do histórico completo de interações com o cliente                                                                                                       |


## 🟠 Sprint 2 - Setor Operacional 

| Rank | Prioridade |                                                               User Story                                                               | Estimativa | Sprint | Requisitos do Parceiro                                                                                              |
| :--: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------: | :--------: | :----: | :------------------------------------------------------------------------------------------------------------------ |
|   1  |   🔴 Alta  | Eu como cliente, quero unificar todos os checklists e cadastros atualmente utilizados em ferramentas distintas em uma única plataforma |      ?     |    2   | Centralização e unificação de checklists e cadastros                                                                |
|   2  |   🔴 Alta  |  Eu como cliente, quero uma plataforma centralizada para visualização, padronização e simplificação do acesso para todos os envolvidos |      ?     |    2   | Plataforma única de acesso, visualização e padronização que abranja o setor comercial, operacional e administrativo |
|   3  |   🔴 Alta  |                Eu como cliente, quero gerenciar checklists padronizados, para maior controle e organizacao das operacoes               |      ?     |    2   | Checklists padronizados para empresa, agregados, frota e manutenção predial                                         |
|   4  |  🟠 Média  |              Eu como cliente, quero cadastrar agregados com devolutiva automática após a conclusão do processo de cadastro             |      ?     |    2   | Cadastro de agregados com feedback automático                                                                       |
|   5  |  🟡 Baixa  |                 Eu como cliente, quero que as informações dos fretes concluídos sejam automaticamente repassadas ao RH                 |      ?     |    2   | Integração de dados de fretes concluídos com o setor de RH                                                          |

<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tabela de Requisitos</title>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    table { border-collapse: collapse; width: 100%; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    .hidden-col { display: none; }
    .toggle-btn { cursor: pointer; background-color: #0366d6; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 14px; }
  </style>
</head>
<body>

  <h2>Tabela de Requisitos do Projeto</h2>
  
  <button id="toggleButton" class="toggle-btn">Mostrar detalhes</button>

  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Prioridade</th>
        <th>User Story</th>
        <th class="hidden-col">Estimativa</th>
        <th class="hidden-col">Sprint</th>
        <th class="hidden-col">Requisitos do Parceiro</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>🔴 Alta</td>
        <td>Eu como cliente, quero unificar todos os checklists...</td>
        <td class="hidden-col">?</td>
        <td class="hidden-col">2</td>
        <td class="hidden-col">Centralização e unificação de checklists e cadastros</td>
      </tr>
      <tr>
        <td>2</td>
        <td>🔴 Alta</td>
        <td>Eu como cliente, quero uma plataforma centralizada...</td>
        <td class="hidden-col">?</td>
        <td class="hidden-col">2</td>
        <td class="hidden-col">Plataforma única de acesso...</td>
      </tr>
      <tr>
        <td>3</td>
        <td>🔴 Alta</td>
        <td>Eu como cliente, quero gerenciar checklists...</td>
        <td class="hidden-col">?</td>
        <td class="hidden-col">2</td>
        <td class="hidden-col">Checklists padronizados para empresa...</td>
      </tr>
      <tr>
        <td>4</td>
        <td>🟠 Média</td>
        <td>Eu como cliente, quero cadastrar agregados...</td>
        <td class="hidden-col">?</td>
        <td class="hidden-col">2</td>
        <td class="hidden-col">Cadastro de agregados...</td>
      </tr>
      <tr>
        <td>5</td>
        <td>🟡 Baixa</td>
        <td>Eu como cliente, quero que as informações dos fretes...</td>
        <td class="hidden-col">?</td>
        <td class="hidden-col">2</td>
        <td class="hidden-col">Integração de dados de fretes concluídos...</td>
      </tr>
    </tbody>
  </table>

  <script>
    const button = document.getElementById('toggleButton');
    const hiddenCols = document.querySelectorAll('.hidden-col');
    let isHidden = true;

    button.addEventListener('click', () => {
      hiddenCols.forEach(col => {
        col.classList.toggle('hidden-col');
      });
      isHidden = !isHidden;
      button.textContent = isHidden ? 'Mostrar detalhes' : 'Esconder detalhes';
    });
  </script>

</body>
</html>


## 🟡 Sprint 3 - Setor Administrativo

| Rank | Prioridade |                                                                                          User Story                                                                                         | Estimativa | Sprint |                                Requisitos do Parceiro                               |
| :--: | :--------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------: | :----: | :---------------------------------------------------------------------------------: |
|   1  |   🔴 Alta  | Eu como cliente, quero notificações automáticas de eventos com link, confirmação ou recusa justificada, conclusão após participação, formulário de avaliação e documento padrão de registro |      ?     |    3   | Sistema de eventos com notificações, formulários e geração automática de relatórios |
|   2  |   🔴 Alta  |                                                Eu como cliente, quero acessar informações da parte comercial e operacional em um só ambiente                                                |      ?     |    3   |          Integração de dados comerciais e operacionais na mesma plataforma          |
|   3  |  🟠 Média  |                                                Eu como cliente, quero acessar informações da parte comercial e operacional em um só ambiente                                                |      ?     |    3   |          Integração de dados comerciais e operacionais na mesma plataforma          |
|   4  |  🟡 Baixa  |                        Eu como cliente, quero visualizar a quantidade de funcionários e agregados, além dos veículos cadastrados para realizar uma análise de perfil                        |      ?     |    3   |        Cadastro de funcionários, agregados e veículos com perfis atualizados        |



 ## Tecnologias Utilizadas


## Metodologia utilizada



## Equipe <a name="equipe"><a>
|  Foto        |     Função    |           Nome            |                            LinkedIn                            |                      GitHub                       |
| :----: | :-----------: | :-----------------------: | :------------------------------------------------------------: | :-----------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/106409918?v=4" width="75px"> | Scrum Master  | Vitor Serpa da Silva |  [Linkedin](https://www.linkedin.com/in/vitor-serpa-925b46322/)  | [GitHub](https://github.com/VitorSerpa) |
| <img src="https://avatars.githubusercontent.com/u/119637682?v=4" width="75px"> | Product Owner | Heloisa Cardillo | [Linkedin](https://www.linkedin.com/in/heloisa-cardillo-lima/) | [GitHub](https://github.com/heloisa-cardillo) |
| <img src="https://avatars.githubusercontent.com/u/162122368?v=4" width="75px"> | Dev Team      | Daniel Porto Renó Sás Piloto | [Linkedin](https://www.linkedin.com/in/daniel-piloto-98b717226/)  | [GitHub](https://github.com/danprsp) |
| <img src="https://avatars.githubusercontent.com/u/140865436?v=4" width="75px"> | Dev Team      | Henry Vilela Silva Tito |  [Linkedin](https://www.linkedin.com/in/henry-tito-989b4b354/)  | [GitHub](https://github.com/HenryTito)  |
| <img src="https://avatars.githubusercontent.com/u/143196325?v=4" width="75px"> | Dev Team      | João Victor Dos Reis Santos | [Linkedin](https://www.linkedin.com/in/jo%C3%A3o-victor-dos-reis-santos-1823532b4/) | [GitHub](https://github.com/Templasan) |
| <img src="https://avatars.githubusercontent.com/u/144951743?v=4" width="75px"> | Dev Team      | Miguel Tomio Toledo Nonaka |  [Linkedin](https://www.linkedin.com/in/miguel-nonaka)  | [GitHub](https://github.com/miguelnonaka)    |
| <img src="https://avatars.githubusercontent.com/u/102493225?v=4" width="75px"> | Dev Team      | Paula Emy Tamay |  [Linkedin](https://www.linkedin.com/in/paula-tamay-7a168228a/)  | [GitHub](https://github.com/PaulaEmy)    |
| <img src="https://avatars.githubusercontent.com/u/163305926?v=4" width="75px"> | Dev Team      | Vinícius da Silva Leite |  [Linkedin](https://www.linkedin.com/in/vinícius-leite-4792b02ba/)  | [GitHub](https://github.com/vinislvleite)    |
| <img src="https://avatars.githubusercontent.com/u/180225838?v=4" width="75px"> | Dev Team      | Vinícius Kinoshi |  [Linkedin](https://www.linkedin.com/in/vinícius-gregório-406640232/)  | [GitHub](https://github.com/Vinicius-Konishi)    |
