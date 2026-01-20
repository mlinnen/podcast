import styles from './players.module.css';

export default function VideoPlayer({ src }) {
    // Check if it's an embed URL (standard YouTube/Vimeo embeds usually)
    const isEmbed = src.includes('embed');

    if (isEmbed) {
        return (
            <div className={styles.playerWrapper}>
                <div className={styles.videoContainer}>
                    <iframe
                        src={src}
                        className={styles.videoFrame}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        );
    }

    // Fallback to standard video tag
    return (
        <div className={styles.playerWrapper}>
            <video controls width="100%" className={styles.videoElement}>
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
