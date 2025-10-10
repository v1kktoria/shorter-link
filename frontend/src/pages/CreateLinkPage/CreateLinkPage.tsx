import React from "react";
import { useCreateLink } from "./useCreateLink";
import { Header } from "../../shared/components/Header/Header";
import { Card } from "../../shared/components/Card/Card";
import { Input } from "../../shared/components/Input/Input";
import { Button } from "../../shared/components/Button/Button";
import { Footer } from "../../shared/components/Footer/Footer";
import styles from "./CreateLinkPage.module.css";

export const CreateLinkPage: React.FC = () => {
  const { url, setUrl, created, loading, onCreate, onClear, handleKeyDown } = useCreateLink();

  return (
    <>
      <Header title="Shorter Link" />
      <main className="container main">
        <Card>
          <h2>Сократить ссылку</h2>
          <div className={styles.formRow}>
            <Input
              placeholder="Введите URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={onCreate} disabled={loading}>
              {loading ? "Создание..." : "Сократить"}
            </Button>
            <Button variant="ghost" onClick={onClear}>
              Очистить
            </Button>
          </div>

          {created && (
            <div className={styles.result}>
              <p>
                <strong>Короткая ссылка:</strong>{" "}
                <a href={created.shareUrl} target="_blank" rel="noopener noreferrer">
                  {created.shareUrl}
                </a>
              </p>
              <p>
                <strong>Статистика:</strong>{" "}
                <a href={created.statsUrl} target="_blank" rel="noopener noreferrer">
                  {created.statsUrl}
                </a>
              </p>
            </div>
          )}
        </Card>
      </main>
      <Footer />
    </>
  );
};
