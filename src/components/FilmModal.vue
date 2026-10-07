<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{ src: string | null; title: string }>()
const emit = defineEmits<{ close: [] }>()

const closeBtn = ref<HTMLButtonElement>()

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.src,
  async (src) => {
    document.body.classList.toggle('is-locked', !!src)
    if (src) {
      window.addEventListener('keydown', onKey)
      await nextTick()
      closeBtn.value?.focus()
    } else {
      window.removeEventListener('keydown', onKey)
    }
  },
)

onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Transition name="film">
    <div v-if="src" class="film" role="dialog" aria-modal="true" :aria-label="title" @click.self="emit('close')">
      <button ref="closeBtn" class="film__close" type="button" aria-label="Cerrar video" @click="emit('close')">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.4" />
        </svg>
      </button>
      <video class="film__video" :src="src" controls autoplay playsinline></video>
      <p class="film__title">{{ title }}</p>
    </div>
  </Transition>
</template>

<style scoped>
.film {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 72px 20px 40px;
  background: rgba(20, 2, 1, 0.94);
  backdrop-filter: blur(8px);
}

.film__video {
  width: min(1280px, 100%);
  max-height: 78vh;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 4px;
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.6);
}

.film__title {
  margin: 0;
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--cream-dim);
}

.film__close {
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

.film-enter-active,
.film-leave-active {
  transition: opacity 0.45s var(--ease-out);
}

.film-enter-active .film__video {
  transition: transform 0.6s var(--ease-out);
}

.film-enter-from,
.film-leave-to {
  opacity: 0;
}

.film-enter-from .film__video {
  transform: scale(0.96);
}
</style>
