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
    slug: 'portfolio-next',
    title: 'Portfólio Next.js',
    description: 'Template deste site com shadcn/ui e efeitos de scroll.',
    image: '/screens/portfolio.png',
    tech: ['Next.js', 'Tailwind', 'shadcn/ui', 'Framer Motion'],
  },
]
