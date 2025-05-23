<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Histórico de Cambios</title>
  <link rel="stylesheet" href="css/history.css">
</head>
<body>
  <h1>Histórico de Cambios</h1>

  <!-- Botão Voltar fixo no canto, só depois do login -->
  <button id="globalBackBtn" onclick="window.location.href='index.html'">
    ← Voltar
  </button>

  <!-- Formulário de Senha -->
  <div id="passwordForm">
     <label for="password">Digite a senha para acessar o histórico:</label>
    <input 
      type="password" 
      id="password" 
      name="password" 
      placeholder="Senha"
      autocomplete="current-password"
      required
    >
    <div id="buttonContainer">
      <button id="backBtn" onclick="window.location.href='index.html'">Voltar</button>
      <button id="enterBtn">Entrar</button>
    </div>
  </div>

  <!-- Botão para mostrar/ocultar filtros (após login) -->
  <div id="toggleFiltersContainer">
    <button id="toggleFiltersBtn">Mostrar Filtros</button>
  </div>

  <!-- Filtros (inicialmente escondidos) -->
  <div id="filters">
    <label for="yearFilter">Ano:</label>
    <select id="yearFilter">
      <option value="">Todos</option>
      <option>2025</option>
      <option>2026</option>
    </select>

    <label for="monthFilter">Mês:</label>
    <select id="monthFilter">
      <option value="">Todos</option>
      <option value="01">Janeiro</option>
      <option value="02">Fevereiro</option>
      <option value="03">Março</option>
      <option value="04">Abril</option>
      <option value="05">Maio</option>
      <option value="06">Junho</option>
      <option value="07">Julho</option>
      <option value="08">Agosto</option>
      <option value="09">Setembro</option>
      <option value="10">Outubro</option>
      <option value="11">Novembro</option>
      <option value="12">Dezembro</option>
    </select>

    <label for="dayFilter">Dia:</label>
    <select id="dayFilter">
      <option value="">Todos</option>
      <!-- 1 a 31 -->
      <option value="01">1</option>
      <option value="02">2</option>
      <option value="03">3</option>
      <option value="04">4</option>
      <option value="05">5</option>
      <option value="06">6</option>
      <option value="07">7</option>
      <option value="08">8</option>
      <option value="09">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
      <option value="17">17</option>
      <option value="18">18</option>
      <option value="19">19</option>
      <option value="20">20</option>
      <option value="21">21</option>
      <option value="22">22</option>
      <option value="23">23</option>
      <option value="24">24</option>
      <option value="25">25</option>
      <option value="26">26</option>
      <option value="27">27</option>
      <option value="28">28</option>
      <option value="29">29</option>
      <option value="30">30</option>
      <option value="31">31</option>
    </select>

    <label for="modelFilter">Modelo:</label>
    <select id="modelFilter">
      <option value="">Todos</option>
      <option>G5-1.6</option>
      <option>Fire-1.4</option>
      <option>Fire-EVO</option>
      <option>AP</option>
      <option>Fusca</option>
      <option>Outro</option>
    </select>
  </div>

  <!-- Conteúdo do Histórico -->
  <div id="historyContent">
    <h2>Conteúdo do Histórico</h2>
    <div id="historyList"></div>
  </div>

  <script src="javascript/history.js"></script>
</body>
</html>
