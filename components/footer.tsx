export function Footer() {
  return (
    <footer className='border-t border-white/10 py-8 mt-8'>
      <div className='mx-auto max-w-6xl px-4 text-sm text-white/60 flex flex-col md:flex-row items-center justify-between gap-3'>
        <p>
          © {new Date().getFullYear()} Gabwestside. Todos os direitos
          reservados.
        </p>
        <p>Feito com 💟 por Gabriel R. Moura.</p>
      </div>
    </footer>
  )
}
