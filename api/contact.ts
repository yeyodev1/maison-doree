/// <reference types="node" />
// Vercel Function: envía el formulario de distribuidores por Resend.
// Variables: RESEND_API_KEY, CONTACT_TO (destinatario), CONTACT_FROM (remitente verificado).

interface Body {
  nombre?: string
  empresa?: string
  ciudad?: string
  telefono?: string
  correo?: string
  website?: string
}

const esc = (s = '') => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`).slice(0, 500)

export async function POST(request: Request): Promise<Response> {
  let body: Body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }

  // Honeypot: si un bot lo llena, respondemos ok sin enviar
  if (body.website) return Response.json({ ok: true })

  const { nombre, ciudad, telefono, correo } = body
  if (!nombre || !ciudad || !telefono || !correo || !/^\S+@\S+\.\S+$/.test(correo)) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 422 })
  }

  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO
  if (!key || !to) return Response.json({ ok: false, error: 'not-configured' }, { status: 500 })

  const rows = [
    ['Nombre', nombre],
    ['Empresa', body.empresa || '—'],
    ['Ciudad', ciudad],
    ['Teléfono', telefono],
    ['Correo', correo],
  ]
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#7a2018">${k}</td><td>${esc(v)}</td></tr>`)
    .join('')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'Maison Dorée <web@maisondoree.ec>',
      to: to.split(',').map((s) => s.trim()),
      reply_to: correo,
      subject: `Nuevo distribuidor: ${nombre} (${ciudad})`,
      html: `<h2 style="font-family:Georgia,serif;color:#3a0805">Nuevo contacto desde maisondoree.ec</h2><table style="font-family:Arial,sans-serif;font-size:14px">${rows}</table>`,
    }),
  })

  return Response.json({ ok: res.ok }, { status: res.ok ? 200 : 502 })
}
