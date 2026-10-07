<script setup lang="ts">
import { onMounted, ref } from 'vue'

const KEY = 'md-age-ok'
const open = ref(false)
const denied = ref(false)

onMounted(() => {
  let ok = false
  try {
    ok = localStorage.getItem(KEY) === '1'
  } catch {}
  open.value = !ok
  document.body.classList.toggle('is-locked', open.value)
})

function accept() {
  try {
    localStorage.setItem(KEY, '1')
  } catch {}
  open.value = false
  document.body.classList.remove('is-locked')
}
</script>

<template>
  <Transition name="gate">
    <div v-if="open" class="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div class="gate__inner">
        <img class="gate__logo" src="/images/logo.png" alt="" width="148" height="186" />
        <h2 id="gate-title" class="display gate__title">Bienvenido a Maison Dorée</h2>
        <p v-if="!denied" class="gate__copy">
          Debes ser mayor de 18 años para ingresar a nuestro sitio y conocer nuestro licor crema artesanal.
        </p>
        <p v-else class="gate__copy">Vuelve cuando seas mayor de edad. Te estaremos esperando.</p>
        <div v-if="!denied" class="gate__actions">
          <button class="btn" type="button" @click="accept">Sí, soy mayor de 18 años</button>
          <button class="gate__no" type="button" @click="denied = true">No, soy menor de edad</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.gate {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(ellipse at 50% 30%, rgba(122, 32, 24, 0.55), transparent 60%),
    var(--wine-900);
}

.gate__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 560px;
  text-align: center;
}

.gate__logo {
  width: 96px;
  height: auto;
}

.gate__title {
  font-size: clamp(2rem, 5vw, 3.2rem);
}

.gate__copy {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 1.15rem;
  color: var(--cream-dim);
}

.gate__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  margin-top: 8px;
}

.gate__no {
  border: 0;
  background: none;
  font-size: 0.75rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--cream-dim);
  text-decoration: underline;
  text-underline-offset: 6px;
}

.gate-leave-active {
  transition: opacity 0.8s var(--ease-out);
}

.gate-leave-to {
  opacity: 0;
}
</style>
