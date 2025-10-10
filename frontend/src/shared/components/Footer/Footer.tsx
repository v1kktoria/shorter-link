import React from "react";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => (
    <footer className={styles.footer}>
        <div className="container">@ {new Date().getFullYear()} Shorter Link</div>
    </footer>
)