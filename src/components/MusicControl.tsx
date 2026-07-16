"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { Music, VolumeX, Volume2 } from "lucide-react";
import { music } from "@/data/weddingData";

export type MusicControlHandle = {
  /** Call from inside a real user-gesture handler (e.g. the envelope tap). */
  attemptPlay: () => void;
};

/**
 * Looping background music with an always-visible on/off button.
 *
 * IMPORTANT for the song to work:
 *   1. Put your file at  public/music/wedding-song.mp3
 *   2. The name must match exactly (lowercase, hyphen).
 * If the file is missing the button still shows but does nothing when
 * tapped — that's the usual reason "the song isn't working": the mp3
 * simply hasn't been copied into public/music/ yet.
 *
 * Browsers block audio that starts without a user gesture, so we attempt
 * playback from the envelope tap (a real gesture). If that's blocked, the
 * guest can tap the music button any time.
 */
const MusicControl = forwardRef<MusicControlHandle, { visible?: boolean }>(
  function MusicControl({ visible = true }, ref) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);
    const [ready, setReady] = useState(false);

    useImperativeHandle(ref, () => ({
      attemptPlay() {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0.6;
        audio
          .play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      },
    }));

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;
      const onCanPlay = () => setReady(true);
      const onPlay = () => setPlaying(true);
      const onPause = () => setPlaying(false);
      audio.addEventListener("canplaythrough", onCanPlay);
      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);
      return () => {
        audio.removeEventListener("canplaythrough", onCanPlay);
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
      };
    }, []);

    function toggle() {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0.6;
      if (playing) {
        audio.pause();
      } else {
        audio.play().catch(() => setPlaying(false));
      }
    }

    if (!visible) {
      return <audio ref={audioRef} src={music.src} loop preload="auto" />;
    }

    return (
      <>
        <audio ref={audioRef} src={music.src} loop preload="auto" />
        <button
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          title={ready ? (playing ? "Pause music" : "Play music") : "Music (add wedding-song.mp3 to public/music)"}
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/50 bg-cream-50/95 text-maroon shadow-card backdrop-blur-sm transition hover:scale-105"
        >
          {playing ? (
            <Volume2 className="h-5 w-5" />
          ) : ready ? (
            <Music className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5 opacity-60" />
          )}
        </button>
      </>
    );
  }
);

export default MusicControl;
