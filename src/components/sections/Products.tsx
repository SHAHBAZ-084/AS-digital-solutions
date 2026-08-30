import ProductCard from '../cards/ProductCard'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SectionShell from '../ui/SectionShell'
import { useSiteData } from '../../context/SiteDataContext'
import { findProjectFallback, productToProject } from '../../lib/productMap'
import themeHomeProducts from '../../assets/brand/theme-home-products.png'

export default function Products() {
  const { products } = useSiteData()

  return (
    <SectionShell id="projects" texture={themeHomeProducts} showEdge={false}>
      <SectionHeading
        eyebrow="Projects"
        title="Selected work and solution directions"
        subtitle="Each project below is a real delivery direction — tap a card to see the story, results, and live site when available."
        eyebrowKey="projects.eyebrow"
        titleKey="projects.title"
        subtitleKey="projects.subtitle"
      />

      <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <Reveal key={product.id} className="h-full">
            <ProductCard project={productToProject(product, findProjectFallback(product.slug))} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
