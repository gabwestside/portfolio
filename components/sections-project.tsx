import { getProjects } from '@/lib/projects'
import { ProjectCard } from './project-card'
import { useTranslations } from 'next-intl'

export function ProjectsSection() {
  const t = useTranslations('Projects')
  const projectList = t.raw('ProjectList')
  const projects = getProjects(projectList)

  return (
    <section id='projects' className='scroll-mt-24 py-10 md:py-16'>
      <div className='mx-auto max-w-6xl px-4'>
        <h2 className='text-2xl md:text-3xl font-semibold'>{t('title')}</h2>
        <p className='text-white/70 mt-2'>{t('subtitle')}</p>
        <div className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {projects.map((p) => (
            <ProjectCard
              key={p.slug}
              details={t('details')}
              codeLabel={t('code')}
              demo={t('demo')}
              {...p}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
