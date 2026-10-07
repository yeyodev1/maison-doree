<template>
  <section id="donde" class="where" aria-labelledby="where-title">
    <p v-reveal class="eyebrow">Dónde encontrarnos</p>
    <h2 id="where-title" v-reveal:120 class="display where__title">Próximamente</h2>
    <p v-reveal:240 class="where__copy">
      Estamos preparando nuestros primeros puntos de venta en Ecuador. Mientras tanto, pide tu botella por WhatsApp.
    </p>
  </section>
</template>

<style scoped>
.where {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  padding: clamp(88px, 14vh, 160px) var(--gutter);
  text-align: center;
}

.where__title {
  font-size: clamp(2.2rem, 10vw, 8rem);
}

.where__copy {
  max-width: 520px;
  margin: 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--cream-dim);
}
</style>
