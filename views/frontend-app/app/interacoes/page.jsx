'use client';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import styles from './App.module.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('newest');
  const [clientes, setClients] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const sortOptions = [
    { value: 'newest', label: 'Mais recentes' },
    { value: 'oldest', label: 'Mais antigas' },
  ];

    const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/historico');
      const vendas = response.data;

      const mapaClientes = vendas.map((venda) => {
        return {
          id: venda.funcionario?.funcionario_ID || null,
          cliente: venda.cliente.nome || '',
          funcionario: venda.funcionario?.nome || '',
          segmento: venda.cliente.segmentoAtuacao || '',
          status: venda.status || '',
          ultimaInteracao: venda.data_venda,
          report: venda.report || ''
        };
      });
      setClients(mapaClientes);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const DetalhesClick = (cliente) => {
    setClienteSelecionado(cliente);
  };

  const filteredClients = clientes.filter(client =>
    client.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.funcionario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.segmento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedClients = [...filteredClients].sort((a, b) => {
    const dateA = new Date(a.ultimaInteracao).getTime();
    const dateB = new Date(b.ultimaInteracao).getTime();
    return sortKey === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className={styles['conteudo']}>
      <div className={styles['container-historico']}>
        <div className={styles.tableContainer}>
          <h1 className={styles.titulo}>Histórico de Interações</h1>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Pesquisar clientes..."
              className={styles.pesquisa}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className ='opções' style={{ marginLeft: '10px' }}>
              <Select
                instanceid="sort-by"
                options = {sortOptions}
                value={sortKey}
                placeholder = 'Data'
                onChange={(selectedOption) => setSortKey(selectedOption.value)}
                styles={{
                  indicatorSeparator: () => ({ display: 'none' })
                }}
              >
              </Select>
            </div>
          </div>

          <div className={styles['conteudo-tabela']}>
            <div className={styles['tabela-container']}>
              <table className={styles.tabela}>
                <thead>
                  <tr>
                    <th>Funcionário</th>
                    <th>Departamento</th>
                    <th>Cliente</th>
                    <th>Estado da venda</th>
                    <th>Última Interação</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedClients.map(client => (
                    <tr key={client.id}>
                      <td>{client.funcionario}</td>
                      <td>{client.segmento}</td>
                      <td>{client.cliente}</td>
                      <td>{client.status}</td>
                      <td>{client.ultimaInteracao}</td>
                      <td>
                        <button className={styles.botao} onClick={() => DetalhesClick(client)}>Detalhes</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles['detalhes-container']}>
              {clienteSelecionado ? (
                <div>
                  <h3>Detalhes de {clienteSelecionado.cliente}</h3>
                  <p><strong>Funcionário:</strong> {clienteSelecionado.funcionario}</p>
                  <p><strong>Estado:</strong> {clienteSelecionado.status}</p>
                  <p><strong>Última Interação:</strong> {clienteSelecionado.ultimaInteracao}</p>
                  <p><strong>Relatório:</strong> {clienteSelecionado.report}</p>
                </div>
              ) : (
                <p>Selecione um cliente na tabela para ver os detalhes.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;