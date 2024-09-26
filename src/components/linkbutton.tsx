import Link from "next/link";

interface LinkButtonProps {
  href?: string;
  className?: string;
  title?: string;
  ariaLabel?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Linkbutton({
  href,
  className = "",
  title = "",
  ariaLabel = "",
  disabled = false,
  children
}: LinkButtonProps) {
  return (
    <>
      {disabled ? (
        <span
          className={`group inline-block ${className}`}
          title={title}
          aria-disabled={disabled}
        >
          {children}
        </span>
      ) : (
        <Link
          href={href}
          className={`group inline-block hover:text-skin-accent ${className}`}
          aria-label={ariaLabel}
          title={title}
        >
          {children}
        </Link>
      )}
    </>
  );
}
