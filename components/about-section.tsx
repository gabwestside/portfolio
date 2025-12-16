import { useTranslations } from 'next-intl'

export function AboutSection() {
  const t = useTranslations('About')
  return (
    <section id='about' className='scroll-mt-24 py-10 md:py-16'>
      <div className='mx-auto max-w-4xl px-4'>
        <h2 className='text-2xl md:text-3xl font-semibold'>{t('title')}</h2>
        <p className='text-white/80 mt-4 leading-relaxed'>{t('description')}</p>
      </div>
    </section>
  )
}
