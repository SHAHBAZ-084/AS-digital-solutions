import sharp from 'sharp'
import { mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Only assets referenced by the app (plus uploads mirrors). */
const targets = [
  // brand (used)
  { rel: 'src/assets/brand/hero-skyline.png', maxW: 1920, quality: 72 },
  { rel: 'src/assets/brand/contact-human-ai.png', maxW: 1400, quality: 78 },
  { rel: 'src/assets/brand/projects-bg.png', maxW: 1920, quality: 75 },
  { rel: 'src/assets/brand/process-lightbulb.png', maxW: 1200, quality: 78 },
  { rel: 'src/assets/brand/industries-present.png', maxW: 1200, quality: 78 },
  { rel: 'src/assets/brand/services-office.png', maxW: 1600, quality: 75 },
  { rel: 'src/assets/brand/white-logo.png', maxW: 512, quality: 90 },
  // project logos
  { rel: 'src/assets/projects/citynest-services.png', maxW: 1200, quality: 80 },
  { rel: 'src/assets/projects/sheraz-traders.png', maxW: 1200, quality: 80 },
  { rel: 'src/assets/projects/usman-mall.png', maxW: 1200, quality: 80 },
  { rel: 'src/assets/projects/sufi-co.png', maxW: 1200, quality: 80 },
  // placeholders
  { rel: 'src/assets/projects/placeholder-web.jpg', maxW: 1200, quality: 72 },
  { rel: 'src/assets/projects/placeholder-desktop.jpg', maxW: 1200, quality: 72 },
  { rel: 'src/assets/projects/placeholder-business.jpg', maxW: 1200, quality: 72 },
  { rel: 'src/assets/projects/placeholder-ai.jpg', maxW: 1200, quality: 72 },
]

async function convertOne({ rel, maxW, quality }) {
  const input = path.join(root, rel)
  const outRel = rel.replace(/\.(png|jpe?g)$/i, '.webp')
  const output = path.join(root, outRel)
  await mkdir(path.dirname(output), { recursive: true })

  const before = (await stat(input)).size
  const pipeline = sharp(input).rotate()
  const meta = await pipeline.metadata()
  const width = meta.width && meta.width > maxW ? maxW : undefined

  await pipeline
    .resize(width ? { width, withoutEnlargement: true } : undefined)
    .webp({ quality, effort: 6 })
    .toFile(output)

  const after = (await stat(output)).size
  const pct = (((before - after) / before) * 100).toFixed(0)
  console.log(
    `${rel} -> ${path.basename(outRel)}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB  (-${pct}%)`,
  )
  return outRel
}

async function mirrorUploads() {
  const uploadsDir = path.join(root, 'uploads')
  let files
  try {
    files = await readdir(uploadsDir)
  } catch {
    return
  }
  for (const name of files) {
    if (!/\.(png|jpe?g)$/i.test(name)) continue
    const input = path.join(uploadsDir, name)
    const output = path.join(uploadsDir, name.replace(/\.(png|jpe?g)$/i, '.webp'))
    const before = (await stat(input)).size
    await sharp(input)
      .rotate()
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(output)
    const after = (await stat(output)).size
    console.log(
      `uploads/${name} -> ${path.basename(output)}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
    )
  }
}

const results = []
for (const t of targets) {
  results.push(await convertOne(t))
}
await mirrorUploads()
console.log(`\nDone: ${results.length} asset WebPs created.`)
