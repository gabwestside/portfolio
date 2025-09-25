'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ExternalLink, Github, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export type Project = {
  slug: string
  title: string
  description: string
  image: string
  tech: string[]
  repo?: string
  demo?: string
  longDescription?: string
}

export function ProjectCard(p: Project) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type='button'
          className='text-left'
          aria-label={`Abrir detalhes do projeto ${p.title}`}
        >
          <Card className='bg-white/5 border-white/10 hover:bg-white/[0.06] transition group overflow-hidden'>
            <CardHeader>
              <CardTitle className='text-base text-zinc-200 flex items-center justify-between'>
                <span>{p.title}</span>
                <span className='text-[11px] font-medium text-white/50 opacity-0 group-hover:opacity-100 transition'>
                  Clique para ver detalhes
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10'>
                <Image
                  src={p.image}
                  alt={`screenshot do projeto ${p.title}`}
                  fill
                  className='object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                  sizes='(max-width: 768px) 100vw, 33vw'
                  priority={false}
                />
                {/* overlay sutil ao hover */}
                <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition' />
              </div>
              <p className='text-sm text-white/70 mt-3 line-clamp-3'>
                {p.description}
              </p>
              <div className='mt-3 flex flex-wrap gap-2'>
                {p.tech.map((t) => (
                  <Badge
                    key={t}
                    variant='secondary'
                    className='bg-white/10 border-white/10 text-zinc-300'
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </button>
      </DialogTrigger>

      <DialogContent className='max-w-3xl bg-neutral-950 border-white/10 p-0 overflow-hidden'>
        <DialogHeader className='px-5 pt-5'>
          <DialogTitle className='text-xl text-zinc-100'>{p.title}</DialogTitle>
          <DialogDescription className='text-sm text-zinc-400'>
            {p.longDescription ?? p.description}
          </DialogDescription>
        </DialogHeader>

        <div className='relative mt-4 aspect-[16/9] w-full overflow-hidden'>
          <Image
            src={p.image}
            alt={`screenshot do projeto ${p.title}`}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 60vw'
            priority
          />

          <div className='absolute inset-0 ring-1 ring-white/10 rounded-none' />
        </div>

        <div className='px-5 py-4'>
          <div className='flex flex-wrap gap-2'>
            {p.tech.map((t) => (
              <Badge
                key={t}
                variant='secondary'
                className='bg-white/10 border-white/10 text-zinc-300'
              >
                {t}
              </Badge>
            ))}
          </div>

          <p className='mt-4 text-sm text-zinc-300 leading-relaxed'>
            {p.longDescription ?? p.description}
          </p>

          <div className='mt-6 flex flex-wrap gap-3'>
            {p.demo && (
              <Button asChild className='bg-brand-500 hover:bg-brand-600'>
                <a href={p.demo} target='_blank' rel='noreferrer'>
                  <ExternalLink className='mr-2 h-4 w-4' />
                  Abrir site
                </a>
              </Button>
            )}
            {p.repo && (
              <Button
                asChild
                variant='secondary'
                className='bg-white/10 border-white/10 text-sm text-white/80 hover:text-zinc-800'
              >
                <a href={p.repo} target='_blank' rel='noreferrer'>
                  <Github className='mr-2 h-4 w-4' />
                  Ver código
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
