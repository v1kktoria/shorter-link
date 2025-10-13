import React from "react";
import styles from "./ClicksTable.module.css";

export const ClicksTable = ({ clicks }: { clicks: any[] }) => (
    <div className={styles.wrapper}>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Дата</th><th>IP</th><th>Страна</th><th>Регион</th><th>Браузер</th><th>Версия</th><th>ОС</th>
                </tr>
            </thead>
            <tbody>
                {clicks.map((c, i) => (
                    <tr key={i}>
                        <td>{new Date(c.created_at).toLocaleString()}</td>
                        <td>{c.ip}</td>
                        <td>{c.country || "-"}</td>
                        <td>{c.region || "-"}</td>
                        <td>{c.browser || "-"}</td>
                        <td>{c.browserVersion || "-"}</td>
                        <td>{c.os || "-"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)