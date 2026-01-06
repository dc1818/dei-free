type NavItem = { label: string; href: string };

export function NavMenu({
  items = [
    { label: "About", href: "/" },
    { label: "Contact", href: "/companies" },
    { label: "News", href: "/about" },
    { label: "Browse", href: "/contact" },
  ],
  className = "",
}: {
  items?: NavItem[];
  className?: string;
}) {
  return (
    <nav className={className} aria-label="Main navigation">
          <ul className="flex flex-wrap items-stretch gap-4 sm:gap-6">
            {items.map((item) => (
              <li key={item.href} className="w-[calc(50%-0.5rem)] sm:w-auto">
                <a
                  href={item.href}
                  className="
                    inline-flex w-full items-center justify-center
                    rounded-none px-7 py-3.5 text-lg font-bold tracking-wide uppercase
                    text-orange-200 hover:text-orange-100
                    border-2 border-orange-400/60 hover:border-orange-300
                    bg-black/30 hover:bg-orange-500/10
                    backdrop-blur-md
                    hover:shadow-[0_0_32px_rgba(255,106,0,0.40)]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70
                    transition
                  "
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
  );
}
