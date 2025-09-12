import type { Project } from '@/components/project-card'

export const projects: Project[] = [
  {
    slug: 'link-card',
    title: 'Cartão de Visita (Linktree)',
    description: 'Página de links com modal de PIX e integração WhatsApp.',
    image: '/screens/linktree.png',
    tech: ['React', 'Tailwind', 'Lucide'],
    repo: 'https://github.com/seu-usuario/seu-repo',
    demo: 'https://seu-site.com',
  },
  {
    slug: 'wst-money',
    title: 'WST Money',
    description: 'Aplicativo de gerenciamento financeiro com integração ao WhatsApp.',
    image: 'https://github.com/user-attachments/assets/3cff440d-5a88-4b4e-8354-1f62b6f1417a',
    tech: ['Next.js', 'Tailwind', 'shadcn/ui', 'Framer Motion'],
    repo: 'https://github.com/gabwestside/wst-money',
    demo: 'https://wst-money.vercel.app/',
  },
]
