<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { FLAVORS } from '../data'

const emit = defineEmits<{ play: [src: string, title: string] }>()

// Carrusel guiado por el scroll: la sección se fija y los sabores avanzan
// de izquierda a derecha mientras el usuario baja.
const section = ref<HTMLElement>()
const progress = ref(0)
const last = FLAVORS.length - 1
const index = computed(() => Math.min(last, Math.round(progress.value * last)))

let frame = 0
function measure() {
  frame = 0
  const el = section.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const travel = rect.height - window.innerHeight
  progress.value = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0
}
function onScroll() {
  if (!frame) frame = requestAnimationFrame(measure)
}

function goTo(i: number) {
  const el = section.value
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY
  const travel = el.offsetHeight - window.innerHeight
  window.scrollTo({ top: top + (travel * i) / last, behavior: 'smooth' })
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <section
    id="sabores"
    ref="section"
    class="flavors"
    :style="{ '--count': FLAVORS.length, '--accent': FLAVORS[index]!.accent }"
  >
    <div class="flavors__sticky">
      <div class="flavors__glow" aria-hidden="true"></div>
      <img class="flavors__eagle" src="/images/eagle-tint.png" alt="" aria-hidden="true" />

      <header class="flavors__head">
        <p class="eyebrow">Descubre los sabores</p>
        <ul class="flavors__tabs" aria-label="Sabores">
          <li v-for="(f, i) in FLAVORS" :key="f.id">
            <button type="button" :aria-current="i === index" :class="{ 'is-active': i === index }" @click="goTo(i)">
              {{ f.name }}
            </button>
          </li>
        </ul>
      </header>

      <div class="flavors__viewport">
        <div class="flavors__track" :style="{ transform: `translate3d(${-progress * last * 100}%, 0, 0)` }">
          <article
            v-for="(f, i) in FLAVORS"
            :key="f.id"
            class="slide"
            :class="{ 'is-active': i === index }"
            :aria-hidden="i !== index"
          >
            <h2 class="display slide__name">{{ f.name }}</h2>
            <div class="slide__bottles">
              <img class="b b--750" :src="f.bottle" :alt="`${f.name} 750 ml`" width="215" height="900" />
              <img class="b b--375" :src="f.ticket" :alt="`${f.name} 375 ml`" width="348" height="720" />
              <img class="b b--160" :src="f.mini" :alt="`${f.name} 160 ml`" width="153" height="560" />
            </div>
            <div class="slide__info">
              <p class="slide__es">{{ f.es }}</p>
              <p class="slide__note">{{ f.note }}</p>
              <button
                class="btn slide__film"
                type="button"
                :tabindex="i === index ? 0 : -1"
                @click="emit('play', f.film, `${f.name} — el film`)"
              >
                <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
                Ver el film
              </button>
            </div>
          </article>
        </div>
      </div>

      <div class="flavors__progress" aria-hidden="true">
        <span :style="{ transform: `scaleX(${(index + 1) / FLAVORS.length})` }"></span>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Mobile first */
.flavors {
  position: relative;
  height: calc(var(--count) * 100svh);
}

.flavors__sticky {
  position: sticky;
  top: 0;
  height: 100svh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 64px 0 28px;
}

.flavors__glow {
  position: absolute;
  inset: 20% 10%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--accent) 36%, transparent), transparent);
  filter: blur(40px);
  transition: background 0.8s var(--ease-out);
  pointer-events: none;
}

.flavors__eagle {
  position: absolute;
  right: -30%;
  top: 50%;
  width: 90vw;
  max-width: 640px;
  transform: translateY(-50%);
  opacity: 0.3;
  pointer-events: none;
}

.flavors__head {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 0 20px;
  text-align: center;
}

.flavors__tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.flavors__tabs button {
  position: relative;
  border: 0;
  background: none;
  padding: 4px 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.9rem;
  color: var(--cream-dim);
  transition: color 0.3s;
}

.flavors__tabs button::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: var(--cream);
  transform: scaleX(0);
  transition: transform 0.5s var(--ease-out);
}

.flavors__tabs button.is-active {
  color: var(--cream);
}

.flavors__tabs button.is-active::after {
  transform: scaleX(1);
}

.flavors__viewport {
  position: relative;
  flex: 1;
  min-height: 0;
  margin-top: 12px;
}

.flavors__track {
  display: flex;
  height: 100%;
  will-change: transform;
}

.slide {
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 20px;
  text-align: center;
  opacity: 0.35;
  transition: opacity 0.6s var(--ease-out);
}

.slide.is-active {
  opacity: 1;
}

.slide__name {
  font-size: clamp(2rem, 10vw, 6.6rem);
  line-height: 1;
}

.slide__bottles {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: clamp(6px, 2vw, 28px);
  min-height: 0;
}

.b {
  width: auto;
  filter: drop-shadow(0 26px 34px rgba(0, 0, 0, 0.45));
}

.b--750 {
  height: clamp(220px, 38svh, 520px);
}

.b--375 {
  height: clamp(170px, 29svh, 400px);
}

.b--160 {
  height: clamp(110px, 19svh, 260px);
}

.slide__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  max-width: 460px;
}

.slide__es {
  margin: 0;
  font-family: var(--font-narrow);
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.slide__note {
  margin: 0 0 8px;
  font-family: var(--font-serif);
  font-size: 0.98rem;
  line-height: 1.5;
  color: var(--cream-dim);
}

.slide__film {
  min-height: 44px;
  padding: 0 26px;
}

.flavors__progress {
  position: relative;
  width: min(240px, 60vw);
  height: 1px;
  margin: 18px auto 0;
  background: var(--cream-faint);
}

.flavors__progress span {
  position: absolute;
  inset: 0;
  background: var(--cream);
  transform-origin: left;
  transition: transform 0.5s var(--ease-out);
}

/* Tablet / escritorio */
@media (min-width: 900px) {
  .flavors__sticky {
    padding: 96px 0 40px;
  }

  .flavors__tabs {
    gap: 8px 32px;
  }

  .flavors__tabs button {
    font-size: 1.05rem;
  }

  .flavors__eagle {
    right: -6%;
    width: 48vw;
  }

  .slide {
    gap: 16px;
  }

  .b--750 {
    height: clamp(300px, 48svh, 560px);
  }

  .b--375 {
    height: clamp(230px, 37svh, 430px);
  }

  .b--160 {
    height: clamp(150px, 24svh, 280px);
  }

  .slide__note {
    font-size: 1.1rem;
  }
}

/* Pantallas bajas: se ocultan detalles para que todo entre */
@media (max-height: 700px) {
  .slide__note {
    display: none;
  }
}

/* Sin animaciones: carrusel horizontal normal con deslizamiento */
@media (prefers-reduced-motion: reduce) {
  .flavors {
    height: auto;
  }

  .flavors__sticky {
    position: relative;
    height: auto;
    min-height: 100svh;
  }

  .flavors__viewport {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }

  .flavors__track {
    transform: none !important;
  }

  .slide {
    scroll-snap-align: center;
    opacity: 1;
  }
}
</style>
