<template>
  <!-- En pausa hasta enero: ahí se agregan los logos de restaurantes y reposterías aliados -->
  <section id="donde" class="where" aria-labelledby="where-title">
    <h2 id="where-title" v-reveal class="display where__title">Dónde encontrarnos</h2>
    <p v-reveal:120 class="eyebrow">Próximamente</p>
    <p v-reveal:220 class="where__copy">
      Puntos de venta ya disponibles a nivel nacional, en breve todos los detalles.
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
  font-size: clamp(2.2rem, 7vw, 6rem);
}

.where__copy {
  max-width: 520px;
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--cream-dim);
}
</style>
