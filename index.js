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

