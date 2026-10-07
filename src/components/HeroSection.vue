<script setup lang="ts">
import { ref } from 'vue'
import { WHATSAPP } from '../data'

const emit = defineEmits<{ play: [src: string, title: string] }>()

const video = ref<HTMLVideoElement>()
const paused = ref(false)

function togglePause() {
  const v = video.value
  if (!v) return
  if (v.paused) v.play()
  else v.pause()
  paused.value = v.paused
}
</script>

<template>
  <section id="top" class="hero">
    <video
      ref="video"
      class="hero__video"
      src="/video/hero-loop.mp4"
      poster="/video/hero-poster.jpg"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      aria-hidden="true"
    ></video>
    <div class="hero__shade" aria-hidden="true"></div>

    <div class="hero__content">
      <h1 class="hero__title">
        <span v-reveal:150>El secreto más dulce</span>
        <span v-reveal:350>se sirve con hielo.</span>
      </h1>
      <p v-reveal:550 class="hero__sub">Prueba sus diferentes sabores.</p>
      <div v-reveal:750 class="hero__actions">
        <a class="btn" :href="WHATSAPP" target="_blank" rel="noopener">Compra ahora</a>
        <button
          class="hero__film"
          type="button"
          @click="emit('play', '/video/saint-manicho.mp4', 'Saint Manicho — el film')"
        >
          <span class="hero__film-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          </span>
          <span>Ver el film</span>
        </button>
      </div>
    </div>

    <button class="hero__pause" type="button" :aria-label="paused ? 'Reproducir fondo' : 'Pausar fondo'" @click="togglePause">
      <svg v-if="!paused" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" />
      </svg>
      <svg v-else viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path d="M8 5v14l11-7z" fill="currentColor" />
      </svg>
    </button>

    <a class="hero__scroll" href="#sabores" aria-label="Bajar a los sabores">
      <span></span>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background: var(--wine-950);
  /* Borde inferior curvo, como la referencia (no recto) */
  border-bottom-left-radius: clamp(56px, 9vw, 160px);
  isolation: isolate;
}

.hero__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(28, 3, 2, 0.5) 0%, transparent 20%),
    linear-gradient(90deg, rgba(28, 3, 2, 0.62) 0%, rgba(28, 3, 2, 0.12) 50%, transparent 72%),
    linear-gradient(0deg, rgba(28, 3, 2, 0.55) 0%, transparent 28%);
}

.hero__content {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0 var(--gutter) clamp(110px, 16vh, 170px);
}

.hero__title {
  margin: 0;
  font-family: var(--font-script);
  font-weight: 400;
  font-size: clamp(4rem, 9vw, 8.5rem);
  line-height: 0.92;
}

.hero__title span {
  display: block;
}

.hero__sub {
  margin: 18px 0 34px;
  font-family: var(--font-serif);
  font-size: clamp(1.15rem, 1.8vw, 1.6rem);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 28px;
}

.hero__film {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  border: 0;
  background: none;
  padding: 0;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.hero__film-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--cream);
  color: var(--wine-800);
  transition: transform 0.4s var(--ease-out);
}

.hero__film-icon::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid rgba(244, 233, 216, 0.5);
  animation: pulse 2.6s var(--ease-out) infinite;
}

.hero__film:hover .hero__film-icon {
  transform: scale(1.08);
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
    opacity: 1;
  }
  100% {
    transform: scale(1.35);
    opacity: 0;
  }
}

.hero__pause {
  position: absolute;
  z-index: 2;
  left: var(--gutter);
  bottom: 32px;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--cream-faint);
  background: rgba(28, 3, 2, 0.35);
  backdrop-filter: blur(6px);
}

.hero__scroll {
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 28px;
  width: 1px;
  height: 56px;
  overflow: hidden;
  background: var(--cream-faint);
}

.hero__scroll span {
  position: absolute;
  inset: 0;
  background: var(--cream);
  animation: drip 2.2s var(--ease-out) infinite;
}

@keyframes drip {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

@media (max-width: 700px) {
  .hero__shade {
    background:
      linear-gradient(180deg, rgba(28, 3, 2, 0.6) 0%, transparent 25%),
      linear-gradient(0deg, rgba(28, 3, 2, 0.92) 0%, rgba(28, 3, 2, 0.4) 55%, transparent 80%);
  }

  .hero__scroll {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__film-icon::after,
  .hero__scroll span {
    animation: none;
  }
}
</style>
