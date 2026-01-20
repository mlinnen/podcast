import styles from './about.module.css';

export const metadata = {
    title: "About | Let the Chips Fly",
    description: "Learn more about the hosts and the mission of Let the Chips Fly.",
};

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About the Show</h1>

            <div className={styles.content}>
                <p>
                    "Let the Chips Fly" is the premier podcast for those who live life on the edge.
                    We talk about high stakes, big risks, and the philosophy of going all in.
                </p>

                <h2>Our Mission</h2>
                <p>
                    To explore the mindset of risk-takers across various industries, from professional gambling
                    to startup founding. We believe that without risk, there is no reward.
                </p>

                <h2>Hosts</h2>
                <div className={styles.hostGrid}>
                    <div className={styles.hostCard}>
                        <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#333', margin: '0 auto' }}></div>
                        <h3 className={styles.hostName}>Chip Leader</h3>
                        <p className={styles.hostBio}>Professional Risk Analyst & Host.</p>
                    </div>
                    <div className={styles.hostCard}>
                        <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#333', margin: '0 auto' }}></div>
                        <h3 className={styles.hostName}>Lady Luck</h3>
                        <p className={styles.hostBio}>Entrepreneur & Co-Host.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
