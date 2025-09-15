# Gabwestside • Portfólio (Next.js + Tailwind + shadcn/ui)

Um portfólio moderno, orgânico e responsivo com efeitos de scroll, cards de projetos e carregamento com **relâmpago** (loader) na abertura. O objetivo é apresentar seus trabalhos e facilitar contato de forma elegante e rápida.

> **Stack**: Next.js (App Router) · TypeScript · TailwindCSS · shadcn/ui · Framer Motion · lucide-react

---

## 📸 Preview

<img width="1893" height="940" alt="image" src="https://github.com/user-attachments/assets/20a941b7-b317-41b1-986f-778d6f347851" />

---

## ✨ Recursos

* **Hero** com parallax/scroll sutil e fundo orgânico (gradientes/blobs)
* **Navbar** responsiva com **Sheet** (menu lateral no mobile)
* **Barra de progresso** de scroll no topo
* **Seção de Projetos** com card (shadcn `Card`, `Badge`)
* **Seção Sobre** e **Contato** (Email/WhatsApp)
* **Loader** de abertura com **relâmpago atingindo “GABWESTSIDE”** (glow borrado e flash)
* Suporte a **favicon** (raio em gradiente roxo) e imagens remotas
* Estrutura clara para adicionar/editar projetos em `lib/projects.ts`

---

## 📦 Requisitos

* Node.js 18+ (LTS)
* pnpm **ou** npm/yarn (exemplos abaixo com **pnpm**)

---

## 🚀 Início Rápido

Crie o app com o template Next.js + Tailwind + TS:

```bash
pnpm create next-app gabwest-portfolio --ts --eslint --app --src-dir --tailwind
cd gabwest-portfolio
```

Instale dependências adicionais:

```bash
pnpm add framer-motion lucide-react
pnpm add -D tailwindcss-animate
```

Instale e gere componentes **shadcn/ui**:

```bash
pnpm dlx shadcn-ui@latest init
pnpm dlx shadcn-ui@latest add button card badge sheet
```

> Dica: caso prefira **npm**: troque `pnpm` por `npm` e `pnpm dlx` por `npx`.

---

## 🧱 Estrutura principal

Os arquivos/chaves usados aqui (conforme o scaffold deste repo):

```
app/
  layout.tsx            # Layout raiz (ScrollProgress + LightningLoader)
  page.tsx              # Página principal (Hero, Projects, About, Contact, Footer)
  globals.css           # Tailwind + fundo orgânico
components/
  navbar.tsx            # Topo com Sheet (mobile)
  hero.tsx              # Hero com framer-motion
  sections-projects.tsx # Seção de projetos
  sections-about.tsx    # Seção sobre
  sections-contact.tsx  # Seção de contato (email/whatsapp)
  footer.tsx
  scroll-progress.tsx   # Barra de progresso de scroll
  lightning-loader.tsx  # Loader com relâmpago (overlay)
components/ui/          # (gerado pelo shadcn/ui: button, card, badge, sheet...)
lib/
  projects.ts           # Lista de projetos (edite aqui)
public/
  profile-photo.png     # Sua foto
  screens/              # Thumbs de projetos (ex.: /screens/portfolio.png)
  favicon_lightning.ico # Favicon (raio) – opcional
next.config.ts          # Domínios liberados para next/image
tailwind.config.ts      # Tailwind + tokens de cor
```

---

## ⚙️ Configurações importantes

### `tailwind.config.ts` (trecho sugerido)

```ts
import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#7417EA",
          600: "#5A12B6",
          700: "#4B0F98",
        },
      },
      boxShadow: { soft: "0 10px 30px -10px rgba(0,0,0,0.35)" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

### `next.config.ts` (imagens remotas)

```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};
export default nextConfig;
```

---

## 🖼️ Imagens e Assets (produção)

Você pode usar **`public/`** (caminhos absolutos como `/profile-photo.png`) **ou** importar de `src` para o bundler copiar.

* `public/` → referencia com `/arquivo.png`.
* `src/assets` → importe no componente: `import heroImg from "@/assets/hero.png";`

> Em Vercel/Unix os nomes são **case‑sensitive** e a **extensão** precisa bater (`.png` vs `.jpg`).

---

## 🧩 Integrando o Loader (relâmpago)

O componente `components/lightning-loader.tsx` cria um overlay **full screen** com um raio atingindo o título **GABWESTSIDE** e um **glow borrado**. Ele também **pré‑carrega** imagens para evitar piscadas no primeiro paint.

No `app/layout.tsx`:

```tsx
import LightningLoader from "@/components/lightning-loader";
import { projects } from "@/lib/projects";

const imagesToPreload = [
  "/profile-photo.png",
  ...projects.map(p => p.image),
];

<body>
  <LightningLoader images={imagesToPreload} minDuration={1200} />
  {/* resto */}
</body>
```

* `images`: lista de URLs (use `/public` ou remotas)
* `minDuration`: tempo mínimo de exibição (ms)

---

## 📚 Adicionando Projetos

Edite `lib/projects.ts`:

```ts
export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;  // /screens/nome.png (em public/) ou URL remota
  tech: string[];
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "link-card",
    title: "Cartão de Visita (Linktree)",
    description: "Página de links com modal de PIX e WhatsApp.",
    image: "/screens/linktree.png",
    tech: ["React", "Tailwind", "Lucide"],
    repo: "https://github.com/usuario/repo",
    demo: "https://seu-site.com",
  },
];
```

---

## 🧪 Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

Executar local:

```bash
pnpm dev
```

Build local e pré-visualização:

```bash
pnpm build && pnpm start
```

---

## 🌐 Deploy (Vercel)

1. `pnpm build` sem erros
2. Suba o repo para GitHub/GitLab/Bitbucket
3. Importe na Vercel → Framework **Next.js**
4. **Build Command**: `next build` · **Output**: `.next`

**Checklist**

* [ ] Imagens em `public/` quando usar path absoluto
* [ ] Extensão e capitalização corretas
* [ ] Domínios remotos liberados em `next.config.ts`
* [ ] Favicon em `public/` (`/favicon_lightning.ico`) e declarado no `metadata.icons`

---

## 🎨 Personalização

* **Cores**: ajuste `brand` no `tailwind.config.ts` e gradientes em `app/globals.css`
* **Hero/Texto**: edite `components/hero.tsx`
* **Contato**: links e mensagens em `sections-contact.tsx`
* **Navbar**: links em `components/navbar.tsx`
* **Loader**: duração/flash/cores em `components/lightning-loader.tsx`
* **Tema claro/escuro**: adicione `next-themes` e tokens do shadcn

---

## 🛠️ Troubleshooting

* **Imagem 404 em produção**: use `public/` com `/arquivo.png` **ou** importe de `src`. Verifique extensão e case.
* **Imagem remota não carrega**: inclua o domínio em `next.config.ts` → `images.remotePatterns`.
* **Flash de conteúdo**: inclua as principais imagens no `images` do `LightningLoader` e use `next/image`.

---

## 🔍 Acessibilidade & SEO

* Componentes com foco/contraste apropriados
* `alt` em imagens (`next/image`)
* Meta `metadata` em `app/layout.tsx`
* (Opcional) OG image em `/public/og.png`

---

## 📄 Licença

MIT © Gabwestside

---

## 🙌 Créditos

* Ícones: **lucide-react**
* UI: **shadcn/ui**
* Animações: **Framer Motion**
* Build: **Next.js** + **Tailwind**
