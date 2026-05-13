import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  outline: "btn-outline-cream",
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  showArrow = true,
  onClick,
  type = "button",
}: Props) {
  const inner = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          size={14}
          strokeWidth={1.5}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  const cls = `group ${variantClass[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={cls}>
      {inner}
    </button>
  );
}
