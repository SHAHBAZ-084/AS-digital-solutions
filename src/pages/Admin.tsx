import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSiteData } from '../context/SiteDataContext'
import { cleanListItem, normalizeStringList } from '../lib/listLines'
import { changeAdminPassword, fetchSettings, logoutAdmin, siteApi, uploadImage } from '../lib/siteApi'
import { BLOCK_LABELS, emptyProduct, newSection, syncProductImages } from '../lib/productCaseStudy'
import { productFromApi } from '../lib/productMap'
import type {
  CaseStudyBlockId, CaseStudySection, ContactInfo, FooterContent, FooterLink, ProcessContent, ProductItem, Service, TeamMember, Technology, WhyUsContent,
} from '../types/siteContent'

type Tab = 'services' | 'products' | 'team' | 'technologies' | 'contact' | 'why-us' | 'process' | 'footer' | 'settings'

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/15'
const labelClass = 'mb-1.5 block text-[11px] font-semibold tracking-[0.16em] text-slate-500 uppercase'
const btnPrimary =
  'inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50'
const btnGhost =
  'inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50'
const btnDanger =
  'inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50'
const panelCard = 'overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  )
}

function OrderControls({
  index, total, onMove,
}: {
  index: number
  total: number
  onMove: (direction: -1 | 1) => void
}) {
  return (
    <span className="mr-2 inline-flex gap-1">
      <button type="button" className={btnGhost} disabled={index === 0} onClick={() => onMove(-1)}>
        Up
      </button>
      <button type="button" className={btnGhost} disabled={index === total - 1} onClick={() => onMove(1)}>
        Down
      </button>
    </span>
  )
}

async function swapOrder<T extends { id: string; sort_order?: number }>(
  resource: string, items: T[], index: number, direction: -1 | 1, refresh: () => Promise<void>,
) {
  const other = index + direction
  const current = items[index]
  const neighbor = items[other]
  if (!current || !neighbor) return
  const currentOrder = current.sort_order ?? index
  const neighborOrder = neighbor.sort_order ?? other
  await siteApi.update(resource, current.id, { ...current, sort_order: neighborOrder })
  await siteApi.update(resource, neighbor.id, { ...neighbor, sort_order: currentOrder })
  await refresh()
}

function MultiImageField({
  label, urls, onChange,
}: {
  label: string
  urls: string[]
  onChange: (urls: string[]) => void
}) {
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  const uploadFiles = (files: FileList | null) => {
    if (!files?.length) return
    const list = [...files]
    if (list.some((file) => file.size > 5 * 1024 * 1024)) {
      setError('Each image must be 5MB or smaller.')
      return
    }
    setError('')
    setUploading(true)
    void Promise.all(list.map((file) => uploadImage(file)))
      .then((uploaded) => onChange([...urls, ...uploaded]))
      .catch(() => setError('Upload failed. Use JPG, PNG, WebP, or GIF under 5MB.'))
      .finally(() => setUploading(false))
  }

  return (
    <div>
      <span className={labelClass}>{label}</span>
      {urls.length > 0 ? (
        <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {urls.map((url, index) => (
            <div key={`${url}-${index}`} className="relative">
              <img src={url} alt="" className="h-20 w-full rounded-xl object-cover ring-1 ring-slate-200" />
              <button
                type="button"
                className="absolute top-1 right-1 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-red-600 shadow"
                onClick={() => onChange(urls.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : null}
      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-navy file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
        onChange={(event) => uploadFiles(event.target.files)}
      />
      {uploading ? <p className="mt-2 text-xs text-slate-500">Uploading…</p> : null}
      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}

function ImageField({
  label, value, onChange,
}: {
  label: string
  value: string
  onChange: (url: string) => void
}) {
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  return (
    <div>
      <span className={labelClass}>{label}</span>
      {value ? (
        <img src={value} alt="" className="mb-3 h-20 w-20 rounded-xl object-cover ring-1 ring-slate-200" />
      ) : null}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-navy file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (!file) return
          if (file.size > 5 * 1024 * 1024) {
            setError('Image must be 5MB or smaller.')
            return
          }
          setError('')
          setUploading(true)
          void uploadImage(file)
            .then((url) => onChange(url))
            .catch(() => setError('Upload failed. Use a JPG, PNG, WebP, or GIF under 5MB.'))
            .finally(() => setUploading(false))
        }}
      />
      {uploading ? <p className="mt-2 text-xs text-slate-500">Uploading…</p> : null}
      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}

function IconServices() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
    </svg>
  )
}
function IconProducts() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 8l8-4 8 4v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" strokeLinejoin="round" />
      <path d="M12 12v7" strokeLinecap="round" />
    </svg>
  )
}
function IconTeam() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" strokeLinecap="round" />
      <circle cx="9.5" cy="7.5" r="2.5" />
      <path d="M20 19v-1a3.5 3.5 0 0 0-2.6-3.4" strokeLinecap="round" />
      <path d="M16.5 7.6a2.3 2.3 0 0 1 0 4.3" strokeLinecap="round" />
    </svg>
  )
}
function IconTech() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 9H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3M16 9h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3" />
      <path d="m10 15 4-6" strokeLinecap="round" />
    </svg>
  )
}
function IconContact() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16v12H4V6Z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}
function IconFooter() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16v12H4V6Z" />
      <path d="M4 16h16" />
    </svg>
  )
}
function IconSettings() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4" strokeLinecap="round" />
    </svg>
  )
}

function ServicesPanel() {
  const { services, refresh } = useSiteData()
  const empty: Service = { id: '', title: '', description: '', icon: 'web', features: [] }
  const [draft, setDraft] = useState<Service>(empty)
  const [editing, setEditing] = useState(false)
  const [busy, setBusy] = useState(false)

  const save = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    try {
      const payload = {
        ...draft, id: draft.id || draft.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), sort_order: editing ? (draft.sort_order ?? 0) : services.length, }
      if (editing) await siteApi.update('services', payload.id, payload)
      else await siteApi.create('services', payload)
      setDraft(empty)
      setEditing(false)
      await refresh()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className={panelCard}>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Icon</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {services.map((item, index) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{item.title}</td>
                <td className="px-4 py-3 text-slate-500">{item.icon}</td>
                <td className="px-4 py-3 text-right">
                  <OrderControls
                    index={index}
                    total={services.length}
                    onMove={(direction) => {
                      void swapOrder('services', services, index, direction, refresh)
                    }}
                  />
                  <button
                    type="button"
                    className={btnGhost}
                    onClick={() => {
                      setDraft(item)
                      setEditing(true)
                    }}
                  >
                    Edit
                  </button>{' '}
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => {
                      if (!window.confirm('Delete this service?')) return
                      void siteApi.remove('services', item.id).then(() => refresh())
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={save} className={`space-y-3 p-5 ${panelCard}`}>
        <h2 className="text-sm font-semibold text-slate-900">{editing ? 'Edit service' : 'Add service'}</h2>
        <Field label="ID">
          <input
            className={inputClass}
            value={draft.id}
            onChange={(event) => setDraft({ ...draft, id: event.target.value })}
            disabled={editing}
          />
        </Field>
        <Field label="Title">
          <input
            className={inputClass}
            value={draft.title}
            onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            required
          />
        </Field>
        <Field label="Description">
          <textarea
            className={inputClass}
            rows={3}
            value={draft.description}
            onChange={(event) => setDraft({ ...draft, description: event.target.value })}
          />
        </Field>
        <Field label="Icon">
          <select
            className={inputClass}
            value={draft.icon}
            onChange={(event) => setDraft({ ...draft, icon: event.target.value })}
          >
            <option value="web">web</option>
            <option value="business">business</option>
            <option value="ai">ai</option>
            <option value="custom">custom</option>
            <option value="consultancy">consultancy</option>
            <option value="offline">offline</option>
          </select>
        </Field>
        <Field label="Features (one per line)">
          <textarea
            className={inputClass}
            rows={4}
            value={draft.features.join('\n')}
            onChange={(event) => setDraft({ ...draft, features: event.target.value.split(/\r?\n/) })}
          />
        </Field>
        <div className="flex gap-2 pt-1">
          <button type="submit" className={btnPrimary} disabled={busy}>
            {busy ? 'Saving…' : 'Save'}
          </button>
          {editing ? (
            <button
              type="button"
              className={btnGhost}
              onClick={() => {
                setDraft(empty)
                setEditing(false)
              }}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  )
}

function ProductsPanel() {
  const { products, refresh } = useSiteData()
  const empty = emptyProduct()
  const [draft, setDraft] = useState<ProductItem>(empty)
  const [editing, setEditing] = useState(false)
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState(false)

  const setCase = (patch: Partial<ProductItem['case_study']>) =>
    setDraft({ ...draft, case_study: { ...draft.case_study, ...patch } })

  const updateSection = (id: string, patch: Partial<CaseStudySection>) =>
    setCase({
      sections: draft.case_study.sections.map((section) =>
        section.id === id ? { ...section, ...patch } : section, ), })

  const enabled = draft.case_study.enabled_blocks
  const missingBlocks = (Object.keys(BLOCK_LABELS) as CaseStudyBlockId[]).filter(
    (id) => !enabled.includes(id), )

  const save = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setSaved(false)
    try {
      const id = draft.id || draft.slug || draft.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const payload = syncProductImages({
        ...draft, id, slug: draft.slug || id, sort_order: editing ? draft.sort_order : products.length, })
      if (editing) await siteApi.update('products', payload.id, payload)
      else await siteApi.create('products', payload)
      setDraft(empty)
      setEditing(false)
      await refresh()
      setSaved(true)
    } finally {
      setBusy(false)
    }
  }

  const previewSlug = draft.slug || draft.id
  const liveUrl = draft.live_url.trim()

  return (
    <div className="space-y-6">
      {saved ? <p className="text-sm text-emerald-600">Saved. The website is updating now.</p> : null}
      <div className={panelCard}>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                <td className="px-4 py-3 text-slate-500">{item.type}</td>
                <td className="px-4 py-3 text-right">
                  <OrderControls
                    index={index}
                    total={products.length}
                    onMove={(direction) => {
                      void swapOrder('products', products, index, direction, refresh)
                    }}
                  />
                  <a href={`/case-study/${item.slug}`} target="_blank" rel="noreferrer" className={btnGhost}>
                    Case study
                  </a>{' '}
                  {item.live_url ? (
                    <a href={item.live_url} target="_blank" rel="noreferrer" className={btnGhost}>
                      Live View
                    </a>
                  ) : null}{' '}
                  <button
                    type="button"
                    className={btnGhost}
                    onClick={() => {
                      setDraft(productFromApi(item))
                      setEditing(true)
                      setSaved(false)
                    }}
                  >
                    Edit
                  </button>{' '}
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => {
                      if (!window.confirm('Delete this project?')) return
                      void siteApi.remove('products', item.id).then(() => refresh())
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={save} className={`space-y-4 p-5 ${panelCard}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-900">
            {editing ? 'Edit project & case study' : 'Add project & case study'}
          </h2>
          {previewSlug ? (
            <div className="flex flex-wrap gap-2">
              <a href={`/case-study/${previewSlug}`} target="_blank" rel="noreferrer" className={btnGhost}>
                Preview case study
              </a>
              {liveUrl ? (
                <a href={liveUrl} target="_blank" rel="noreferrer" className={btnPrimary}>
                  Live View
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name">
            <input
              className={inputClass}
              value={draft.name}
              required
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
            />
          </Field>
          <Field label="Industry">
            <input
              className={inputClass}
              value={draft.industry}
              onChange={(event) => setDraft({ ...draft, industry: event.target.value })}
            />
          </Field>
          <Field label="Type">
            <select
              className={inputClass}
              value={draft.type}
              onChange={(event) => setDraft({ ...draft, type: event.target.value })}
            >
              <option>Web</option>
              <option>Desktop</option>
              <option>Business Software</option>
              <option>AI-ML</option>
            </select>
          </Field>
          <Field label="Live website URL">
            <input
              className={inputClass}
              type="url"
              placeholder="https://example.com"
              value={draft.live_url}
              onChange={(event) => setDraft({ ...draft, live_url: event.target.value })}
            />
          </Field>
          <Field label="Page name (used in the web address)">
            <input
              className={inputClass}
              value={draft.slug}
              onChange={(event) => setDraft({ ...draft, slug: event.target.value })}
            />
          </Field>
        </div>

        <Field label="Short description">
          <textarea
            className={inputClass}
            rows={2}
            value={draft.description}
            onChange={(event) => setDraft({ ...draft, description: event.target.value })}
          />
        </Field>

        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Case study boxes</h3>
            <div className="flex flex-wrap gap-2">
              {missingBlocks.length > 0 ? (
                <select
                  className={inputClass}
                  defaultValue=""
                  onChange={(event) => {
                    const value = event.target.value as CaseStudyBlockId
                    if (!value) return
                    setCase({ enabled_blocks: [...enabled, value] })
                    event.currentTarget.value = ''
                  }}
                >
                  <option value="">Add a box…</option>
                  {missingBlocks.map((id) => (
                    <option key={id} value={id}>
                      {BLOCK_LABELS[id]}
                    </option>
                  ))}
                </select>
              ) : null}
              <button
                type="button"
                className={btnGhost}
                onClick={() => setCase({ sections: [...draft.case_study.sections, newSection()] })}
              >
                Add custom section
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {enabled.includes('overview') ? (
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="mb-2 flex justify-between">
                  <span className={labelClass}>Overview</span>
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => setCase({ enabled_blocks: enabled.filter((id) => id !== 'overview') })}
                  >
                    Remove box
                  </button>
                </div>
                <textarea
                  className={inputClass}
                  rows={3}
                  value={draft.case_study.overview}
                  onChange={(event) => setCase({ overview: event.target.value })}
                />
              </div>
            ) : null}

            {enabled.includes('client') ? (
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="mb-2 flex justify-between">
                  <span className={labelClass}>Client</span>
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => setCase({ enabled_blocks: enabled.filter((id) => id !== 'client') })}
                  >
                    Remove box
                  </button>
                </div>
                <input
                  className={inputClass}
                  value={draft.case_study.client}
                  onChange={(event) => setCase({ client: event.target.value })}
                />
              </div>
            ) : null}

            {enabled.includes('challenge') ? (
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="mb-2 flex justify-between">
                  <span className={labelClass}>Challenge</span>
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => setCase({ enabled_blocks: enabled.filter((id) => id !== 'challenge') })}
                  >
                    Remove box
                  </button>
                </div>
                <textarea
                  className={inputClass}
                  rows={3}
                  value={draft.case_study.challenge}
                  onChange={(event) => setCase({ challenge: event.target.value })}
                />
              </div>
            ) : null}

            {enabled.includes('solution') ? (
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="mb-2 flex justify-between">
                  <span className={labelClass}>Solution</span>
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => setCase({ enabled_blocks: enabled.filter((id) => id !== 'solution') })}
                  >
                    Remove box
                  </button>
                </div>
                <textarea
                  className={inputClass}
                  rows={3}
                  value={draft.case_study.solution}
                  onChange={(event) => setCase({ solution: event.target.value })}
                />
              </div>
            ) : null}

            {enabled.includes('key_features') ? (
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="mb-2 flex justify-between">
                  <span className={labelClass}>Key features (one per line)</span>
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => setCase({ enabled_blocks: enabled.filter((id) => id !== 'key_features') })}
                  >
                    Remove box
                  </button>
                </div>
                <textarea
                  className={inputClass}
                  rows={3}
                  value={draft.case_study.key_features.join('\n')}
                  onChange={(event) =>
                    setCase({ key_features: event.target.value.split(/\r?\n/).filter(Boolean) })
                  }
                />
              </div>
            ) : null}

            {enabled.includes('results') ? (
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="mb-2 flex justify-between">
                  <span className={labelClass}>Results (one per line)</span>
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => setCase({ enabled_blocks: enabled.filter((id) => id !== 'results') })}
                  >
                    Remove box
                  </button>
                </div>
                <textarea
                  className={inputClass}
                  rows={3}
                  value={draft.case_study.results.join('\n')}
                  onChange={(event) => setCase({ results: event.target.value.split(/\r?\n/).filter(Boolean) })}
                />
              </div>
            ) : null}

            {enabled.includes('technology') ? (
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="mb-2 flex justify-between">
                  <span className={labelClass}>Tools used (optional, one per line)</span>
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => setCase({ enabled_blocks: enabled.filter((id) => id !== 'technology') })}
                  >
                    Remove box
                  </button>
                </div>
                <textarea
                  className={inputClass}
                  rows={2}
                  value={draft.tech.join('\n')}
                  onChange={(event) =>
                    setDraft({
                      ...draft, tech: event.target.value
                        .split(/\r?\n|,/)
                        .map((item) => item.trim())
                        .filter(Boolean), })
                  }
                />
              </div>
            ) : null}

            {enabled.includes('screenshots') ? (
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="mb-2 flex justify-between">
                  <span className={labelClass}>Project images</span>
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => setCase({ enabled_blocks: enabled.filter((id) => id !== 'screenshots') })}
                  >
                    Remove box
                  </button>
                </div>
                <p className="mb-3 text-sm text-slate-500">
                  Upload a real screenshot for this project. Without an upload, the site shows a type-based
                  placeholder (Web / Desktop / Business Software / AI-ML). Real images always override that
                  fallback.
                </p>
                <MultiImageField
                  label=""
                  urls={draft.case_study.screenshot_urls}
                  onChange={(screenshot_urls) => setCase({ screenshot_urls })}
                />
              </div>
            ) : null}

            {draft.case_study.sections.map((section) => (
              <div key={section.id} className="rounded-lg border border-slate-200 bg-white p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <input
                    className={inputClass}
                    value={section.title}
                    onChange={(event) => updateSection(section.id, { title: event.target.value })}
                    placeholder="Section title"
                  />
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() =>
                      setCase({
                        sections: draft.case_study.sections.filter((item) => item.id !== section.id), })
                    }
                  >
                    Remove box
                  </button>
                </div>
                <textarea
                  className={inputClass}
                  rows={3}
                  value={section.body}
                  onChange={(event) => updateSection(section.id, { body: event.target.value })}
                  placeholder="Write the content"
                />
                <textarea
                  className={inputClass}
                  rows={2}
                  value={section.bullets.join('\n')}
                  onChange={(event) =>
                    updateSection(section.id, {
                      bullets: event.target.value.split(/\r?\n/).filter(Boolean), })
                  }
                  placeholder="Optional bullet points (one per line)"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button type="submit" className={btnPrimary} disabled={busy}>
            {busy ? 'Saving…' : 'Save and update website'}
          </button>
          {editing ? (
            <button
              type="button"
              className={btnGhost}
              onClick={() => {
                setDraft(empty)
                setEditing(false)
              }}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  )
}

function TeamPanel() {
  const { team, refresh } = useSiteData()
  const empty: TeamMember = {
    id: '', name: '', role: '', bio: '', skills: [], links: { linkedin: '', email: '' }, photo_url: '', sort_order: 0, }
  const [draft, setDraft] = useState<TeamMember>(empty)
  const [editing, setEditing] = useState(false)
  const [busy, setBusy] = useState(false)

  const save = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    try {
      const payload = {
        ...draft,
        id: draft.id || draft.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        skills: normalizeStringList(draft.skills),
        sort_order: editing ? (draft.sort_order ?? 0) : team.length,
      }
      if (editing) await siteApi.update('team', payload.id, payload)
      else await siteApi.create('team', payload)
      setDraft(empty)
      setEditing(false)
      await refresh()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className={panelCard}>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {team.map((item, index) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                <td className="px-4 py-3 text-slate-500">{item.role}</td>
                <td className="px-4 py-3 text-right">
                  <OrderControls
                    index={index}
                    total={team.length}
                    onMove={(direction) => {
                      void swapOrder('team', team, index, direction, refresh)
                    }}
                  />
                  <button
                    type="button"
                    className={btnGhost}
                    onClick={() => {
                      setDraft(item)
                      setEditing(true)
                    }}
                  >
                    Edit
                  </button>{' '}
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => {
                      if (!window.confirm('Delete this team member?')) return
                      void siteApi.remove('team', item.id).then(() => refresh())
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={save} className={`space-y-3 p-5 ${panelCard}`}>
        <h2 className="text-sm font-semibold text-slate-900">{editing ? 'Edit member' : 'Add member'}</h2>
        <Field label="Name">
          <input
            className={inputClass}
            value={draft.name}
            required
            onChange={(event) => setDraft({ ...draft, name: event.target.value })}
          />
        </Field>
        <Field label="Role">
          <input
            className={inputClass}
            value={draft.role}
            onChange={(event) => setDraft({ ...draft, role: event.target.value })}
          />
        </Field>
        <Field label="Bio">
          <textarea
            className={inputClass}
            rows={3}
            value={draft.bio}
            onChange={(event) => setDraft({ ...draft, bio: event.target.value })}
          />
        </Field>
        <Field label="Skills (one per line)">
          <textarea
            className={inputClass}
            rows={5}
            value={draft.skills.join('\n')}
            onChange={(event) =>
              setDraft({
                ...draft,
                skills: event.target.value.split(/\r?\n/).map((line) =>
                  line.trim() === '' ? '' : cleanListItem(line),
                ),
              })
            }
          />
        </Field>
        <Field label="LinkedIn URL">
          <input
            className={inputClass}
            value={draft.links.linkedin}
            onChange={(event) =>
              setDraft({ ...draft, links: { ...draft.links, linkedin: event.target.value } })
            }
          />
        </Field>
        <Field label="Email">
          <input
            className={inputClass}
            value={draft.links.email}
            onChange={(event) =>
              setDraft({ ...draft, links: { ...draft.links, email: event.target.value } })
            }
          />
        </Field>
        <ImageField
          label="Photo"
          value={draft.photo_url}
          onChange={(url) => setDraft({ ...draft, photo_url: url })}
        />
        <div className="flex gap-2 pt-1">
          <button type="submit" className={btnPrimary} disabled={busy}>
            {busy ? 'Saving…' : 'Save and update website'}
          </button>
          {editing ? (
            <button
              type="button"
              className={btnGhost}
              onClick={() => {
                setDraft(empty)
                setEditing(false)
              }}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  )
}

function TechnologiesPanel() {
  const { technologies, refresh } = useSiteData()
  const empty: Technology = { id: '', name: '', category: 'Frontend', icon: 'frontend', sort_order: 0 }
  const [draft, setDraft] = useState<Technology>(empty)
  const [editing, setEditing] = useState(false)
  const [busy, setBusy] = useState(false)

  const save = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    try {
      const payload = {
        ...draft, id: draft.id || draft.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), sort_order: editing ? (draft.sort_order ?? 0) : technologies.length, }
      if (editing) await siteApi.update('technologies', payload.id, payload)
      else await siteApi.create('technologies', payload)
      setDraft(empty)
      setEditing(false)
      await refresh()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className={panelCard}>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {technologies.map((item, index) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                <td className="px-4 py-3 text-slate-500">{item.category}</td>
                <td className="px-4 py-3 text-right">
                  <OrderControls
                    index={index}
                    total={technologies.length}
                    onMove={(direction) => {
                      void swapOrder('technologies', technologies, index, direction, refresh)
                    }}
                  />
                  <button
                    type="button"
                    className={btnGhost}
                    onClick={() => {
                      setDraft(item)
                      setEditing(true)
                    }}
                  >
                    Edit
                  </button>{' '}
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => {
                      if (!window.confirm('Delete this item?')) return
                      void siteApi.remove('technologies', item.id).then(() => refresh())
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={save} className={`space-y-3 p-5 ${panelCard}`}>
        <h2 className="text-sm font-semibold text-slate-900">{editing ? 'Edit technology' : 'Add technology'}</h2>
        <Field label="Name">
          <input
            className={inputClass}
            value={draft.name}
            required
            onChange={(event) => setDraft({ ...draft, name: event.target.value })}
          />
        </Field>
        <Field label="Category">
          <select
            className={inputClass}
            value={draft.category}
            onChange={(event) =>
              setDraft({ ...draft, category: event.target.value as Technology['category'] })
            }
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>Database</option>
            <option>Desktop</option>
            <option>AI/ML</option>
          </select>
        </Field>
        <div className="flex gap-2 pt-1">
          <button type="submit" className={btnPrimary} disabled={busy}>
            {busy ? 'Saving…' : 'Save and update website'}
          </button>
          {editing ? (
            <button
              type="button"
              className={btnGhost}
              onClick={() => {
                setDraft(empty)
                setEditing(false)
              }}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  )
}

function ContactPanel() {
  const { contact, refresh } = useSiteData()
  const [busy, setBusy] = useState(false)

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const draft: ContactInfo = {
      whatsapp_number: (form.elements.namedItem('whatsapp_number') as HTMLInputElement).value, email: (form.elements.namedItem('email') as HTMLInputElement).value, phone: (form.elements.namedItem('phone') as HTMLInputElement).value, address: (form.elements.namedItem('address') as HTMLInputElement).value, socials: {
        linkedin: (form.elements.namedItem('linkedin') as HTMLInputElement).value, facebook: (form.elements.namedItem('facebook') as HTMLInputElement).value, instagram: (form.elements.namedItem('instagram') as HTMLInputElement).value, }, }
    setBusy(true)
    try {
      await siteApi.updateContact(draft)
      await refresh()
    } finally {
      setBusy(false)
    }
  }

  return (
    <form key={JSON.stringify(contact)} onSubmit={save} className={`max-w-xl space-y-3 p-5 ${panelCard}`}>
      <Field label="WhatsApp number">
        <input name="whatsapp_number" defaultValue={contact.whatsapp_number} className={inputClass} />
      </Field>
      <Field label="Email">
        <input name="email" defaultValue={contact.email} className={inputClass} />
      </Field>
      <Field label="Phone">
        <input name="phone" defaultValue={contact.phone} className={inputClass} />
      </Field>
      <Field label="Address">
        <input name="address" defaultValue={contact.address} className={inputClass} />
      </Field>
      <Field label="LinkedIn">
        <input name="linkedin" defaultValue={contact.socials.linkedin} className={inputClass} />
      </Field>
      <Field label="Facebook">
        <input name="facebook" defaultValue={contact.socials.facebook} className={inputClass} />
      </Field>
      <Field label="Instagram">
        <input name="instagram" defaultValue={contact.socials.instagram} className={inputClass} />
      </Field>
      <button type="submit" className={btnPrimary} disabled={busy}>
        {busy ? 'Saving…' : 'Save and update website'}
      </button>
    </form>
  )
}

function FooterPanel() {
  const { footer, refresh } = useSiteData()
  return <FooterEditor key={JSON.stringify(footer)} footer={footer} refresh={refresh} />
}

function FooterEditor({
  footer, refresh,
}: {
  footer: FooterContent
  refresh: () => Promise<void>
}) {
  const [draft, setDraft] = useState<FooterContent>(footer)
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setSaved(false)
    try {
      await siteApi.updateFooter(draft)
      await refresh()
      setSaved(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={save} className={`max-w-3xl space-y-4 p-5 ${panelCard}`}>
      <p className="text-sm text-slate-500">Change footer text, columns, and links. Save to update the website immediately.</p>
      <Field label="Company description">
        <textarea
          className={inputClass}
          rows={3}
          value={draft.blurb}
          onChange={(event) => setDraft({ ...draft, blurb: event.target.value })}
        />
      </Field>
      <div className="grid gap-3 md:grid-cols-3">
        <Field label="Copyright line">
          <input
            className={inputClass}
            value={draft.copyright}
            onChange={(event) => setDraft({ ...draft, copyright: event.target.value })}
          />
        </Field>
        <Field label="Privacy label">
          <input
            className={inputClass}
            value={draft.privacy_label}
            onChange={(event) => setDraft({ ...draft, privacy_label: event.target.value })}
          />
        </Field>
        <Field label="Terms label">
          <input
            className={inputClass}
            value={draft.terms_label}
            onChange={(event) => setDraft({ ...draft, terms_label: event.target.value })}
          />
        </Field>
      </div>

      {draft.columns.map((column, columnIndex) => (
        <div key={column.id} className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-2">
            <input
              className={inputClass}
              value={column.title}
              onChange={(event) => {
                const columns = [...draft.columns]
                columns[columnIndex] = { ...column, title: event.target.value }
                setDraft({ ...draft, columns })
              }}
            />
            <button
              type="button"
              className={btnDanger}
              onClick={() =>
                setDraft({ ...draft, columns: draft.columns.filter((item) => item.id !== column.id) })
              }
            >
              Remove column
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {column.links.map((link, linkIndex) => (
              <div key={link.id} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                <input
                  className={inputClass}
                  value={link.label}
                  placeholder="Link text"
                  onChange={(event) => {
                    const columns = [...draft.columns]
                    const links = [...column.links]
                    links[linkIndex] = { ...link, label: event.target.value }
                    columns[columnIndex] = { ...column, links }
                    setDraft({ ...draft, columns })
                  }}
                />
                <input
                  className={inputClass}
                  value={link.href}
                  placeholder="#contact or https://"
                  onChange={(event) => {
                    const columns = [...draft.columns]
                    const links = [...column.links]
                    links[linkIndex] = { ...link, href: event.target.value }
                    columns[columnIndex] = { ...column, links }
                    setDraft({ ...draft, columns })
                  }}
                />
                <button
                  type="button"
                  className={btnDanger}
                  onClick={() => {
                    const columns = [...draft.columns]
                    columns[columnIndex] = {
                      ...column, links: column.links.filter((item) => item.id !== link.id), }
                    setDraft({ ...draft, columns })
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className={btnGhost}
              onClick={() => {
                const columns = [...draft.columns]
                const link: FooterLink = {
                  id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, label: 'New link', href: '#', }
                columns[columnIndex] = { ...column, links: [...column.links, link] }
                setDraft({ ...draft, columns })
              }}
            >
              Add link
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        className={btnGhost}
        onClick={() =>
          setDraft({
            ...draft, columns: [
              ...draft.columns, {
                id: `${Date.now()}`, title: 'New column', links: [], }, ], })
        }
      >
        Add column
      </button>

      <div className="flex items-center gap-3">
        <button type="submit" className={btnPrimary} disabled={busy}>
          {busy ? 'Saving…' : 'Save footer'}
        </button>
        {saved ? <span className="text-sm text-emerald-600">Saved. The website is updating now.</span> : null}
      </div>
    </form>
  )
}

function WhyUsPanel() {
  const { why_us, refresh } = useSiteData()
  return <WhyUsEditor key={JSON.stringify(why_us)} data={why_us} refresh={refresh} />
}

function WhyUsEditor({
  data, refresh,
}: {
  data: WhyUsContent
  refresh: () => Promise<void>
}) {
  const [draft, setDraft] = useState<WhyUsContent>(data)
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setSaved(false)
    try {
      await siteApi.updateWhyUs(draft)
      await refresh()
      setSaved(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={save} className={`max-w-3xl space-y-4 p-5 ${panelCard}`}>
      <p className="text-sm text-slate-500">Edit Why Us headings and cards. Save to update the website.</p>
      <Field label="Small heading">
        <input className={inputClass} value={draft.eyebrow} onChange={(event) => setDraft({ ...draft, eyebrow: event.target.value })} />
      </Field>
      <Field label="Title">
        <input className={inputClass} value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
      </Field>
      <Field label="Subtitle">
        <textarea className={inputClass} rows={2} value={draft.subtitle} onChange={(event) => setDraft({ ...draft, subtitle: event.target.value })} />
      </Field>
      {draft.items.map((item, index) => (
        <div key={item.id} className="rounded-xl border border-slate-200 p-4 space-y-2">
          <div className="flex justify-between gap-2">
            <input
              className={inputClass}
              value={item.title}
              onChange={(event) => {
                const items = [...draft.items]
                items[index] = { ...item, title: event.target.value }
                setDraft({ ...draft, items })
              }}
            />
            <button
              type="button"
              className={btnDanger}
              onClick={() => setDraft({ ...draft, items: draft.items.filter((entry) => entry.id !== item.id) })}
            >
              Remove
            </button>
          </div>
          <textarea
            className={inputClass}
            rows={2}
            value={item.description}
            onChange={(event) => {
              const items = [...draft.items]
              items[index] = { ...item, description: event.target.value }
              setDraft({ ...draft, items })
            }}
          />
        </div>
      ))}
      <button
        type="button"
        className={btnGhost}
        onClick={() =>
          setDraft({
            ...draft, items: [
              ...draft.items, { id: `${Date.now()}`, title: 'New point', description: '' }, ], })
        }
      >
        Add card
      </button>
      <div className="flex items-center gap-3">
        <button type="submit" className={btnPrimary} disabled={busy}>
          {busy ? 'Saving…' : 'Save Why Us'}
        </button>
        {saved ? <span className="text-sm text-emerald-600">Saved. The website is updating now.</span> : null}
      </div>
    </form>
  )
}

function ProcessPanel() {
  const { process, refresh } = useSiteData()
  return <ProcessEditor key={JSON.stringify(process)} data={process} refresh={refresh} />
}

function ProcessEditor({
  data, refresh,
}: {
  data: ProcessContent
  refresh: () => Promise<void>
}) {
  const [draft, setDraft] = useState<ProcessContent>(data)
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setSaved(false)
    try {
      await siteApi.updateProcess(draft)
      await refresh()
      setSaved(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={save} className={`max-w-3xl space-y-4 p-5 ${panelCard}`}>
      <p className="text-sm text-slate-500">Edit Process headings and steps. Save to update the website.</p>
      <Field label="Small heading">
        <input className={inputClass} value={draft.eyebrow} onChange={(event) => setDraft({ ...draft, eyebrow: event.target.value })} />
      </Field>
      <Field label="Title">
        <input className={inputClass} value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
      </Field>
      <Field label="Subtitle">
        <textarea className={inputClass} rows={2} value={draft.subtitle} onChange={(event) => setDraft({ ...draft, subtitle: event.target.value })} />
      </Field>
      {draft.steps.map((step, index) => (
        <div key={step.id} className="rounded-xl border border-slate-200 p-4 space-y-2">
          <div className="grid gap-2 md:grid-cols-[90px_1fr_auto]">
            <input
              className={inputClass}
              value={step.number}
              onChange={(event) => {
                const steps = [...draft.steps]
                steps[index] = { ...step, number: event.target.value }
                setDraft({ ...draft, steps })
              }}
            />
            <input
              className={inputClass}
              value={step.title}
              onChange={(event) => {
                const steps = [...draft.steps]
                steps[index] = { ...step, title: event.target.value }
                setDraft({ ...draft, steps })
              }}
            />
            <button
              type="button"
              className={btnDanger}
              onClick={() => setDraft({ ...draft, steps: draft.steps.filter((entry) => entry.id !== step.id) })}
            >
              Remove
            </button>
          </div>
          <textarea
            className={inputClass}
            rows={2}
            value={step.description}
            onChange={(event) => {
              const steps = [...draft.steps]
              steps[index] = { ...step, description: event.target.value }
              setDraft({ ...draft, steps })
            }}
          />
        </div>
      ))}
      <button
        type="button"
        className={btnGhost}
        onClick={() =>
          setDraft({
            ...draft, steps: [
              ...draft.steps, {
                id: `${Date.now()}`, number: String(draft.steps.length + 1).padStart(2, '0'), title: 'New step', description: '', }, ], })
        }
      >
        Add step
      </button>
      <div className="flex items-center gap-3">
        <button type="submit" className={btnPrimary} disabled={busy}>
          {busy ? 'Saving…' : 'Save Process'}
        </button>
        {saved ? <span className="text-sm text-emerald-600">Saved. The website is updating now.</span> : null}
      </div>
    </form>
  )
}

function SettingsPanel() {
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    fetchSettings()
      .then((data) => {
        if (!active) return
        setUsername(data.username)
        setReady(true)
      })
      .catch(() => {
        if (!active) return
        setReady(true)
      })
    return () => {
      active = false
    }
  }, [])

  const save = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setSaved(false)
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.')
      return
    }
    setBusy(true)
    try {
      await changeAdminPassword(currentPassword, newPassword)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setSaved(true)
    } catch (err) {
      setError(
        err instanceof Error && err.message === 'invalid'
          ? 'Current password is incorrect, or the new password is invalid.'
          : 'Could not update password.', )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid max-w-2xl gap-6">
      <form onSubmit={save} className={`space-y-4 p-5 ${panelCard}`}>
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Change password</h2>
          <p className="mt-1 text-sm text-slate-500">
            Signed in as <span className="font-medium text-slate-800">{username || '…'}</span>. Passwords are hashed
            on the server and never stored in the browser bundle.
          </p>
        </div>
        <Field label="Current password">
          <input
            type="password"
            autoComplete="current-password"
            className={inputClass}
            value={currentPassword}
            onChange={(event) => {
              setSaved(false)
              setCurrentPassword(event.target.value)
            }}
            required
          />
        </Field>
        <Field label="New password">
          <input
            type="password"
            autoComplete="new-password"
            className={inputClass}
            value={newPassword}
            onChange={(event) => {
              setSaved(false)
              setNewPassword(event.target.value)
            }}
            required
            minLength={8}
          />
        </Field>
        <Field label="Confirm new password">
          <input
            type="password"
            autoComplete="new-password"
            className={inputClass}
            value={confirmPassword}
            onChange={(event) => {
              setSaved(false)
              setConfirmPassword(event.target.value)
            }}
            required
            minLength={8}
          />
        </Field>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="flex items-center gap-3">
          <button type="submit" className={btnPrimary} disabled={busy || !ready}>
            {busy ? 'Saving…' : 'Update password'}
          </button>
          {saved ? <span className="text-sm text-emerald-600">Password updated</span> : null}
        </div>
      </form>
      <div className={`space-y-3 p-5 ${panelCard}`}>
        <h2 className="text-sm font-semibold text-slate-900">Session security</h2>
        <p className="text-sm text-slate-500">
          Admin access uses an httpOnly session cookie. You are signed out automatically after 15 minutes of
          inactivity. Open <span className="font-medium text-slate-800">/admin/login</span> to sign in.
        </p>
      </div>
    </div>
  )
}

const tabs: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: 'services', label: 'Services', icon: <IconServices /> }, { id: 'products', label: 'Projects', icon: <IconProducts /> }, { id: 'team', label: 'Team', icon: <IconTeam /> }, { id: 'technologies', label: 'Technology', icon: <IconTech /> }, { id: 'contact', label: 'Contact Info', icon: <IconContact /> }, { id: 'why-us', label: 'Why Us', icon: <IconTeam /> }, { id: 'process', label: 'Process', icon: <IconServices /> }, { id: 'footer', label: 'Footer', icon: <IconFooter /> }, { id: 'settings', label: 'Settings', icon: <IconSettings /> },
]

export default function AdminPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('services')

  const lock = async () => {
    await logoutAdmin()
    navigate('/', { replace: true })
  }

  const current = tabs.find((item) => item.id === tab)

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col bg-navy text-white md:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-white/50 uppercase">AS Digital</p>
          <p className="mt-1 text-sm font-semibold">Command Center</p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${
                tab === item.id ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/8 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/10 space-y-2 p-4">
          <button
            type="button"
            onClick={() => {
              void lock()
            }}
            className="block text-sm text-white/55 hover:text-white"
          >
            Sign out
          </button>
          <button type="button" onClick={() => navigate('/')} className="block text-sm text-white/55 hover:text-white">
            Back to website
          </button>
        </div>
      </aside>

      <div className="md:pl-60">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur sm:px-8">
          <p className="text-sm font-semibold tracking-tight text-navy">
            AS Digital Solutions Command Center
          </p>
          <button
            type="button"
            onClick={() => {
              void lock()
            }}
            className="text-sm text-slate-500 hover:text-navy md:hidden"
          >
            Sign out
          </button>
        </header>

        <div className="flex gap-2 overflow-x-auto px-4 py-3 md:hidden">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`${tab === item.id ? btnPrimary : btnGhost} shrink-0`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <main className="px-4 py-6 sm:px-8 sm:py-8">
          <div className="mb-6">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase">Manage</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-navy">{current?.label}</h1>
          </div>
          {tab === 'services' ? <ServicesPanel /> : null}
          {tab === 'products' ? <ProductsPanel /> : null}
          {tab === 'team' ? <TeamPanel /> : null}
          {tab === 'technologies' ? <TechnologiesPanel /> : null}
          {tab === 'contact' ? <ContactPanel /> : null}
          {tab === 'why-us' ? <WhyUsPanel /> : null}
          {tab === 'process' ? <ProcessPanel /> : null}
          {tab === 'footer' ? <FooterPanel /> : null}
          {tab === 'settings' ? <SettingsPanel /> : null}
        </main>
      </div>
    </div>
  )
}
