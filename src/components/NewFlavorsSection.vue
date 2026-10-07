<script setup lang="ts">
import { NEW_FLAVORS } from '../data'
</script>

<template>
  <section class="nouveau" aria-labelledby="nouveau-title">
    <header class="nouveau__head">
      <p v-reveal class="eyebrow">Nouvelles saveurs</p>
      <h2 id="nouveau-title" v-reveal:120 class="display nouveau__title">Próximamente</h2>
    </header>

    <div class="nouveau__grid">
      <article v-for="f in NEW_FLAVORS" :key="f.id" class="card">
        <div class="card__media">
          <img v-reveal="'zoom'" :src="f.image" :alt="`${f.name}, ${f.es}`" loading="lazy" width="1600" height="2400" />

          <!-- Sello sutil de nuevo sabor (fijo, sin girar) -->
          <span v-reveal:400 class="seal">Nuevo sabor</span>
        </div>

        <div v-reveal:150 class="card__body">
          <h3 class="display card__name">{{ f.name }}</h3>
          <p class="card__es">{{ f.es }}</p>
          <p class="card__note">{{ f.note }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.nouveau {
  padding: clamp(88px, 12vh, 140px) var(--gutter);
}

.nouveau__head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  margin-bottom: clamp(48px, 7vh, 80px);
  text-align: center;
}

.nouveau__title {
  font-size: clamp(2.2rem, 7vw, 6rem);
}

.nouveau__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(16px, 2.4vw, 36px);
  max-width: 1400px;
  margin: 0 auto;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Arco curvo, como la referencia */
.card__media {
  position: relative;
  overflow: hidden;
  width: min(100%, 460px);
  aspect-ratio: 2 / 3;
  border-radius: 999px 999px 0 0;
  background: #efe3cf;
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.6s var(--ease-out);
}

.card:hover .card__media img.is-visible {
  transform: scale(1.03);
}

.seal {
  position: absolute;
  top: 30%;
  right: clamp(12px, 2vw, 22px);
  padding: 7px 14px;
  border: 1px solid rgba(58, 8, 5, 0.35);
  border-radius: 999px;
  background: rgba(251, 246, 238, 0.75);
  backdrop-filter: blur(4px);
  color: var(--wine-700);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.card__body {
  padding-top: 26px;
  text-align: center;
}

.card__name {
  font-size: clamp(1.8rem, 3vw, 2.8rem);
}

.card__es {
  margin: 10px 0 6px;
  font-family: var(--font-sans);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.card__note {
  margin: 0;
  font-family: var(--font-sans);
  color: var(--cream-dim);
}

@media (max-width: 760px) {
  .nouveau__grid {
    grid-template-columns: 1fr;
    gap: 56px;
  }
}

</style>
