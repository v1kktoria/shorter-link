import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../shared/components/Header/Header";
import { Card } from "../../shared/components/Card/Card";
import { Button } from "../../shared/components/Button/Button";
import { ClicksTable } from "../../shared/components/ClicksTable/ClicksTable";
import { Pagination } from "../../shared/components/Pagination/Pagination";
import { Footer } from "../../shared/components/Footer/Footer";
import { GeoBarChart } from "../../shared/components/Charts/GeoBarChart";
import { DonutChart } from "../../shared/components/Charts/DonutChart";
import styles from "./StatsPage.module.css";
import { useStats } from "./useStats";

export const StatsPage: React.FC = () => {
    const { shortCode } = useParams<{ shortCode: string }>();
    const { stats, page, setPage, totalPages, loading, showCountries, setShowCountries, geoData, browsers, os } = useStats(shortCode!);

    const handleCopy = (text: string) => navigator.clipboard.writeText(text);

    return (
        <>
            <Header title="Shorter Link - Статистика" />
            <main className="container main">
                <Card className={styles.infoCard}>
                    <h2>{stats?.originalUrl ? new URL(stats.originalUrl).hostname : "Загрузка..."}</h2>
                    <div className={styles.infoGrid}>
                        <span>Короткая ссылка:</span>
                        <span className={styles.linkGroup}>
                            <a href={`${window.location.origin}/${shortCode}`} target="_blank" rel="noreferrer" className={styles.shortLink}>
                                {`${window.location.origin}/${shortCode}`}
                            </a>
                            <Button variant="ghost" size="small" onClick={() => handleCopy(`${window.location.origin}/${shortCode}`)}>Копировать</Button>
                        </span>

                        <span>Оригинальная:</span>
                        <a href={stats?.originalUrl} target="_blank" rel="noreferrer">{stats?.originalUrl}</a>

                        <span>Всего переходов:</span>
                        <strong>{stats?.total ?? 0}</strong>

                        <span>Создано:</span>
                        <span>{stats?.created_at ? new Date(stats.created_at).toLocaleString() : "-"}</span>
                    </div>
                </Card>

                <Card className={styles.card}>
                    <Button variant="ghost" size="small" onClick={() => setShowCountries(prev => !prev)}>
                        {showCountries ? "Показать регионы" : "Показать страны"}
                    </Button>
                    <GeoBarChart data={geoData} />
                </Card>

                <Card className={styles.card}>
                    <div className={styles.row}>
                        <DonutChart title="ОС" data={os} />
                        <DonutChart title="Браузеры" data={browsers} />
                    </div>
                </Card>

                <Card>
                    <h3>История переходов</h3>
                    <ClicksTable clicks={stats?.clicks || []} />
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                </Card>
            </main>
            <Footer />
        </>
    );
};
