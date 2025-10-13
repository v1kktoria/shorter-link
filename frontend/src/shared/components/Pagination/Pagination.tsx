import React from "react";
import styles from "./Pagination.module.css"
import { Button } from "../Button/Button";

export const Pagination = ({ page, totalPages, setPage }: { page: number, totalPages: number, setPage: (p: number) => void }) => (
    <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button key={p} variant={p === page ? "primary" : "ghost"} size="small" onClick={() => setPage(p)}>{p}</Button>
        ))}
    </div>
)