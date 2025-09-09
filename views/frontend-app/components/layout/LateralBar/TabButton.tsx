"use client";
import React, { ReactNode } from "react";
import styles from "./LateralBar.module.css";

interface TabButtonProps {
  children: ReactNode;
  selectTab: () => void;
  active: boolean;
}

function TabButton({ children, selectTab, active }: TabButtonProps) {
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
