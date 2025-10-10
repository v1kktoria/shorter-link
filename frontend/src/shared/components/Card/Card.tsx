import React from "react";
import { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
    <section className={`${styles.card} ${className}`}>
        {children}
    </section>
);