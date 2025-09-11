import React from 'react'
import './vendedores.css'

export default function page() {
  const vendedores = () => {
    const dadosVendedores = [
      {nome:"Paula",}
    ]
  }
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
            <tr>
              <td>Vendedor1</td>
              <td>X</td>
              <td>X</td>
              <td>X%</td>
              <td>X</td>
            </tr>
          </thead>
        </table>
    </div>
  )
}
