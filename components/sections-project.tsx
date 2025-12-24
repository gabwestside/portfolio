import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { getProjects } from '@/lib/projects'
import { useTranslations } from 'next-intl'
import { ProjectCard } from './project-card'

export function ProjectsSection() {
  const t = useTranslations('Projects')
  const projectList = t.raw('ProjectList')
  const projects = getProjects(projectList)

  return (
    <section id='projects' className='scroll-mt-24 py-10 md:py-16'>
      <div className='mx-auto max-w-6xl px-4'>
        <h2 className='text-2xl md:text-3xl font-semibold'>{t('title')}</h2>
        <p className='text-white/70 mt-2'>{t('subtitle')}</p>

        <Carousel className='mt-8' opts={{ align: 'start', loop: true }}>
          <CarouselContent className='-ml-3'>
            {projects.map((p) => (
              <CarouselItem
                key={p.slug}
                className='pl-3 basis-full sm:basis-1/2 lg:basis-1/3'
              >
                <ProjectCard
                  details={t('details')}
                  codeLabel={t('code')}
                  demoLabel={t('demo')}
                  {...p}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className='hidden sm:flex bg-transparent cursor-pointer' />
          <CarouselNext className='hidden sm:flex bg-transparent' />
        </Carousel>
      </div>
    </section>
  )
}
