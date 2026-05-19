'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { getProjects } from '@/lib/projects'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { ProjectCard } from './project-card'

export function ProjectsSection() {
  const t = useTranslations('Projects')
  const projectList = t.raw('ProjectList')
  const projects = getProjects(projectList)

  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const [snapCount, setSnapCount] = useState(0)


  useEffect(() => {
    if (!api) return

    const onSelect = () => setSelected(api.selectedScrollSnap())
    setSnapCount(api.scrollSnapList().length)

    onSelect()
    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <section id='projects' className='scroll-mt-24 py-10 md:py-16'>
      <div className='mx-auto max-w-6xl px-4'>
        <h2 className='text-2xl md:text-3xl font-semibold'>{t('title')}</h2>
        <p className='text-white/70 mt-2'>{t('subtitle')}</p>

        <Carousel
          className='mt-8'
          opts={{ align: 'start', loop: true }}
          setApi={setApi}
        >
          <CarouselContent className='-ml-3'>
            {projects.map((p) => (
              <CarouselItem
                key={p.slug}
                className='pl-3 basis-full lg:basis-1/3'
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

          <CarouselPrevious className='hidden sm:flex bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white' />
          <CarouselNext className='hidden sm:flex bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white' />
        </Carousel>

        {snapCount > 1 && (
          <div className='mt-5 flex items-center justify-center gap-2'>
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                type='button'
                onClick={() => api?.scrollTo(i)}
                aria-label={`Ir para página ${i + 1}`}
                className='h-2.5 w-2.5 rounded-full transition'
                style={{
                  background:
                    i === selected
                      ? 'linear-gradient(90deg, var(--brand-1), var(--brand-2))'
                      : 'rgba(255,255,255,0.18)',
                  transform: i === selected ? 'scale(1.15)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
