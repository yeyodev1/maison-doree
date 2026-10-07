<script setup lang="ts">
import { computed, ref } from 'vue'
import { FLAVORS } from '../data'

const emit = defineEmits<{ play: [src: string, title: string] }>()

const index = ref(0)
const dir = ref<1 | -1>(1)
const flavor = computed(() => FLAVORS[index.value]!)

function go(i: number) {
  const n = FLAVORS.length
  const next = ((i % n) + n) % n
  dir.value = i > index.value ? 1 : -1
  index.value = next
}

let touchX = 0
function onTouchStart(e: TouchEvent) {
  touchX = e.touches[0]!.clientX
}
function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0]!.clientX - touchX
  if (Math.abs(dx) > 50) go(index.value + (dx < 0 ? 1 : -1))
}
</script>

<template>
  <section id="sabores" class="flavors" :style="{ '--accent': flavor.accent }">
    <header class="flavors__head">
      <p v-reveal class="eyebrow">Descubre los sabores</p>
      <ul v-reveal:150 class="flavors__tabs" role="tablist" aria-label="Sabores">
        <li v-for="(f, i) in FLAVORS" :key="f.id">
          <button
            type="button"
            role="tab"
            :aria-selected="i === index"
            :class="{ 'is-active': i === index }"
            @click="go(i)"
          >
            {{ f.name }}
          </button>
        </li>
      </ul>
    </header>

    <div class="flavors__stage" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
      <div class="flavors__glow" aria-hidden="true"></div>
      <img class="flavors__eagle" src="/images/eagle-tint.png" alt="" aria-hidden="true" />

      <Transition :name="dir > 0 ? 'slide-next' : 'slide-prev'" mode="out-in">
        <div :key="flavor.id" class="flavors__slide">
          <h2 class="display flavors__name">{{ flavor.name }}</h2>
          <div class="flavors__bottles">
            <img class="b b--750" :src="flavor.bottle" :alt="`${flavor.name} 750 ml`" width="215" height="900" />
            <img class="b b--375" :src="flavor.ticket" :alt="`${flavor.name} 375 ml`" width="348" height="720" />
            <img class="b b--160" :src="flavor.mini" :alt="`${flavor.name} 160 ml`" width="153" height="560" />
          </div>
        </div>
      </Transition>

      <button class="flavors__arrow flavors__arrow--prev" type="button" aria-label="Sabor anterior" @click="go(index - 1)">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.4" /></svg>
      </button>
      <button class="flavors__arrow flavors__arrow--next" type="button" aria-label="Sabor siguiente" @click="go(index + 1)">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.4" /></svg>
      </button>
    </div>

    <Transition name="fade" mode="out-in">
      <div :key="flavor.id" class="flavors__info">
        <p class="flavors__es">{{ flavor.es }}</p>
        <p class="flavors__note">{{ flavor.note }}</p>
        <p class="flavors__sizes">750 ml · 375 ml · 160 ml · 7% alc. vol.</p>
        <button class="btn" type="button" @click="emit('play', flavor.film, `${flavor.name} — el film`)">
          <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          Ver el film
        </button>
      </div>
    </Transition>

    <div class="flavors__dots" aria-hidden="true">
      <span v-for="(f, i) in FLAVORS" :key="f.id" :class="{ 'is-active': i === index }"></span>
    </div>
  </section>
</template>

<style scoped>
.flavors {
  position: relative;
  padding: clamp(88px, 12vh, 140px) var(--gutter) clamp(80px, 10vh, 120px);
  text-align: center;
  overflow: hidden;
}

.flavors__head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.flavors__tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 32px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.flavors__tabs button {
  position: relative;
  border: 0;
  background: none;
  padding: 6px 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.05rem;
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

.flavors__stage {
  position: relative;
  margin-top: 40px;
  min-height: clamp(420px, 62vh, 640px);
  display: grid;
  place-items: center;
}

.flavors__glow {
  position: absolute;
  inset: 10% 20%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--accent) 38%, transparent), transparent);
  filter: blur(40px);
  transition: background 0.8s var(--ease-out);
}

.flavors__eagle {
  position: absolute;
  right: -6%;
  top: 50%;
  width: min(48vw, 640px);
  transform: translateY(-50%);
  opacity: 0.35;
  pointer-events: none;
}

.flavors__slide {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
}

.flavors__name {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-size: clamp(2.6rem, 6.4vw, 6.6rem);
  white-space: nowrap;
  color: var(--cream);
  z-index: 0;
}

.flavors__bottles {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: clamp(8px, 2vw, 28px);
  padding-top: clamp(56px, 7vw, 110px);
}

.b {
  height: auto;
  filter: drop-shadow(0 30px 40px rgba(0, 0, 0, 0.45));
}

.b--750 {
  width: clamp(96px, 11vw, 170px);
}

.b--375 {
  width: clamp(120px, 15vw, 230px);
}

.b--160 {
  width: clamp(54px, 6.4vw, 98px);
}

.flavors__arrow {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid var(--cream-faint);
  background: rgba(36, 4, 3, 0.4);
  transform: translateY(-50%);
  transition:
    border-color 0.3s,
    background-color 0.3s;
}

.flavors__arrow:hover {
  border-color: var(--cream);
  background: rgba(36, 4, 3, 0.7);
}

.flavors__arrow--prev {
  left: 0;
}

.flavors__arrow--next {
  right: 0;
}

.flavors__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 520px;
  margin: 36px auto 0;
}

.flavors__es {
  margin: 0;
  font-family: var(--font-narrow);
  font-size: 0.95rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.flavors__note {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 1.15rem;
  color: var(--cream-dim);
}

.flavors__sizes {
  margin: 0 0 18px;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--cream-dim);
}

.flavors__dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 36px;
}

.flavors__dots span {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--cream-faint);
  transition:
    width 0.5s var(--ease-out),
    background-color 0.5s;
}

.flavors__dots span.is-active {
  width: 28px;
  background: var(--cream);
}

/* Transiciones de slide */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition:
    opacity 0.5s var(--ease-out),
    transform 0.6s var(--ease-out);
}

.slide-next-enter-from,
.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(60px);
}

.slide-next-leave-to,
.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s var(--ease-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 700px) {
  .flavors__arrow {
    top: auto;
    bottom: -8px;
    transform: none;
    width: 46px;
    height: 46px;
  }

  .flavors__tabs {
    gap: 6px 18px;
  }

  .flavors__tabs button {
    font-size: 0.95rem;
  }

  .flavors__name {
    white-space: normal;
    font-size: clamp(2.4rem, 12vw, 3.4rem);
  }

  .flavors__bottles {
    padding-top: 120px;
  }
}
</style>
