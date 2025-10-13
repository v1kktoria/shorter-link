import React from "react";
import styles from "./Button.module.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
   variant?: "primary" | "ghost",
   size?: "small" | "medium";
  };

export const Button: React.FC<Props> = ({ children, variant = 'primary', size = 'medium', className = '', ...rest }) => (
  <button className={`${styles.btn} ${variant === 'ghost' ? styles.ghost : ''} ${styles[size]} ${className}`} {...rest}>
    {children}
  </button>
);