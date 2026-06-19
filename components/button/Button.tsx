import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants = {
  primary: "bg-primary text-white hover:opacity-90",
  secondary: "bg-secondary text-white hover:opacity-90",
  outline:
    "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white",
  ghost:
    "border-0 text-primary",
    accent:
    "bg-ghost text-white hover:opacity-90",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`font-medium transition-all duration-200 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}