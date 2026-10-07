import type { Directive } from 'vue'

const observer =
  typeof IntersectionObserver === 'undefined'
    ? null
    : new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
      )

// v-reveal, v-reveal="'fade'", v-reveal:200 (retraso en ms)
export const vReveal: Directive<HTMLElement, string | undefined> = {
  mounted(el, binding) {
    el.dataset.reveal = binding.value ?? ''
    if (binding.arg) el.style.setProperty('--reveal-delay', `${binding.arg}ms`)
    if (observer) observer.observe(el)
    else el.classList.add('is-visible')
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
