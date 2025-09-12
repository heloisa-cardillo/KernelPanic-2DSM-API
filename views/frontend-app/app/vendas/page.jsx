'use client';

import React from 'react';
import './vendedores.css';

export default function Page() {
  // apenas para ilustrar, como ainda nao tem integração com o backend
  const vendedores = [
    { nome: "Paula", visitas: 10, vendas: 5, taxa: "50%", faturamento: "R$ 1000" },
    { nome: "Carlos", visitas: 8, vendas: 4, taxa: "50%", faturamento: "R$ 800" }
  ];

  return (
    <div className='desempenho-vendedores'>
      <h1>Desempenho de vendedores</h1>
      <table className='tabela-desempenho'>
        <thead>
          <tr>
            <th>Vendedor</th>
            <th>Visitas</th>
            <th>Vendas</th>
            <th>Taxa de conversão</th>
            <th>Faturamento</th>
          </tr>
        </thead>
        <tbody>
          {vendedores.map((vendedor, index) => (
            <tr key={index}>
              <td>{vendedor.nome}</td>
              <td>{vendedor.visitas}</td>
              <td>{vendedor.vendas}</td>
              <td>{vendedor.taxa}</td>
              <td>{vendedor.faturamento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}