import { projects } from '@/lib/projects'
import { ProjectCard } from './project-card'

export function ProjectsSection() {
  return (
    <section id='projetos' className='scroll-mt-24 py-10 md:py-16'>
      <div className='mx-auto max-w-6xl px-4'>
        <h2 className='text-2xl md:text-3xl font-semibold'>
          Projetos em Destaque
        </h2>
        <p className='text-white/70 mt-2'>
          Alguns trabalhos recentes e estudos pessoais.
        </p>
        <div className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {projects.map((p) => (
            <ProjectCard key={p.slug} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
