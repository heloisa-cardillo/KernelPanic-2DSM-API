"use client";

import React, { useState } from "react";
import styles from "./Kanban.module.css";
import Funil from "../FunilVendas/FunilVendas";

export default function CicloDeVendas() {
  // estado: cada coluna tem 2 cards, cada card tem lista de clientes
  const [cards, setCards] = useState({
    colunaUm: { prospeccao: [], negociacao: [] },
    colunaDois: { inicial: [], followUp: [] },
    colunaTres: { potencial: [], vendas: [] },
    colunaQuatro: { manutencao: [], naoVendas: [] },
  });

  const [draggingCliente, setDraggingCliente] = useState(null);

  // adicionar cliente de teste
  const adicionarCliente = (coluna, cardKey) => {
    const novoCliente = {
      nome: "Cliente " + (Math.floor(Math.random() * 1000)),
      empresa: "Empresa X",
      telefone: "(12) 1234-5678",
      email: "cliente@email.com",
      status: "Ativo",
    };

    setCards((prev) => ({
      ...prev,
      [coluna]: {
        ...prev[coluna],
        [cardKey]: [...prev[coluna][cardKey], novoCliente],
      },
    }));
  };

  // arrastar
  const handleDragStart = (cliente, origemColuna, origemCard) => {
    setDraggingCliente({ cliente, origemColuna, origemCard });
  };

  const handleDrop = (destinoColuna, destinoCard) => {
    if (!draggingCliente) return;

    const { cliente, origemColuna, origemCard } = draggingCliente;

    setCards((prev) => {
      // remove do card de origem
      const origemLista = prev[origemColuna][origemCard].filter(
        (c) => c !== cliente
      );
      // adiciona no card de destino
      const destinoLista = [...prev[destinoColuna][destinoCard], cliente];

      return {
        ...prev,
        [origemColuna]: {
          ...prev[origemColuna],
          [origemCard]: origemLista,
        },
        [destinoColuna]: {
          ...prev[destinoColuna],
          [destinoCard]: destinoLista,
        },
      };
    });

    setDraggingCliente(null);
  };

  // render cliente-card
  const renderCliente = (cliente, coluna, cardKey, index) => (
    <div
      key={index}
      className={styles.clienteCard}
      draggable
      onDragStart={() => handleDragStart(cliente, coluna, cardKey)}
    >
      <strong>{cliente.nome}</strong> <br />
      {cliente.empresa} <br />
      {cliente.telefone} <br />
      {cliente.email} <br />
      <em>{cliente.status}</em>
    </div>
  );

  // render card (coluna)
  const renderCard = (titulo, coluna, cardKey) => (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {titulo} <span>{cards[coluna][cardKey].length}</span>
      </div>
      <div
        className={styles.cardBody}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(coluna, cardKey)}
      >
        {cards[coluna][cardKey].map((cliente, index) =>
          renderCliente(cliente, coluna, cardKey, index)
        )}
        <button
          onClick={() => adicionarCliente(coluna, cardKey)}
          className={styles.button}
        >
          + Adicionar Cliente
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Ciclo de Vendas</h1>
      </div>

      <div className={styles.filters}>
        <select>
          <option>Empresa</option>
        </select>
        <select>
          <option>Status</option>
        </select>
        <select>
          <option>Vendedor</option>
        </select>
        <button>Gerar Gráfico</button>
      </div>

      {/* Kanban */}
      <div className={styles.kanban}>
        <div className={styles.column}>
          {renderCard("Prospecção", "colunaUm", "prospeccao")}
          {renderCard("Em Negociação", "colunaUm", "negociacao")}
        </div>
        <div className={styles.column}>
          {renderCard("Inicial", "colunaDois", "inicial")}
          {renderCard("Follow Up", "colunaDois", "followUp")}
        </div>
        <div className={styles.column}>
          {renderCard("Potencial", "colunaTres", "potencial")}
          {renderCard("Vendas", "colunaTres", "vendas")}
        </div>
        <div className={styles.column}>
          {renderCard("Manutenção", "colunaQuatro", "manutencao")}
          {renderCard("Não Vendas", "colunaQuatro", "naoVendas")}
        </div>
      </div>
      <div>
        <Funil cards={cards} />
      </div>
    </div>
  );
}
