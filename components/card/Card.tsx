import React, { createContext, useContext } from "react";
 
/**
 * Card component
 *
 * Variants: "default" | "outlined" | "elevated" | "ghost"
 * Sizes:    "sm" | "md" | "lg"
 *
 * Usage:
 *   <Card variant="elevated" size="md">
 *     <Card.Header>
 *       <Card.Title>Title</Card.Title>
 *       <Card.Description>Supporting text</Card.Description>
 *     </Card.Header>
 *     <Card.Content>Body content</Card.Content>
 *     <Card.Footer>Footer actions</Card.Footer>
 *   </Card>
 */
 
export type CardVariant = "default" | "outlined" | "elevated" | "ghost";
export type CardSize = "sm" | "md" | "lg";
 
const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: "bg-secondary border border-primary/15 shadow-sm",
  outlined: "bg-white border-2 border-primary shadow-none",
  elevated: "bg-secondary border border-secondary-dark shadow-lg",
  ghost: "bg-secondary/60 border border-transparent shadow-none",
};
 
const SIZE_CLASSES: Record<CardSize, string> = {
  sm: "rounded-lg p-3 gap-1.5",
  md: "rounded-xl p-5 gap-2.5",
  lg: "rounded-2xl p-7 gap-4",
};
 
const TITLE_SIZE_CLASSES: Record<CardSize, string> = {
  sm: "text-sm font-semibold",
  md: "text-lg font-semibold",
  lg: "text-2xl font-semibold",
};
 
const DESC_SIZE_CLASSES: Record<CardSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};
 
const CONTENT_SIZE_CLASSES: Record<CardSize, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};
 
const CardSizeContext = createContext<CardSize>("md");
 
function cn(...classes: Array<string | false | undefined | null>): string {
  return classes.filter(Boolean).join(" ");
}
 
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
}
 
type CardComponent = React.FC<CardProps> & {
  Header: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Title: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
  Description: React.FC<React.HTMLAttributes<HTMLParagraphElement>>;
  Content: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Footer: React.FC<React.HTMLAttributes<HTMLDivElement>>;
};
 
export const Card: CardComponent = ({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const variantClass = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.default;
  const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;
 
  return (
    <CardSizeContext.Provider value={size}>
      <div
        className={cn(
          "flex flex-col transition-shadow duration-200",
          variantClass,
          sizeClass,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </CardSizeContext.Provider>
  );
};
 
Card.Header = ({ className = "", children, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {children}
    </div>
  );
};
 
Card.Title = ({ className = "", children, ...props }) => {
  const size = useContext(CardSizeContext);
  return (
    <h3
      className={cn(
        TITLE_SIZE_CLASSES[size] ?? TITLE_SIZE_CLASSES.md,
        "text-primary-dark leading-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};
 
Card.Description = ({ className = "", children, ...props }) => {
  const size = useContext(CardSizeContext);
  return (
    <p
      className={cn(
        DESC_SIZE_CLASSES[size] ?? DESC_SIZE_CLASSES.md,
        "text-primary/70 leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};
 
Card.Content = ({ className = "", children, ...props }) => {
  const size = useContext(CardSizeContext);
  return (
    <div
      className={cn(
        CONTENT_SIZE_CLASSES[size] ?? CONTENT_SIZE_CLASSES.md,
        "text-primary-dark/80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
 
Card.Footer = ({ className = "", children, ...props }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 pt-1 border-t border-secondary-dark mt-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
 
export default Card;