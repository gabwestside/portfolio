'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  images?: string[]
  minDuration?: number // exibe no mínimo X ms
  maxDuration?: number // força sumir mesmo se algo falhar
}

export function TimedSkeletonOverlay({
  images = [],
  minDuration = 900,
  maxDuration = 2500,
}: Props) {
  const [visible, setVisible] = useState(true)

  const preloadPromise = useMemo(() => {
    if (typeof window === 'undefined') return Promise.resolve()

    return Promise.all(
      images.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image()
            img.onload = () => resolve()
            img.onerror = () => resolve()
            img.src = src
          }),
      ),
    ).then(() => undefined)
  }, [images])

  useEffect(() => {
    let killed = false

    const minTime = new Promise<void>((r) => setTimeout(r, minDuration))
    const maxTime = new Promise<void>((r) => setTimeout(r, maxDuration))

    // some quando: (imagens + tempo mínimo) OU estourar maxDuration
    Promise.race([
      Promise.all([preloadPromise, minTime]).then(() => undefined),
      maxTime,
    ]).then(() => {
      if (!killed) setVisible(false)
    })

    return () => {
      killed = true
    }
  }, [preloadPromise, minDuration, maxDuration])

  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-[9999] bg-neutral-950'
      style={{
        backgroundImage:
          'radial-gradient(900px 450px at 50% 15%, rgba(156,39,255,0.26) 0%, transparent 60%),' +
          'radial-gradient(900px 520px at 50% 95%, rgba(116,23,234,0.24) 0%, transparent 60%)',
      }}
    >
      <div className='h-full w-full'>
        {/* Skeleton “igual a página” */}
        <div className='sticky top-0 z-40 border-b border-white/10 bg-black/20 backdrop-blur'>
          <div className='mx-auto max-w-6xl px-4 h-14 flex items-center justify-between'>
            <Skeleton className='h-5 w-28 bg-white/10' />
            <div className='hidden md:flex gap-4'>
              <Skeleton className='h-4 w-16 bg-white/10' />
              <Skeleton className='h-4 w-14 bg-white/10' />
              <Skeleton className='h-4 w-16 bg-white/10' />
            </div>
            <Skeleton className='h-8 w-20 rounded-md bg-white/10' />
          </div>
        </div>

        <section className='pt-20 pb-24'>
          <div className='mx-auto max-w-6xl px-4 grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center'>
            <div className='space-y-5'>
              <Skeleton className='h-10 w-[320px] bg-white/10' />
              <Skeleton className='h-5 w-[220px] bg-white/10' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-[520px] bg-white/10' />
                <Skeleton className='h-4 w-[480px] bg-white/10' />
                <Skeleton className='h-4 w-[420px] bg-white/10' />
              </div>
              <div className='flex gap-3 pt-2'>
                <Skeleton className='h-10 w-32 rounded-md bg-white/10' />
                <Skeleton className='h-10 w-28 rounded-md bg-white/10' />
                <Skeleton className='h-10 w-28 rounded-md bg-white/10' />
              </div>
            </div>
            <div className='justify-self-center'>
              <Skeleton className='h-64 w-64 md:h-72 md:w-72 rounded-full bg-white/10' />
            </div>
          </div>
        </section>

        <section className='py-10 md:py-16'>
          <div className='mx-auto max-w-6xl px-4'>
            <Skeleton className='h-7 w-60 bg-white/10' />
            <Skeleton className='mt-3 h-4 w-96 bg-white/10' />
            <div className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className='rounded-xl border border-white/10 bg-white/5 p-4'
                >
                  <Skeleton className='h-5 w-44 bg-white/10' />
                  <Skeleton className='mt-4 aspect-[16/10] w-full rounded-xl bg-white/10' />
                  <Skeleton className='mt-4 h-4 w-[90%] bg-white/10' />
                  <Skeleton className='mt-2 h-4 w-[75%] bg-white/10' />
                  <div className='mt-4 flex flex-wrap gap-2'>
                    <Skeleton className='h-5 w-14 rounded-full bg-white/10' />
                    <Skeleton className='h-5 w-16 rounded-full bg-white/10' />
                    <Skeleton className='h-5 w-12 rounded-full bg-white/10' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  )
}
