import { Button } from '@/components/ui/button'
import { Mail, MessageCircle } from 'lucide-react'

export function ContactSection() {
  return (
    <section id='contact' className='scroll-mt-24 py-10 md:py-16'>
      <div className='mx-auto max-w-4xl px-4 text-center'>
        <h2 className='text-2xl md:text-3xl font-semibold'>Contato</h2>
        <p className='text-white/80 mt-3'>
          Aberto a novas oportunidades e parcerias.
        </p>
        <div className='mt-6 flex justify-center gap-3'>
          <Button asChild className='bg-brand-500 hover:bg-brand-600'>
            <a href='mailto:gabrielnfl13@gmail.com'>
              <Mail className='mr-2 h-4 w-4' />
              E‑mail
            </a>
          </Button>
          <Button
            asChild
            variant='secondary'
            className='bg-white/10 border-white/10 text-zinc-200 hover:text-zinc-800'
          >
            <a
              href='https://wa.me/5585992729746?text=Ol%C3%A1!%20Vim%20pelo%20seu%20portf%C3%B3lio.'
              target='_blank'
              rel='noreferrer'
            >
              <MessageCircle className='mr-2 h-4 w-4' />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
