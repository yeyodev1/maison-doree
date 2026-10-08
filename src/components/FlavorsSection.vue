<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { FLAVORS } from '../data'

const emit = defineEmits<{ play: [src: string, title: string] }>()

// Carrusel automático: la página se recorre libre y, mientras la sección está
// a la vista, los sabores pasan solos. Tocar una pestaña o flecha reinicia el tiempo.
const INTERVAL = 5000
const section = ref<HTMLElement>()
const index = ref(0)
const visible = ref(false)
const reduced = ref(false)
const running = computed(() => visible.value && !reduced.value)
// Cambia la key para reiniciar la barra de progreso en cada sabor
const tick = ref(0)

let timer = 0
function schedule() {
  clearTimeout(timer)
  if (running.value && !document.hidden) timer = window.setTimeout(next, INTERVAL)
}

function goTo(i: number) {
  index.value = (i + FLAVORS.length) % FLAVORS.length
  tick.value++
  schedule()
}
function next() {
  goTo(index.value + 1)
}
function prev() {
  goTo(index.value - 1)
}

// Deslizar con el dedo en móvil
let startX = 0
function onTouchStart(e: TouchEvent) {
  startX = e.touches[0]!.clientX
}
function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0]!.clientX - startX
  if (Math.abs(dx) > 40) (dx < 0 ? next : prev)()
}

let io: IntersectionObserver | undefined
function onVisibility() {
  tick.value++
  schedule()
}

onMounted(() => {
  reduced.value = matchMedia('(prefers-reduced-motion: reduce)').matches
  io = new IntersectionObserver(
    ([entry]) => {
      visible.value = entry!.isIntersecting
      tick.value++
      schedule()
    },
    { threshold: 0.45 },
  )
  if (section.value) io.observe(section.value)
  document.addEventListener('visibilitychange', onVisibility)
})
onBeforeUnmount(() => {
  io?.disconnect()
  clearTimeout(timer)
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <section
    id="sabores"
    ref="section"
    class="flavors"
    :style="{ '--accent': FLAVORS[index]!.accent }"
    aria-roledescription="carrusel"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <div class="flavors__stage">
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
        <div class="flavors__track" :style="{ transform: `translate3d(${-index * 100}%, 0, 0)` }">
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

      <div class="flavors__nav">
        <button class="flavors__arrow" type="button" aria-label="Sabor anterior" @click="prev">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>
        </button>
        <div class="flavors__progress" aria-hidden="true">
          <span v-for="(f, i) in FLAVORS" :key="f.id" :class="{ 'is-done': i < index }">
            <i v-if="i === index" :key="tick" :class="{ 'is-running': running }"></i>
          </span>
        </div>
        <button class="flavors__arrow" type="button" aria-label="Sabor siguiente" @click="next">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Mobile first */
.flavors {
  position: relative;
}

.flavors__stage {
  position: relative;
  height: 100svh;
  min-height: 620px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* Abajo deja espacio al botón flotante de WhatsApp */
  padding: 64px 0 88px;
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
  font-family: var(--font-sans);
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
  /* Siempre un sabor completo: cambia solo al pasar cada tramo de scroll */
  transition: transform 0.9s var(--ease-out);
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
  height: clamp(180px, 34svh, 520px);
}

.b--375 {
  height: clamp(140px, 26svh, 400px);
}

.b--160 {
  height: clamp(90px, 17svh, 260px);
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
  font-family: var(--font-sans);
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.slide__note {
  margin: 0 0 8px;
  font-family: var(--font-sans);
  font-size: 0.98rem;
  line-height: 1.5;
  color: var(--cream-dim);
}

.slide__film {
  min-height: 44px;
  padding: 0 26px;
}

.flavors__nav {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-top: 18px;
}

.flavors__arrow {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--cream-faint);
  background: none;
  transition: border-color 0.3s;
}

.flavors__arrow:hover {
  border-color: var(--cream);
}

.flavors__progress {
  display: flex;
  gap: 6px;
  width: min(240px, 50vw);
}

.flavors__progress span {
  position: relative;
  flex: 1;
  height: 1px;
  overflow: hidden;
  background: var(--cream-faint);
}

.flavors__progress span.is-done {
  background: var(--cream);
}

.flavors__progress i {
  position: absolute;
  inset: 0;
  background: var(--cream);
  transform-origin: left;
  /* Se llena en el tiempo que tarda en pasar al siguiente sabor */
  animation: fill 5s linear both paused;
}

.flavors__progress i.is-running {
  animation-play-state: running;
}

@keyframes fill {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* Tablet / escritorio */
@media (min-width: 900px) {
  .flavors__stage {
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

/* Sin animaciones: no pasa solo, se navega con flechas o pestañas */
@media (prefers-reduced-motion: reduce) {
  .flavors__track,
  .slide {
    transition: none;
  }
}
</style>
