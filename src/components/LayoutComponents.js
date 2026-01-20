import Link from 'next/link';
import styles from './layout.module.css';
import { Rss } from 'lucide-react';

export function Header() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                Let the Chips Fly
            </Link>
            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}>Episodes</Link>
                <Link href="/about" className={styles.navLink}>About</Link>
            </nav>
        </header>
    );
}

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <Link href="/feed.xml" className={styles.rssLink} target="_blank">
                    <Rss size={16} /> Subscribe via RSS
                </Link>
                <p>&copy; {new Date().getFullYear()} Let the Chips Fly. All rights reserved.</p>
            </div>
        </footer>
    );
}
