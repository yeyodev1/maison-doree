<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const menuOpen = ref(false)
const closeBtn = ref<HTMLButtonElement>()

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') menuOpen.value = false
}

watch(menuOpen, async (open) => {
  document.body.classList.toggle('is-locked', open)
  if (open) {
    window.addEventListener('keydown', onKey)
    await nextTick()
    closeBtn.value?.focus()
  } else {
    window.removeEventListener('keydown', onKey)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.classList.remove('is-locked')
})

const left = [
  { label: 'Producto', href: '#sabores' },
  { label: 'Historia', href: '#historia' },
]
const right = [
  { label: 'Dónde encontrarnos', href: '#donde' },
  { label: 'Contáctanos', href: '#contacto' },
]
</script>

<template>
  <!-- Absoluto, no fijo: se queda arriba en el hero y no acompaña el scroll -->
  <header class="header">
    <nav class="header__nav header__nav--left" aria-label="Principal">
      <a v-for="l in left" :key="l.href" :href="l.href">{{ l.label }}</a>
    </nav>

    <a class="header__brand" href="#top" aria-label="Maison Dorée, inicio">
      <img src="/images/wordmark.png" alt="Maison Dorée" width="180" height="53" />
      <span>Ecuadorian &amp; French cream liqueur</span>
    </a>

    <nav class="header__nav header__nav--right" aria-label="Secundaria">
      <a v-for="l in right" :key="l.href" :href="l.href">{{ l.label }}</a>
    </nav>

    <button
      class="header__toggle"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="mobile-menu"
      @click="menuOpen = !menuOpen"
    >
      <span class="sr-only">Abrir menú</span>
      <span class="header__bars" aria-hidden="true"></span>
    </button>
  </header>

  <Transition name="menu">
    <div v-if="menuOpen" id="mobile-menu" class="menu" role="dialog" aria-modal="true" aria-label="Menú">
      <button ref="closeBtn" class="menu__close" type="button" aria-label="Cerrar menú" @click="menuOpen = false">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.4" />
        </svg>
      </button>
      <a v-for="l in [...left, ...right]" :key="l.href" :href="l.href" @click="menuOpen = false">
        {{ l.label }}
      </a>
    </div>
  </Transition>
</template>

<style scoped>
.header {
  position: absolute;
  inset: 0 0 auto 0;
  z-index: 20;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  padding: 28px var(--gutter);
}

.header__nav {
  display: flex;
  gap: clamp(20px, 3vw, 40px);
}

.header__nav--right {
  justify-content: flex-end;
}

.header__nav a {
  position: relative;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  padding: 6px 0;
}

.header__nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.45s var(--ease-out);
}

.header__nav a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.header__brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.header__brand img {
  width: clamp(120px, 12vw, 180px);
  height: auto;
}

.header__brand span {
  font-family: var(--font-ecuadorian);
  font-size: 0.85rem;
  white-space: nowrap;
}

.header__toggle {
  display: none;
  justify-self: end;
  width: 44px;
  height: 44px;
  border: 0;
  background: none;
  position: relative;
  z-index: 31;
}

.header__bars,
.header__bars::before {
  position: absolute;
  left: 10px;
  right: 10px;
  height: 1px;
  background: var(--cream);
  transition: transform 0.4s var(--ease-out);
}

.header__bars {
  top: 18px;
}

.header__bars::before {
  content: '';
  left: 0;
  right: 0;
  top: 8px;
}

.menu {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  background: var(--wine-900);
}

.menu__close {
  position: absolute;
  top: 20px;
  right: 20px;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--cream-faint);
  background: none;
}

.menu a {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 6.4vw, 1.8rem);
  padding: 0 20px;
  text-align: center;
  text-transform: uppercase;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.4s var(--ease-out);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

@media (max-width: 900px) {
  .header {
    grid-template-columns: 44px 1fr 44px;
    padding: 20px;
  }

  .header__nav {
    display: none;
  }

  .header__brand {
    grid-column: 2;
  }

  .header__brand span {
    font-size: 0.72rem;
  }

  .header__toggle {
    display: block;
    grid-column: 3;
  }
}
</style>
