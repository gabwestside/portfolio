import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Github, ExternalLink } from 'lucide-react'

export type Project = {
  slug: string
  title: string
  description: string
  image: string
  tech: string[]
  repo?: string
  demo?: string
}

export function ProjectCard(p: Project) {
  return (
    <Card className='bg-white/5 border-white/10 hover:bg-white/[0.06] transition'>
      <CardHeader>
        <CardTitle className='text-base'>{p.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10'>
          <Image
            src={p.image}
            alt='screenshot do projeto'
            fill
            className='object-cover'
          />
        </div>
        <p className='text-sm text-white/70 mt-3'>{p.description}</p>
        <div className='mt-3 flex flex-wrap gap-2'>
          {p.tech.map((t) => (
            <Badge
              key={t}
              variant='secondary'
              className='bg-white/10 border-white/10'
            >
              {t}
            </Badge>
          ))}
        </div>
        <div className='mt-4 flex gap-3'>
          {p.repo && (
            <a
              href={p.repo}
              target='_blank'
              rel='noreferrer'
              className='inline-flex items-center gap-1 text-sm text-white/80 hover:text-white'
            >
              <Github className='h-4 w-4' /> Código
            </a>
          )}
          {p.demo && (
            <a
              href={p.demo}
              target='_blank'
              rel='noreferrer'
              className='inline-flex items-center gap-1 text-sm text-white/80 hover:text-white'
            >
              <ExternalLink className='h-4 w-4' /> Demo
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
