import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className='mt-8 border-t border-white/10 py-8'>
      <div className='mx-auto max-w-6xl px-4 text-sm text-white/60 flex flex-col md:flex-row items-center justify-between gap-3'>
        <p>{t('copyright', { year: new Date().getFullYear() })}</p>
        <p>{t('madeWith')}</p>
      </div>
      
      <div
        className='mx-auto max-w-6xl px-4 mt-4 h-px opacity-60'
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--brand-1), var(--brand-2), transparent)',
        }}
      />
    </footer>
  )
}
