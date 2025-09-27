"use client";

import React, { useEffect, useState } from "react";
import styles from "./Kanban.module.css";
import Funil from "../FunilVendas/FunilVendas";
import axios from "axios";

export default function CicloDeVendas() {
    const [cards, setCards] = useState({
        colunaUm: { prospeccao: [], negociacao: [] },
        colunaDois: { inicial: [], followUp: [] },
        colunaTres: { potencial: [], vendas: [] },
        colunaQuatro: { manutencao: [], naoVendas: [] },
    });

    const cardToFaseID = {
        prospeccao: 1,
        inicial: 2,
        potencial: 3,
        manutencao: 4,
        negociacao: 5,
        followUp: 6,
        vendas: 7,
        naoVendas: 8,
    };

    const fetchGetClientes = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/funilVendas"
            );
            const clientes = response.data.message;

            const novoCards = {
                colunaUm: { prospeccao: [], negociacao: [] },
                colunaDois: { inicial: [], followUp: [] },
                colunaTres: { potencial: [], vendas: [] },
                colunaQuatro: { manutencao: [], naoVendas: [] },
            };

            const estagioToCard = {
                Prospeccao: { coluna: "colunaUm", card: "prospeccao" },
                Negociacao: { coluna: "colunaUm", card: "negociacao" },
                Inicial: { coluna: "colunaDois", card: "inicial" },
                FollowUp: { coluna: "colunaDois", card: "followUp" },
                Potencial: { coluna: "colunaTres", card: "potencial" },
                Vendas: { coluna: "colunaTres", card: "vendas" },
                Manutencao: { coluna: "colunaQuatro", card: "manutencao" },
                NaoVendas: { coluna: "colunaQuatro", card: "naoVendas" },
            };

            clientes.forEach((cliente) => {
                const estagio = cliente.funil.estagio_nome;

                const mapeamento = estagioToCard[estagio];
                if (mapeamento) {
                    const contatoTelefone = cliente.contatos.find(
                        (c) => c.tipo_contato === "telefone"
                    );
                    const contatoEmail = cliente.contatos.find(
                        (c) => c.tipo_contato === "email"
                    );

                    const clienteFormatado = {
                        id: cliente.cliente_ID,
                        nome: cliente.nome,
                        empresa: cliente.nome,
                        telefone: contatoTelefone?.valor_contato || "N/A",
                        email: contatoEmail?.valor_contato || "N/A",
                        status: estagio,
                    };

                    novoCards[mapeamento.coluna][mapeamento.card].push(
                        clienteFormatado
                    );
                } else {
                    console.warn("Estágio não mapeado:", estagio);
                }
            });

            setCards(novoCards);
        } catch (err) {
            console.error("Erro ao buscar clientes:", err);
        }
    };

    useEffect(() => {
        fetchGetClientes();
    }, []);

    const [draggingCliente, setDraggingCliente] = useState(null);

    const handleDragStart = (cliente, origemColuna, origemCard) => {
        setDraggingCliente({ cliente, origemColuna, origemCard });
    };

    const handleDrop = async (destinoColuna, destinoCard) => {
        if (!draggingCliente) return;

        const { cliente, origemColuna, origemCard } = draggingCliente;

        if (origemColuna === destinoColuna && origemCard === destinoCard) {
            setDraggingCliente(null);
            return;
        }

        setCards((prev) => {
            const origemLista = prev[origemColuna][origemCard].filter(
                (c) => c.id !== cliente.id
            );

            const destinoLista = prev[destinoColuna][destinoCard].some(
                (c) => c.id === cliente.id
            )
                ? [...prev[destinoColuna][destinoCard]]
                : [...prev[destinoColuna][destinoCard], cliente];

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
        try {
            await axios.post("http://localhost:5000/funilVendas/moverCliente", {
                cliente_id: cliente.id,
                novo_estagio: cardToFaseID[destinoCard],
            });
            console.log("Cliente atualizado no backend");
            await fetchGetClientes();
        } catch (error) {
            console.error("Erro ao atualizar cliente no backend:", error);
        }

        setDraggingCliente(null);
    };

    const renderCliente = (cliente, coluna, cardKey, index) => (
        <div
            key={index}
            className={styles.clienteCard}
            draggable
            onDragStart={() => handleDragStart(cliente, coluna, cardKey)}
        >
            <strong> {cliente.nome}</strong>
            <div>🏢 {cliente.empresa}</div>
            <div>📞 {cliente.telefone}</div>
            <div>✉️ {cliente.email}</div>
            <div>⚙️ {cliente.status}</div>
        </div>
    );

    const renderCard = (titulo, coluna, cardKey) => (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                {titulo} <span>{cards[coluna][cardKey].length}</span>
            </div>
            <div
                className={styles.cardBody}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(coluna, cardKey);
                }}
            >
                {cards[coluna][cardKey].map((cliente, index) =>
                    renderCliente(cliente, coluna, cardKey, index)
                )}
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.tittle}>Funil de Vendas</h1>

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
