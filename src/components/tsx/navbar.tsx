import Link from "next/link";

const navItems: { label: string; page?: string }[] = [
  { label: "início", page: "/" }, 
  { label: "textos", page: "/textos" }, 
  { label: "arquivo", page: "/arquivo" },
  { label: "projetos", page: "/projetos" },
  { label: "sobre", page: "/sobre" },
];

export default function Navbar () {
  return (
    <ul>
      {navItems.map(({ label, page }) => (
        <li key={label}>
          <Link href={page} >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}