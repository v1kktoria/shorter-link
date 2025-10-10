import React from "react";
import styles from "./Button.module.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost"};

export const Button: React.FC<Props> = ({ children, variant = 'primary', className = '', ...rest }) => (
  <button className={`${styles.btn} ${variant === 'ghost' ? styles.ghost : ''} ${className}`} {...rest}>
    {children}
  </button>
);