<template>
  <section id="historia" class="story" aria-labelledby="story-title">
    <div class="story__bg" aria-hidden="true">
      <img v-reveal="'zoom'" src="/images/manabi.jpg" alt="" width="2560" height="1429" loading="lazy" />
    </div>
    <div class="story__shade" aria-hidden="true"></div>

    <div class="story__content">
      <p v-reveal class="eyebrow">Nuestra historia</p>
      <h2 id="story-title" v-reveal:120 class="story__title">
        <span class="display">Maison Dorée</span>
        <em>Ecuadorian &amp; French cream liqueur</em>
      </h2>

      <p v-reveal:240 class="story__lead">
        En el año 2025, durante unas vacaciones en la costa ecuatoriana, compartí mi receta familiar de rompope
        manabita con unos amigos franceses, quienes insistieron en que más personas debían probarla.
      </p>
      <p v-reveal:320 class="story__body">
        Inspirado por su motivación, decidí fundar la marca de licores crema de mayor calidad en el mercado
        ecuatoriano. Así nació Maison Dorée, uniendo una tradición familiar
      </p>

      <p v-reveal:420 class="story__since">desde 1862</p>
      <p v-reveal:520 class="story__sign">Douglas Pazmiño <span>Fundador</span></p>
    </div>

    <p class="story__caption">Arco de entrada a Manabí · Tierra bella cual ninguna</p>
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
    linear-gradient(90deg, rgba(28, 3, 2, 0.92) 0%, rgba(28, 3, 2, 0.72) 38%, rgba(28, 3, 2, 0.1) 70%, transparent 100%),
    linear-gradient(0deg, rgba(42, 6, 4, 0.75) 0%, transparent 30%),
    linear-gradient(180deg, rgba(42, 6, 4, 0.6) 0%, transparent 22%);
}

.story__content {
  position: relative;
  z-index: 1;
  width: min(620px, 100%);
  padding: clamp(96px, 14vh, 160px) var(--gutter);
}

.story__title {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 18px 0 34px;
  font-weight: 400;
}

.story__title .display {
  font-size: clamp(2.8rem, 6vw, 5.4rem);
}

.story__title em {
  font-family: var(--font-serif);
  font-size: clamp(1.05rem, 1.6vw, 1.35rem);
  color: var(--cream-dim);
}

.story__lead {
  margin: 0 0 18px;
  font-family: var(--font-serif);
  font-size: clamp(1.2rem, 1.7vw, 1.45rem);
  line-height: 1.5;
}

.story__body {
  margin: 0;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--cream-dim);
}

.story__since {
  margin: 14px 0 0;
  font-family: var(--font-script);
  font-size: clamp(3.4rem, 6vw, 5rem);
  line-height: 1;
}

.story__sign {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 28px 0 0;
  padding-top: 22px;
  border-top: 1px solid var(--cream-faint);
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.1rem;
}

.story__sign span {
  font-family: var(--font-sans);
  font-style: normal;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--cream-dim);
}

.story__caption {
  position: absolute;
  right: var(--gutter);
  bottom: 28px;
  z-index: 1;
  margin: 0;
  font-size: 0.68rem;
  letter-spacing: 0.24em;
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

  .story__caption {
    display: none;
  }
}
</style>
