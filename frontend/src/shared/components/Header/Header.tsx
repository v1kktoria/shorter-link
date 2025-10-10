import React from "react";
import styles from "./Header.module.css";

interface HeaderProps { title?: string }

export const Header: React.FC<HeaderProps> = ({ title = 'Shorter Link' }) => (
  <header className={styles.header}>
    <div className={styles.headerContainer}>
      <h1 className={styles.brand}>{title}</h1>
    </div>
  </header>
);
