<script setup lang="ts">
import { FLAVORS } from '../data'

const emit = defineEmits<{ play: [src: string, title: string] }>()

// Los cuatro sabores a la vista de golpe; entran escalonados con v-reveal
const STAGGER = 140
</script>

<template>
  <section id="sabores" class="flavors" aria-labelledby="sabores-title">
    <img class="flavors__eagle" src="/images/eagle-tint.png" alt="" aria-hidden="true" />

    <header class="flavors__head">
      <h2 id="sabores-title" v-reveal class="eyebrow flavors__title">Descubre los sabores</h2>
      <span v-reveal:120 class="flavors__line" aria-hidden="true"></span>
    </header>

    <ul class="flavors__list">
      <li
        v-for="(f, i) in FLAVORS"
        :key="f.id"
        v-reveal
        class="flavor"
        :style="{ '--accent': f.accent, '--reveal-delay': `${200 + i * STAGGER}ms` }"
      >
        <div class="flavor__bottles">
          <span class="flavor__glow" aria-hidden="true"></span>
          <img class="b b--750" :src="f.bottle" :alt="`${f.name} 750 ml`" width="215" height="900" loading="lazy" />
          <img class="b b--375" :src="f.ticket" :alt="`${f.name} 375 ml`" width="348" height="720" loading="lazy" />
          <img class="b b--160" :src="f.mini" :alt="`${f.name} 160 ml`" width="153" height="560" loading="lazy" />
        </div>

        <div class="flavor__info">
          <h3 class="display flavor__name">{{ f.name }}</h3>
          <p class="flavor__es">{{ f.es }}</p>
          <p class="flavor__note">{{ f.note }}</p>
          <button class="btn flavor__film" type="button" @click="emit('play', f.film, `${f.name} — el film`)">
            <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            Ver el film
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
/* Mobile first: dos columnas en móvil, cuatro en escritorio */
.flavors {
  position: relative;
  overflow: hidden;
  /* Abajo deja espacio al botón flotante de WhatsApp */
  padding: clamp(72px, 11vh, 128px) 16px clamp(88px, 12vh, 140px);
}

.flavors__eagle {
  position: absolute;
  right: -30%;
  top: 50%;
  width: 90vw;
  max-width: 640px;
  transform: translateY(-50%);
  opacity: 0.16;
  pointer-events: none;
}

.flavors__head {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  margin-bottom: clamp(40px, 7vh, 80px);
  text-align: center;
}

.flavors__title {
  margin: 0;
}

.flavors__line {
  display: block;
  width: 64px;
  height: 1px;
  background: var(--cream-faint);
}

.flavors__list {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 48px 12px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

.flavor {
  flex: 1 1 calc(50% - 6px);
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  text-align: center;
}

.flavor__bottles {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: clamp(2px, 1vw, 12px);
  width: 100%;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--cream-faint);
}

.flavor__glow {
  position: absolute;
  inset: 8% 4% 0;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--accent) 38%, transparent), transparent);
  filter: blur(28px);
  opacity: 0.75;
  transition: opacity 0.6s var(--ease-out);
  pointer-events: none;
}

.b {
  position: relative;
  width: auto;
  filter: drop-shadow(0 18px 24px rgba(0, 0, 0, 0.45));
  transition: transform 0.7s var(--ease-out);
}

.b--750 {
  height: 170px;
}

.b--375 {
  height: 130px;
}

.b--160 {
  height: 86px;
}

.flavor__info {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.flavor__name {
  /* Siempre el alto de dos líneas para que subtítulos y botones queden alineados */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.1em;
  font-size: clamp(1.15rem, 5vw, 1.6rem);
  line-height: 1.05;
  text-wrap: balance;
}

.flavor__es {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.64rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.flavor__note {
  flex: 1;
  margin: 0 0 6px;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--cream-dim);
  text-wrap: pretty;
}

.flavor__film {
  min-height: 44px;
  gap: 8px;
  padding: 0 16px;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
}

/* Hover sutil: las botellas suben un poco y el halo se enciende */
@media (hover: hover) {
  .flavor:hover .flavor__glow {
    opacity: 1;
  }

  .flavor:hover .b--750 {
    transform: translateY(-8px);
  }

  .flavor:hover .b--375 {
    transform: translateY(-5px);
    transition-delay: 40ms;
  }

  .flavor:hover .b--160 {
    transform: translateY(-3px);
    transition-delay: 80ms;
  }
}

/* Tablet */
@media (min-width: 600px) {
  .flavors {
    padding-left: var(--gutter);
    padding-right: var(--gutter);
  }

  .flavors__list {
    gap: 64px 24px;
  }

  .flavor {
    flex-basis: calc(50% - 12px);
  }

  .b--750 {
    height: 260px;
  }

  .b--375 {
    height: 200px;
  }

  .b--160 {
    height: 130px;
  }

  .flavor__es {
    font-size: 0.74rem;
    letter-spacing: 0.3em;
  }

  .flavor__note {
    font-size: 0.95rem;
  }

  .flavor__film {
    padding: 0 24px;
    font-size: 0.74rem;
    letter-spacing: 0.22em;
  }
}

/* Escritorio: los cuatro en una fila */
@media (min-width: 1024px) {
  .flavors__eagle {
    right: -6%;
    width: 48vw;
  }

  .flavors__list {
    flex-wrap: nowrap;
    gap: clamp(20px, 2.4vw, 40px);
  }

  .flavor {
    flex: 1 1 0;
  }

  .b--750 {
    height: clamp(220px, 21vw, 300px);
  }

  .b--375 {
    height: clamp(170px, 16vw, 230px);
  }

  .b--160 {
    height: clamp(112px, 10.5vw, 150px);
  }

  .flavor__name {
    font-size: clamp(1.3rem, 1.9vw, 1.9rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .b,
  .flavor__glow {
    transition: none;
  }

  .flavor:hover .b {
    transform: none;
  }
}
</style>
