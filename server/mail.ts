import nodemailer from 'nodemailer'

export interface ContactMessageInput {
  name: string
  business: string
  phone: string
  email: string
  projectType: string
  description: string
  budget: string
  preferredContact: string
}

export interface MailConfig {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
  to: string
  from: string
}

export function isMailConfigured(config: MailConfig) {
  return Boolean(config.user && config.pass && config.to)
}

export async function sendContactMessage(config: MailConfig, input: ContactMessageInput) {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  })

  const subject = `New project brief from ${input.name}`
  const lines = [
    'New contact form submission from asdigitalsolution.online',
    '',
    `Name: ${input.name}`,
    `Business: ${input.business || '—'}`,
    `Phone: ${input.phone}`,
    `Email: ${input.email}`,
    `Project type: ${input.projectType}`,
    `Preferred contact: ${input.preferredContact}`,
    `Budget: ${input.budget || '—'}`,
    '',
    'Project description:',
    input.description,
  ]

  await transporter.sendMail({
    from: `"AS Digital Solutions Website" <${config.from}>`,
    to: config.to,
    replyTo: `"${input.name}" <${input.email}>`,
    subject,
    text: lines.join('\n'),
  })
}
