import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useSiteData } from '../../context/SiteDataContext'
import { submitContactMessage } from '../../lib/siteApi'
import CTAButton from '../ui/CTAButton'
import EditableText from '../ui/EditableText'
import Reveal from '../ui/Reveal'
import { SectionToneContext } from '../../context/SectionToneContext'
import contactHumanAi from '../../assets/brand/contact-human-ai.webp'

interface ContactFormData {
  name: string
  business: string
  phone: string
  email: string
  projectType: string
  description: string
  budget: string
  preferredContact: string
}

const initialState: ContactFormData = {
  name: '',
  business: '',
  phone: '',
  email: '',
  projectType: 'Web Development',
  description: '',
  budget: '',
  preferredContact: 'Email',
}

function FieldLabel({ contentKey, children }: { contentKey: string; children: string }) {
  return (
    <EditableText
      contentKey={contentKey}
      as="label"
      className="text-section mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase"
    >
      {children}
    </EditableText>
  )
}

function fieldClassName() {
  return 'w-full rounded-xl border border-[rgba(10,14,26,0.12)] bg-white px-3.5 py-2.5 text-sm text-text outline-none transition placeholder:text-secondary focus:border-accent/55 focus:ring-2 focus:ring-accent/15'
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(initialState)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { contact } = useSiteData()

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    if (status !== 'idle') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setStatus('idle')
    setErrorMessage('')
    try {
      await submitContactMessage(formData)
      setFormData(initialState)
      setStatus('sent')
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error && error.message === 'rate-limited'
          ? 'Too many messages. Please wait a few minutes and try again.'
          : 'Could not send your message. Please email us directly or try again.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <section id="contact" className="section-light relative overflow-hidden">
      <SectionToneContext.Provider value="light">
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:py-14">
          <div className="grid gap-0 overflow-hidden lg:grid-cols-2 lg:rounded-3xl">
            <Reveal className="relative min-h-[28rem] overflow-hidden lg:min-h-[36rem]">
              <img
                src={contactHumanAi}
                alt="Human and AI collaboration"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#04101f] via-[#04101f]/75 to-[#04101f]/20"
                aria-hidden="true"
              />

              <div className="relative z-10 flex h-full flex-col justify-end p-7 sm:p-9 lg:p-10">
                <EditableText
                  contentKey="contact.eyebrow"
                  as="p"
                  className="text-[11px] font-semibold tracking-[0.24em] text-sky-300 uppercase"
                >
                  Contact
                </EditableText>
                <EditableText
                  contentKey="contact.title"
                  as="h2"
                  className="mt-3 max-w-md text-2xl leading-tight font-extrabold tracking-tight text-white sm:text-[1.85rem]"
                >
                  Let&apos;s Build Something
                </EditableText>
                <div className="mt-3 h-1 w-14 bg-sky-300" />
                <EditableText
                  contentKey="contact.subtitle"
                  as="p"
                  className="mt-4 max-w-sm text-sm leading-relaxed text-white/75"
                >
                  Share the idea, the bottleneck, or the workflow you want improved. We&apos;ll reply
                  with a clear next step.
                </EditableText>

                <div className="mt-7 space-y-3 text-sm text-white/90">
                  <p>
                    <span className="font-semibold text-sky-300">Email</span>
                    <span className="mx-2 text-sky-300/40">·</span>
                    {contact.email}
                  </p>
                  <p>
                    <span className="font-semibold text-sky-300">Phone</span>
                    <span className="mx-2 text-sky-300/40">·</span>
                    {contact.phone}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  <CTAButton
                    label="Email us"
                    href={`mailto:${contact.email}`}
                    variant="email"
                    external
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={80} className="bg-white p-7 sm:p-9 lg:p-10">
              <form
                onSubmit={(event) => {
                  void handleSubmit(event)
                }}
              >
                <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
                  Project brief
                </p>
                <p className="text-section mt-1 text-lg font-bold">Tell us what you need</p>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel contentKey="contact.form.name">Name</FieldLabel>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={busy}
                      className={fieldClassName()}
                    />
                  </div>
                  <div>
                    <FieldLabel contentKey="contact.form.business">Business</FieldLabel>
                    <input
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      disabled={busy}
                      className={fieldClassName()}
                    />
                  </div>
                  <div>
                    <FieldLabel contentKey="contact.form.phone">Phone</FieldLabel>
                    <input
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={busy}
                      className={fieldClassName()}
                    />
                  </div>
                  <div>
                    <FieldLabel contentKey="contact.form.email">Email</FieldLabel>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={busy}
                      className={fieldClassName()}
                    />
                  </div>
                  <div>
                    <FieldLabel contentKey="contact.form.projectType">Project Type</FieldLabel>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      disabled={busy}
                      className={fieldClassName()}
                    >
                      <option>Web Development</option>
                      <option>Business Software</option>
                      <option>AI / ML Solution</option>
                      <option>Custom Software</option>
                      <option>Offline & Online Solution</option>
                      <option>Consultancy</option>
                    </select>
                  </div>
                  <div>
                    <FieldLabel contentKey="contact.form.preferredContact">
                      Preferred Contact
                    </FieldLabel>
                    <select
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleChange}
                      disabled={busy}
                      className={fieldClassName()}
                    >
                      <option>Phone</option>
                      <option>Email</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel contentKey="contact.form.description">
                      Project Description
                    </FieldLabel>
                    <textarea
                      required
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      disabled={busy}
                      rows={3}
                      className={fieldClassName()}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel contentKey="contact.form.budget">Optional Budget</FieldLabel>
                    <input
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      disabled={busy}
                      className={fieldClassName()}
                    />
                  </div>
                </div>

                {status === 'sent' ? (
                  <p className="mt-4 text-sm font-medium text-emerald-600">
                    Message sent. We&apos;ll get back to you soon.
                  </p>
                ) : null}
                {status === 'error' ? (
                  <p className="mt-4 text-sm font-medium text-red-600">{errorMessage}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={busy}
                  className="btn-shine mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
                  data-interactive="true"
                >
                  <EditableText contentKey="contact.form.submit">
                    {busy ? 'Sending…' : 'Send Project Brief'}
                  </EditableText>
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </SectionToneContext.Provider>
    </section>
  )
}
