import { useState, type ChangeEvent, type FormEvent } from 'react'
import { getWhatsAppUrl, toWhatsAppDigits } from '../../config/site'
import { useSiteData } from '../../context/SiteDataContext'
import CTAButton from '../ui/CTAButton'
import EditableText from '../ui/EditableText'
import Reveal from '../ui/Reveal'
import { SectionToneContext } from '../../context/SectionToneContext'
import themeContact from '../../assets/brand/theme-contact.png'

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
  preferredContact: 'WhatsApp',
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
  const { contact } = useSiteData()

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Contact form submission', formData)
  }

  return (
    <section id="contact" className="section-light relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img
          src={themeContact}
          alt=""
          className="h-full w-full object-cover object-[center_top]"
          style={{ opacity: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white from-0% via-white/90 via-[40%] to-white/60 to-100%" />
      </div>

      <SectionToneContext.Provider value="light">
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:items-start">
            <Reveal>
              <div>
                <EditableText
                  contentKey="contact.eyebrow"
                  as="p"
                  className="text-[11px] font-semibold tracking-[0.24em] text-accent uppercase"
                >
                  Contact / Lead Gen
                </EditableText>
                <EditableText
                  contentKey="contact.title"
                  as="h2"
                  className="text-section mt-3 max-w-md text-2xl leading-tight font-extrabold tracking-tight sm:text-[1.85rem]"
                >
                  Have a project in mind? Let&apos;s build it.
                </EditableText>
                <div className="mt-3 h-1 w-14 bg-navy" />
                <EditableText
                  contentKey="contact.subtitle"
                  as="p"
                  className="text-section-muted mt-4 max-w-sm text-sm leading-relaxed"
                >
                  Share the idea, the bottleneck, or the workflow you want improved — we&apos;ll reply with a clear
                  next step.
                </EditableText>

                <div className="mt-7 space-y-3 text-sm">
                  <p className="text-section">
                    <span className="font-semibold text-accent">WhatsApp</span>
                    <span className="mx-2 text-accent/30">·</span>
                    {contact.whatsapp_number}
                  </p>
                  <p className="text-section">
                    <span className="font-semibold text-accent">Email</span>
                    <span className="mx-2 text-accent/30">·</span>
                    {contact.email}
                  </p>
                  <p className="text-section">
                    <span className="font-semibold text-accent">Phone</span>
                    <span className="mx-2 text-accent/30">·</span>
                    {contact.phone}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  <CTAButton
                    label="Chat on WhatsApp"
                    href={getWhatsAppUrl(undefined, toWhatsAppDigits(contact.whatsapp_number))}
                    variant="whatsapp"
                    external
                  />
                  <CTAButton label="Email us" href={`mailto:${contact.email}`} variant="email" external />
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <form onSubmit={handleSubmit}>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">Project brief</p>
                <p className="text-section mt-1 text-lg font-bold">Tell us what you need</p>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel contentKey="contact.form.name">Name</FieldLabel>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={fieldClassName()}
                    />
                  </div>
                  <div>
                    <FieldLabel contentKey="contact.form.business">Business</FieldLabel>
                    <input
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      className={fieldClassName()}
                    />
                  </div>
                  <div>
                    <FieldLabel contentKey="contact.form.phone">WhatsApp / Phone</FieldLabel>
                    <input
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
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
                      className={fieldClassName()}
                    />
                  </div>
                  <div>
                    <FieldLabel contentKey="contact.form.projectType">Project Type</FieldLabel>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
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
                    <FieldLabel contentKey="contact.form.preferredContact">Preferred Contact</FieldLabel>
                    <select
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleChange}
                      className={fieldClassName()}
                    >
                      <option>WhatsApp</option>
                      <option>Phone</option>
                      <option>Email</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel contentKey="contact.form.description">Project Description</FieldLabel>
                    <textarea
                      required
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
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
                      className={fieldClassName()}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-shine mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                  data-interactive="true"
                >
                  <EditableText contentKey="contact.form.submit">Send Project Brief</EditableText>
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </SectionToneContext.Provider>
    </section>
  )
}
