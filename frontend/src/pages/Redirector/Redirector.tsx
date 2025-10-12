import React from "react";
import { useParams } from "react-router-dom";
import styles from "./Redirector.module.css";
import { useRedirect } from "./useRedirector";

export const Redirector: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  useRedirect(shortCode);

  return (
    <div className={styles.redirectContainer}>
      <p className={styles.text}>Перенаправление...</p>
      <div className={styles.spinner}></div>
    </div>
  );
};