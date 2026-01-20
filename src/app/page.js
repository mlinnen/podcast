import Link from 'next/link';
import styles from "./page.module.css";
import episodes from "@/data/episodes.json";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Let the Chips Fly</h1>
          <p className={styles.subtitle}>High stakes. Big risks. No regrets.</p>
          <div className={styles.heroActions}>
            <Link href="/feed.xml" className={styles.subscribeButton} target="_blank">
              Subscribe via RSS
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.grid}>
            {episodes.map((episode) => (
              <article key={episode.id} className={styles.card}>
                <div className={styles.cardImage}>
                  {/* Placeholder for now or actual image if mapped */}
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #222, #333)' }}></div>
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.cardDate}>{new Date(episode.date).toLocaleDateString()}</p>
                  <h2 className={styles.cardTitle}>{episode.title}</h2>
                  <p className={styles.cardDescription}>{episode.description}</p>
                  <Link href={`/episodes/${episode.slug}`} className={styles.cardLink}>
                    Listen Now &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
