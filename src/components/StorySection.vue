<template>
  <section id="historia" class="story" aria-labelledby="story-title">
    <div class="story__bg" aria-hidden="true">
      <img v-reveal="'zoom'" src="/images/manabi.jpg" alt="" width="2560" height="1429" loading="lazy" />
    </div>
    <div class="story__shade" aria-hidden="true"></div>

    <!-- Sobrio: solo el logo, Quintessential (como "Ecuadorian…") y Montserrat -->
    <div class="story__content">
      <h2 id="story-title" v-reveal class="story__title">
        <img src="/images/wordmark.png" alt="Maison Dorée" width="320" height="93" />
        <span>Ecuadorian &amp; French cream liqueur</span>
      </h2>

      <p v-reveal:150 class="story__body">
        En el año 2025, durante unas vacaciones en la costa ecuatoriana, compartí mi receta familiar de rompope
        manabita con unos amigos franceses, quienes insistieron en que más personas debían probarla. Inspirado por su
        motivación, decidí fundar la marca de licores crema de mayor calidad en el mercado ecuatoriano.
      </p>
      <p v-reveal:250 class="story__body">Así nació Maison Dorée, compartiendo una tradición familiar</p>

      <p v-reveal:350 class="story__since">desde 1862</p>
      <p v-reveal:450 class="story__sign">Douglas Pazmiño, fundador</p>
    </div>
  </section>
</template>

<style scoped>
.story {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--wine-950);
  /* Curvas como el video del inicio: una al entrar y otra al salir */
  border-top-right-radius: clamp(56px, 9vw, 160px);
  border-bottom-left-radius: clamp(56px, 9vw, 160px);
  isolation: isolate;
}

.story__bg {
  position: absolute;
  inset: 0;
}

.story__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 60% 40%;
}

.story__shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(28, 3, 2, 0.9) 0%, rgba(28, 3, 2, 0.7) 38%, rgba(28, 3, 2, 0.1) 70%, transparent 100%),
    linear-gradient(0deg, rgba(42, 6, 4, 0.7) 0%, transparent 30%),
    linear-gradient(180deg, rgba(42, 6, 4, 0.55) 0%, transparent 22%);
}

.story__content {
  position: relative;
  z-index: 1;
  width: min(560px, 100%);
  padding: clamp(96px, 14vh, 160px) var(--gutter);
}

.story__title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin: 0 0 36px;
  font-weight: 400;
}

.story__title img {
  width: clamp(150px, 15vw, 220px);
  height: auto;
}

.story__title span {
  font-family: var(--font-ecuadorian);
  font-weight: 400;
}

.story__title span {
  font-size: clamp(1.05rem, 1.5vw, 1.3rem);
  color: var(--cream-dim);
}

.story__body {
  margin: 0 0 16px;
  font-size: 1rem;
  line-height: 1.85;
  color: var(--cream-dim);
}

.story__since {
  margin: 18px 0 0;
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.1;
  color: var(--cream);
}

.story__sign {
  margin: 28px 0 0;
  padding-top: 20px;
  border-top: 1px solid var(--cream-faint);
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--cream-dim);
}

@media (max-width: 760px) {
  .story {
    align-items: flex-end;
  }

  .story__bg {
    height: 55%;
  }

  .story__bg img {
    object-position: 50% 30%;
  }

  .story__shade {
    background: linear-gradient(180deg, rgba(28, 3, 2, 0.35) 0%, rgba(28, 3, 2, 0.2) 25%, var(--wine-950) 55%);
  }

  .story__content {
    padding-top: 42vh;
  }
}
</style>
