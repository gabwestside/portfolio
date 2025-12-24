import type { Project } from '@/components/project-card'

type ProjectTranslation = {
  slug: string
  title: string
  description: string
}

export function getProjects(projectList: ProjectTranslation[]): Project[] {
  const projectsData: Record<string, Omit<Project, 'title' | 'description' | 'slug'>> = {
    'wst-money': {
      image: '/wst-money.png',
      tech: ['Next.js', 'Tailwind', 'Shadcn/ui', 'Supabase', 'Intl'],
      repo: 'https://github.com/gabwestside/wst-money',
      demo: 'https://wst-money.vercel.app/',
    },
    'habit-tracker': {
      image: '/habits.png',
      tech: ['React Native', 'Tailwind', 'Node JS', 'Prisma', 'Postgrees'],
      repo: 'https://github.com/gabwestside/wst-setup',
      demo: 'https://wstside-habits.vercel.app/',
    },
    'gym-tracker': {
      image: '/gym-tracker.png',
      tech: ['Next.js', 'Tailwind', 'Shadcn/ui', 'Supabase', 'Intl'],
      repo: 'https://github.com/gabwestside/gym-tracker',
      demo: 'https://wstside-gym.vercel.app/',
    },
    'link-card': {
      image: '/linktree.png',
      tech: ['React', 'Tailwind', 'Lucide'],
      repo: 'https://github.com/gabwestside/wst-linktree',
      demo: 'https://wst-linktree.vercel.app/',
    },
    'lucky-numbers': {
      image: '/lucky-generator.png',
      tech: ['React', 'Vite', 'C#', 'Tailwind'],
      repo: 'https://github.com/gabwestside/lucky-generator',
      demo: 'https://lucky-generator-two.vercel.app/',
    },
    // 'love-days': {
    //   image: '/love-days.png',
    //   tech: ['React', 'Vite', 'Tailwind'],
    //   repo: 'https://github.com/gabwestside/wst-love-counter',
    //   demo: 'https://happylovedays.vercel.app/',
    // },
    'contra-hpv': {
      image: '/contra-hpv.png',
      tech: ['React', 'Vite', 'Tailwind', 'Node'],
      repo: 'https://github.com/gabwestside/contra-hpv',
      demo: 'https://contra-hpv.vercel.app',
    },
  }

  return projectList.map((p) => ({
    ...p,
    ...projectsData[p.slug],
  }))
}
