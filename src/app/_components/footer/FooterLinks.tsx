interface FooterLinksProps {
  heading: string;
  links: string[];
}

export default function FooterLinks({
  heading,
  links,
}: FooterLinksProps) {
  return (
    <nav aria-label={`${heading} links`}>
      <h4 className="mb-4 text-sm font-semibold text-white">
        {heading}
      </h4>

      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="flex min-h-10 items-center rounded-md py-2 text-sm text-slate-400 transition-colors duration-200 hover:text-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}