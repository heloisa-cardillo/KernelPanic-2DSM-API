"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TabButton from "./TabButton";
import styles from "./LateralBar.module.css";

const tab_data = [
  {
    title: "interações",
    id: "interações",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconinteracoesbranco.png"
              : "/images/iconinteracoes.png"
          }
          width={24}
          height={25}
          alt="Ícone de Interações"
        />
        <h3>Interações</h3>
      </>
    ),
  },
  {
    title: "vendas",
    id: "vendas",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconvendasbranco.png"
              : "/images/iconvendas.png"
          }
          width={24}
          height={25}
          alt="Ícone de Vendas"
        />
        <h3>Vendas</h3>
      </>
    ),
  },
  {
    title: "cliente",
    id: "cliente",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconclientebranco.png"
              : "/images/iconcliente.png"
          }
          width={24}
          height={25}
          alt="Ícone de Cliente"
        />
        <h3>Cliente</h3>
      </>
    ),
  },
  {
    title: "funil",
    id: "funil",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconfunilbranco.png"
              : "/images/iconfunil.png"
          }
          width={24}
          height={25}
          alt="Ícone de Funil de Vendas"
        />
        <h3>Funil de vendas</h3>
      </>
    ),
  },
  {
    title: "agendamento",
    id: "agendamento",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/iconagendamentobranco.png"
              : "/images/iconagendamento.png"
          }
          width={24}
          height={25}
          alt="Ícone de Agendamento"
        />
        <h3>Agendamento</h3>
      </>
    ),
  },
  {
    title: "grafico",
    id: "grafico",
    content: (active) => (
      <>
        <Image
          src={
            active
              ? "/images/icongraficobranco.png"
              : "/images/icongrafico.png"
          }
          width={24}
          height={25}
          alt="Ícone de Gráfico"
        />
        <h3>Gráfico</h3>
      </>
    ),
  },
];

function LateralBar() {
  const [tab, setTab] = useState("interações");

  const handleTabChange = (id) => {
    setTab(id);
  };

  return (
    <div className={styles.boxglobal}>
      <div className={styles.barralateral}>
        <Image
          src={"/images/logoneweglobal.jpg"}
          width={300}
          height={150}
          alt="Logo da Newe"
        />
        <div className={styles.tabButtons}>
          {tab_data.map((t) => (
            <TabButton
              key={t.id}
              selectTab={() => handleTabChange(t.id)}
              active={tab === t.id}
            >
              {t.content(tab === t.id)}
            </TabButton>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LateralBar;
