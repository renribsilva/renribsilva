import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  href?: string;
  ariaLabel?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Linkbutton({
  href,
  ariaLabel = "",
  disabled = false,
  children
}: LinkButtonProps) {
  return (
    <div>
      {disabled ? (
        <span aria-disabled={disabled} >{children}</span>
      ) : (
        <Link href={href} aria-label={ariaLabel} >{children}</Link>
      )}
    </div>
  );
}
