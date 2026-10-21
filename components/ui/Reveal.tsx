// Fade-up on scroll, driven by a CSS scroll timeline (see .reveal in globals.css). No JavaScript;
// browsers without scroll-driven animations, and reduced-motion users, simply see the content.
export function Reveal({
  children,
  className = "",
  as: Comp = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return <Comp className={`reveal ${className}`}>{children}</Comp>;
}
