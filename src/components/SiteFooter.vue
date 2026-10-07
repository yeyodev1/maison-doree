<script setup lang="ts">
import { SOCIALS } from '../data'

// gris | blanco: dos propuestas de color para el bloque final (condiciones + footer)
defineProps<{ variant: 'gris' | 'blanco' }>()

const TERMS = [
  {
    title: 'Mayoría de edad',
    body: 'Este sitio y nuestros productos están dirigidos exclusivamente a personas mayores de 18 años. Al ingresar confirmas que tienes la edad legal para consumir bebidas alcohólicas en Ecuador.',
  },
  {
    title: 'Consumo responsable',
    body: 'Disfruta Maison Dorée con moderación. No conduzcas después de beber. Prohibida la venta a menores de 18 años. El consumo excesivo de alcohol es perjudicial para la salud.',
  },
  {
    title: 'Uso del sitio',
    body: 'Los contenidos de este sitio tienen fines informativos. Los precios, presentaciones y disponibilidad pueden cambiar sin previo aviso y se confirman al momento de cada pedido.',
  },
  {
    title: 'Privacidad',
    body: 'Los datos que nos compartes en el formulario de contacto se usan únicamente para responder tu solicitud. No los vendemos ni los compartimos con terceros.',
  },
  {
    title: 'Propiedad intelectual',
    body: 'La marca Maison Dorée, sus etiquetas, el águila, las fotografías y los videos son propiedad de sus titulares. Queda prohibida su reproducción sin autorización escrita.',
  },
  {
    title: 'Contacto legal',
    body: 'Para cualquier consulta sobre estas condiciones escríbenos por WhatsApp o a través del formulario de distribuidores.',
  },
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="foot" :class="`foot--${variant}`">
    <section class="terms" aria-labelledby="terms-title">
      <div class="terms__intro">
        <p v-reveal class="foot__eyebrow">Maison Dorée</p>
        <h2 id="terms-title" v-reveal:100 class="display terms__title"><span>Condiciones</span> <span>de uso</span></h2>
        <p v-reveal:200 class="terms__lead">Lo que necesitas saber antes de servir la primera copa.</p>
      </div>

      <ol class="terms__list">
        <li v-for="(t, i) in TERMS" :key="t.title" v-reveal:[i*80]>
          <span class="terms__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ t.title }}</h3>
          <p>{{ t.body }}</p>
        </li>
      </ol>
    </section>

    <div class="foot__rule" aria-hidden="true"></div>

    <div class="foot__bar">
      <img class="foot__logo" src="/images/wordmark.png" alt="Maison Dorée" width="160" height="47" />

      <nav class="foot__social" aria-label="Redes sociales">
        <a v-for="s in SOCIALS" :key="s.name" :href="s.href" target="_blank" rel="noopener" :aria-label="s.name">
          <svg v-if="s.name === 'Facebook'" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6z" fill="currentColor" /></svg>
          <svg v-else-if="s.name === 'Instagram'" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.6" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6" /><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" /></svg>
          <svg v-else-if="s.name === 'TikTok'" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 3c.4 2.3 1.8 3.8 4 4v3.2c-1.5 0-2.9-.4-4-1.2v6.3A6.2 6.2 0 1 1 10.2 9v3.3a2.9 2.9 0 1 0 2.9 2.9V3h3.4z" fill="currentColor" /></svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm0 1.6a7.4 7.4 0 1 1-3.8 13.8l-.3-.2-2.7.7.7-2.6-.2-.3A7.4 7.4 0 0 1 12 4.6zm-3 3.6c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.2 5 4.3 2.4.9 2.9.7 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4l-.5-.3-1.8-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.3-.8-.7-1.3-1.5-1.4-1.8-.2-.3 0-.4.1-.5l.4-.5.3-.5v-.5l-.8-2c-.2-.5-.4-.5-.6-.5h-.5z" fill="currentColor" /></svg>
        </a>
      </nav>

      <div class="foot__meta">
        <p>© {{ year }} Maison Dorée · Ecuadorian &amp; French cream liqueur</p>
        <p>Bebe con moderación. Prohibida su venta a menores de 18 años.</p>
        <p>
          Diseño y desarrollo:
          <a href="https://bakano.ec" target="_blank" rel="noopener">Bakano</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  --f-bg: #ecebe8;
  --f-ink: #3a0805;
  --f-muted: rgba(58, 8, 5, 0.66);
  --f-line: rgba(58, 8, 5, 0.16);
  --f-logo: brightness(0) saturate(100%) invert(9%) sepia(48%) saturate(3700%) hue-rotate(352deg) brightness(88%) contrast(103%);
  background: var(--f-bg);
  color: var(--f-ink);
}

.foot--blanco {
  --f-bg: #fbf8f3;
}

.foot--gris {
  --f-bg: #d9d6d2;
  --f-muted: rgba(58, 8, 5, 0.7);
  --f-line: rgba(58, 8, 5, 0.2);
}

.terms {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 2fr);
  gap: clamp(40px, 6vw, 120px);
  min-height: 88svh;
  align-content: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(88px, 12vh, 140px) var(--gutter);
}

.foot__eyebrow {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--f-muted);
}

.terms__title {
  margin-top: 18px;
  /* "Condiciones" siempre en una sola línea */
  font-size: clamp(1.9rem, 2.7vw, 2.9rem);
  overflow-wrap: normal;
  hyphens: none;
}

.terms__title span {
  white-space: nowrap;
}

.terms__lead {
  margin: 22px 0 0;
  max-width: 320px;
  font-family: var(--font-sans);
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  line-height: 1.9;
  font-size: 0.78rem;
  color: var(--f-muted);
}

.terms__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 48px clamp(24px, 3vw, 48px);
  margin: 0;
  padding: 0;
  list-style: none;
}

.terms__list li {
  padding-top: 20px;
  border-top: 1px solid var(--f-line);
}

.terms__num {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  color: var(--f-muted);
}

.terms__list h3 {
  margin: 10px 0 12px;
  font-family: var(--font-sans);
  font-size: 1.25rem;
  font-weight: 700;
}

.terms__list p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--f-muted);
}

.foot__rule {
  width: min(1400px, calc(100% - 2 * var(--gutter)));
  height: 1px;
  margin: 0 auto;
  background: var(--f-line);
}

.foot__bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px var(--gutter) 56px;
}

.foot__logo {
  width: 150px;
  height: auto;
  filter: var(--f-logo);
}

.foot__social {
  display: flex;
  gap: 10px;
}

.foot__social a {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid var(--f-line);
  transition:
    background-color 0.3s,
    color 0.3s;
}

.foot__social a:hover {
  background: var(--f-ink);
  color: var(--f-bg);
}

.foot__social svg {
  width: 20px;
  height: 20px;
}

.foot__meta {
  justify-self: end;
  text-align: right;
  font-size: 0.75rem;
  line-height: 1.8;
  color: var(--f-muted);
}

.foot__meta p {
  margin: 0;
}

.foot__meta a {
  color: var(--f-ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 1000px) {
  .terms {
    grid-template-columns: 1fr;
  }

  .terms__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .terms__list {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .foot__bar {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }

  .foot__meta {
    justify-self: center;
    text-align: center;
  }
}
</style>
