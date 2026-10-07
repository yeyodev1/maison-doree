<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({ nombre: '', empresa: '', ciudad: '', telefono: '', correo: '', website: '' })
const status = ref<'idle' | 'sending' | 'ok' | 'error'>('idle')

// Llega a Douglas por FormSubmit (el mismo servicio que usaba el sitio anterior)
const ENDPOINT = 'https://formsubmit.co/ajax/maisondoreeliqueur@gmail.com'

async function submit() {
  // Honeypot: si un bot lo llena, no se envía nada
  if (form.website) {
    status.value = 'ok'
    return
  }
  status.value = 'sending'
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        Nombre: form.nombre,
        Empresa: form.empresa || '—',
        Ciudad: form.ciudad,
        Teléfono: form.telefono,
        Correo: form.correo,
        _replyto: form.correo,
        _subject: `Nuevo distribuidor: ${form.nombre} (${form.ciudad})`,
        _template: 'table',
        _captcha: 'false',
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || String(res.status))
    status.value = 'ok'
    Object.assign(form, { nombre: '', empresa: '', ciudad: '', telefono: '', correo: '' })
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="contacto" class="contact" aria-labelledby="contact-title">
    <header class="contact__head">
      <p v-reveal class="eyebrow">Distribuidores</p>
      <h2 id="contact-title" v-reveal:120 class="display contact__title">¿Quieres vender nuestros productos?</h2>
      <p v-reveal:220 class="contact__sub">Déjanos tus datos y nos pondremos en contacto contigo.</p>
    </header>

    <form v-reveal:300 class="contact__form" @submit.prevent="submit">
      <label class="field">
        <span>Nombre</span>
        <input v-model="form.nombre" name="nombre" autocomplete="name" placeholder="Tu nombre completo" required />
      </label>
      <label class="field">
        <span>Empresa</span>
        <input v-model="form.empresa" name="empresa" autocomplete="organization" placeholder="Nombre de tu empresa" />
      </label>
      <label class="field">
        <span>Ciudad</span>
        <input v-model="form.ciudad" name="ciudad" autocomplete="address-level2" placeholder="Guayaquil, Quito, Cuenca…" required />
      </label>
      <label class="field">
        <span>Teléfono</span>
        <input v-model="form.telefono" name="telefono" type="tel" autocomplete="tel" placeholder="+593 99 999 9999" required />
      </label>
      <label class="field field--full">
        <span>Correo electrónico</span>
        <input v-model="form.correo" name="correo" type="email" autocomplete="email" placeholder="tu@email.com" required />
      </label>
      <!-- Honeypot anti-spam -->
      <input v-model="form.website" class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" />

      <div class="contact__actions">
        <button class="btn" type="submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? 'Enviando…' : 'Enviar' }}
        </button>
        <p class="contact__status" role="status">
          <template v-if="status === 'ok'">Gracias. Te escribiremos muy pronto.</template>
          <template v-else-if="status === 'error'">No pudimos enviar tu mensaje. Escríbenos por WhatsApp.</template>
        </p>
      </div>
    </form>
  </section>
</template>

<style scoped>
.contact {
  padding: clamp(88px, 12vh, 140px) var(--gutter);
}

.contact__head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  max-width: 760px;
  margin: 0 auto 56px;
  text-align: center;
}

.contact__title {
  font-size: clamp(2.2rem, 5vw, 4rem);
}

.contact__sub {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 1.15rem;
  color: var(--cream-dim);
}

.contact__form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px 32px;
  max-width: 720px;
  margin: 0 auto;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field--full {
  grid-column: 1 / -1;
}

.field span {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--cream-dim);
}

.field input {
  width: 100%;
  padding: 12px 0;
  border: 0;
  border-bottom: 1px solid var(--cream-faint);
  background: transparent;
  color: var(--cream);
  font: 400 1.05rem var(--font-sans);
  transition: border-color 0.3s;
}

.field input::placeholder {
  color: rgba(244, 233, 216, 0.35);
}

.field input:focus {
  outline: none;
  border-color: var(--cream);
}

.hp {
  position: absolute;
  left: -9999px;
}

.contact__actions {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-top: 16px;
}

.contact__actions .btn {
  min-width: 240px;
}

.contact__status {
  min-height: 1.5em;
  margin: 0;
  font-family: var(--font-sans);
  color: var(--cream-dim);
}

@media (max-width: 640px) {
  .contact__form {
    grid-template-columns: 1fr;
  }
}
</style>
