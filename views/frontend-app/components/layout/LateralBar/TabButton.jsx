"use client";
import React from "react";
import styles from "./LateralBar.module.css";

function TabButton({ children, selectTab, active }) {
  return (
    <button
      onClick={selectTab}
      className={`${styles.menuItem} ${active ? styles.menuItemAtivo : ""}`}
    >
      {children}
    </button>
  );
}

export default TabButton;
