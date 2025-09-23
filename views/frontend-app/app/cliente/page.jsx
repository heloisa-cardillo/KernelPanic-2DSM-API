'use client'

import React from 'react'
import styles from './App.module.css'

export default function Page() {
  return (
    <div className={styles.conteudo}>
      <div className={styles.container}>
        <h1>Cadastro Cliente</h1>
        <form action="/salvar-cliente" method="post" className={styles.formulario}>
          <label htmlFor="endereco" className={styles.textLabel}>Endereço:</label>
          <input className={styles.input1} type="text" id="endereco" name="endereco" />

          <label htmlFor="atividade" className={styles.textLabel}>Atividade:</label>
          <input className={styles.input1} type="text" id="atividade" name="atividade" />

          <label htmlFor="seg" className={styles.textLabel}>Segmento de Atuação:</label>
          <input className={styles.input1} type="text" id="seg" name="seg" />

          <div className={styles.inputAgrupado}>
            <div className={styles.inputGroup}>
              <label htmlFor="tel" className={styles.textLabel}>Telefone:</label>
              <input className={styles.input1} type="text" id="tel" name="tel" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.textLabel}>E-mail:</label>
              <input className={styles.input1} type="text" id="email" name="email" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="celular" className={styles.textLabel}>Celular:</label>
              <input className={styles.input1} type="text" id="celular" name="celular" />
            </div>
          </div>

          <label htmlFor="dep" className={styles.textLabel}>Departamento Responsável:</label>
          <input className={styles.input1} type="text" id="dep" name="dep" />

          <button className={styles.botao}>Enviar Formulário</button>
        </form>
      </div>
    </div>
  )
}
