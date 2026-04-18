import Link from "next/link";

export default function LinkExterno({ children, href }) {
  return (
    <Link 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}