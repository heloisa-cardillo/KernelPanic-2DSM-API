"use client";

import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
} from 'chart.js';

import './Grafico.css'; // Importa o arquivo de estilo global

// Registra todos os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

export default function GraficoPage() {
  // Paleta de cores do funil
  const coresFunil = [
    "#2A49EB",
    "#3366F0", 
    "#4686F5",
    "#5AA6FA",
    "#6DC6FF",
    "#87DBFF",
    "#9EEFFF",
    "#B6FFFF"
  ];

  // Variáveis de estado para o filtro e para todos os gráficos
  const [filtroTempo, setFiltroTempo] = useState('mes');
  const [vendasDados, setVendasDados] = useState({ labels: [], datasets: [] });
  const [interacoesDados, setInteracoesDados] = useState({ labels: [], datasets: [] });
  const [clientesCadastradosDados, setClientesCadastradosDados] = useState({ labels: [], datasets: [] });
  const [clientesPorCidadeDados, setClientesPorCidadeDados] = useState({ labels: [], datasets: [] });
  const [opcoesGrafico, setOpcoesGrafico] = useState({});

  // Efeito que gera os dados do gráfico sempre que o filtro muda
  useEffect(() => {
    const gerarDados = (filtro) => {
      // Lógica para Vendas
      let vendasLabels = [];
      let vendasData = [];
      let vendasTitulo = '';
      switch (filtro) {
        case 'dia':
          vendasLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']; vendasData = [10, 15, 20, 18, 25, 30, 22]; vendasTitulo = 'Vendas por Dia'; break;
        case 'mes':
          vendasLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Sep', 'Out', 'Nov', 'Dez']; vendasData = [65, 59, 80, 81, 56, 75, 69, 45, 78, 53, 23, 76]; vendasTitulo = 'Vendas por Mês'; break;
        case 'ano':
          vendasLabels = ['2022', '2023', '2024']; vendasData = [800, 950, 1200]; vendasTitulo = 'Vendas por Ano'; break;
        default: break;
      }
      setVendasDados({
        labels: vendasLabels, datasets: [{ label: vendasTitulo, data: vendasData, backgroundColor: coresFunil[0] + '99' }]
      });

      // Lógica para Interações
      let interacoesLabels = [];
      let interacoesData = [];
      let interacoesTitulo = 'Interações';
      switch (filtro) {
        case 'dia':
          interacoesLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']; interacoesData = [15, 20, 18, 25, 30, 22, 19]; break;
        case 'mes':
          interacoesLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Sep', 'Out', 'Nov', 'Dez']; interacoesData = [90, 85, 100, 95, 110, 120, 100, 80, 60, 54, 43, 21]; break;
        case 'ano':
          interacoesLabels = ['2022', '2023', '2024']; interacoesData = [500, 750, 900]; break;
        default: break;
      }
      setInteracoesDados({
        labels: interacoesLabels, datasets: [{ label: interacoesTitulo, data: interacoesData, borderColor: coresFunil[1], backgroundColor: coresFunil[6] }]
      });

      // Lógica para Clientes por Cidade
      setClientesPorCidadeDados({
        labels: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre'],
        datasets: [{
          label: 'Clientes por Cidade',
          data: [300, 150, 100, 80],
          backgroundColor: [coresFunil[0], coresFunil[2], coresFunil[4], coresFunil[6]],
          hoverBackgroundColor: [coresFunil[0], coresFunil[2], coresFunil[4], coresFunil[6]]
        }]
      });

      // Lógica para Clientes Cadastrados
      setClientesCadastradosDados({
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Sep', 'Out', 'Nov', 'Dez'],
        datasets: [{
          label: 'Clientes Cadastrados',
          data: [10, 25, 40, 55, 70, 85, 45, 65, 34 ,65, 65, 34],
          borderColor: coresFunil[2],
          backgroundColor: coresFunil[2] + '33',
          fill: true
        }]
      });
      
      // Lógica para as opções do gráfico
      setOpcoesGrafico({
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: `Relatório de ${filtro}` },
        },
        scales: { y: { beginAtZero: true } },
      });
    };

    gerarDados(filtroTempo);

  }, [filtroTempo]); // A função será executada toda vez que o filtroTempo mudar

  // Retorno do componente com a interface do usuário
  return (
    <div className='pagina-grafico'>
      <h1>Relatórios de Vendas</h1>

      <div className='filtro-container'>
        <button
          className={filtroTempo === 'dia' ? 'filtro-ativo' : 'filtro-botao'}
          onClick={() => setFiltroTempo('dia')}>
          Dia
        </button>
        <button
          className={filtroTempo === 'mes' ? 'filtro-ativo' : 'filtro-botao'}
          onClick={() => setFiltroTempo('mes')}>
          Mês
        </button>
        <button
          className={filtroTempo === 'ano' ? 'filtro-ativo' : 'filtro-botao'}
          onClick={() => setFiltroTempo('ano')}>
          Ano
        </button>
      </div>

      <div className='grid-graficos'>
        <div className='grafico-card'>
          <h2>Vendas</h2>
          <Bar data={vendasDados} options={{...opcoesGrafico, plugins: { title: { display: true, text: 'Vendas'}}}} />
        </div>

        <div className='grafico-card'>
          <h2>Interações</h2>
          <Line data={interacoesDados} options={{...opcoesGrafico, plugins: { title: { display: true, text: 'Interações'}}}} />
        </div>

        <div className='grafico-card'>
          <h2>Clientes por Cidade</h2>
          <Doughnut data={clientesPorCidadeDados} options={{...opcoesGrafico, scales: {y: {display: false}}}} />
        </div>

        <div className='grafico-card'>
          <h2>Clientes Cadastrados</h2>
          <Line data={clientesCadastradosDados} options={{...opcoesGrafico, plugins: { title: { display: true, text: 'Clientes Cadastrados'}}}} />
        </div>
      </div>

      <div className='relatorios-section'>
        <h2>Relatórios Disponíveis</h2>
        <div className='relatorios-grid'>
          <button className='relatorio-btn'>Interações</button>
          <button className='relatorio-btn'>Vendas Efetivadas</button>
          <button className='relatorio-btn'>Clientes Cadastrados</button>
          <button className='relatorio-btn'>Clientes por Cidade</button>
          <button className='relatorio-btn'>Clientes por Segmento</button>
          <button className='relatorio-btn'>Relatório Completo</button>
        </div>
      </div>
    </div>
  );
}