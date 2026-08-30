import ProductCard from '../cards/ProductCard'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SectionShell from '../ui/SectionShell'
import StaggerGrid from '../ui/StaggerGrid'
import { useSiteData } from '../../context/SiteDataContext'
import { findProjectFallback, productToProject } from '../../lib/productMap'
import projectsBg from '../../assets/brand/projects-bg.png'

export default function Products() {
  const { products } = useSiteData()

  return (
    <SectionShell id="projects" texture={projectsBg} textureOpacity={0.88} showEdge={false}>
      <SectionHeading
        eyebrow="Projects"
        title="Selected Work"
        subtitle="Each project below is a real delivery direction. Tap a card to see the story, results, and live site when available."
        eyebrowKey="projects.eyebrow"
        titleKey="projects.title"
        subtitleKey="projects.subtitle"
      />

      <StaggerGrid className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <Reveal key={product.id} staggerChild className="h-full">
            <ProductCard project={productToProject(product, findProjectFallback(product.slug))} />
          </Reveal>
        ))}
      </StaggerGrid>
    </SectionShell>
  )
}
