import Link from 'next/link';
import { notFound } from 'next/navigation';
import AudioPlayer from '@/components/AudioPlayer';
import VideoPlayer from '@/components/VideoPlayer';
import episodes from '@/data/episodes.json';
import styles from './episode.module.css';

export async function generateStaticParams() {
    return episodes.map((episode) => ({
        slug: episode.slug,
    }));
}

export default async function EpisodePage({ params }) {
    const { slug } = await params;
    const episode = episodes.find((e) => e.slug === slug);

    if (!episode) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <Link href="/" className={styles.backLink}>
                &larr; Back to Episodes
            </Link>

            <header className={styles.header}>
                <h1 className={styles.title}>{episode.title}</h1>
                <div className={styles.meta}>
                    {new Date(episode.date).toLocaleDateString()} &bull; {episode.duration}
                </div>
            </header>

            <div className={styles.mediaSection}>
                {episode.videoUrl && (
                    <VideoPlayer src={episode.videoUrl} />
                )}

                {episode.audioUrl && (
                    <AudioPlayer src={episode.audioUrl} />
                )}
            </div>

            <div className={styles.content}>
                <p>{episode.description}</p>
            </div>
        </div>
    );
}
