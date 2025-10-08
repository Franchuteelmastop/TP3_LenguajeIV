import React, { useState } from 'react'
import emailjs from 'emailjs-com'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'El nombre es obligatorio.'
    if (!form.email.trim()) errs.email = 'El correo es obligatorio.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'El correo no es válido.'
    if (!form.message.trim()) errs.message = 'El mensaje es obligatorio.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')

    const SERVICE_ID = 'service_jth9kap'
    const TEMPLATE_ID = 'template_x23co2p'
    const USER_ID = 'ubqV6yDIaSURLN3FS'

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(() => {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      })
      .catch(() => {
        setStatus('error')
      })
  }

  return (
    <main className="container">
      <h1>Contacto</h1>
      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        <div className="form-group">
          <label>Nombre</label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label>Dirección de Correo</label>
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label>Mensaje</label>
          <textarea name="message" value={form.message} onChange={handleChange} />
          {errors.message && <div className="error">{errors.message}</div>}
        </div>

        <button type="submit" disabled={status === 'sending'}>Enviar</button>
      </form>

      {status === 'success' && <div className="confirm">Correo enviado correctamente.</div>}
      {status === 'error' && <div className="error">Ocurrió un error al enviar el correo.</div>}
    </main>
  )
}
