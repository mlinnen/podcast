"use client";
import { useState, useRef, useEffect } from 'react';
import styles from './players.module.css';
import { Play, Pause } from 'lucide-react'; // Need to check if lucide-react is installed, if not, I'll use text or SVG

export default function AudioPlayer({ src }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const current = audioRef.current.currentTime;
        const dur = audioRef.current.duration;
        setCurrentTime(current);
        if (dur) {
            setProgress((current / dur) * 100);
        }
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        const width = e.target.closest(`.${styles.progressBar}`).clientWidth;
        const clickX = e.nativeEvent.offsetX;
        const newTime = (clickX / width) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={styles.playerWrapper}>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
            <div className={styles.audioContainer}>
                <button onClick={togglePlay} className={styles.playButton} aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? "||" : "▶"}
                </button>
                <div className={styles.progressBar} onClick={handleSeek}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                </div>
                <div className={styles.time}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
            </div>
        </div>
    );
}
