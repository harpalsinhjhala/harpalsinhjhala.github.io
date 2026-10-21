import { preload } from "react-dom";
import { profile } from "@/content/site";
import { Picture } from "@/components/ui/Picture";

export function PhotoCard() {
  const img = profile.heroImage;
  const widths = [480, 600, 800];
  const sizes = "(min-width: 1024px) 380px, (min-width: 640px) 340px, 300px";
  // The photo is the LCP element on phones, so start fetching it with the HTML.
  preload(`${img.src}-600.avif`, {
    as: "image",
    type: "image/avif",
    fetchPriority: "high",
    imageSrcSet: widths.map((w) => `${img.src}-${w}.avif ${w}w`).join(", "),
    imageSizes: sizes,
  });
  return (
    <figure className="panel relative overflow-hidden p-2">
      <div className="flex items-center justify-between px-2 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
        <span className="flex items-center gap-2">
          <span className="pulse-dot size-1.5 rounded-full bg-pos" aria-hidden />
          <span className="text-muted">online</span>
        </span>
        <span>analyst_01</span>
      </div>
      <div className="relative overflow-hidden rounded-[10px]">
        <Picture
          base={img.src}
          widths={widths}
          alt={img.alt}
          width={800}
          height={1000}
          sizes={sizes}
          priority
          imgClassName="block aspect-[4/5] w-full object-cover saturate-[0.85] contrast-[1.03]"
        />
        {/* Soft vignette plus a faint amber wash so the photo sits in the palette. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 30%, transparent 55%, rgb(10 14 20 / 0.5) 100%), linear-gradient(180deg, transparent 62%, rgb(10 14 20 / 0.45) 100%)",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-accent opacity-[0.07] mix-blend-color" />
      </div>
      <figcaption className="grid grid-cols-2 px-2 pb-1 pt-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
        <span>
          role
          <span className="block pt-0.5 text-[11px] normal-case tracking-normal text-fg">{profile.jobTitle}</span>
        </span>
        <span className="text-right">
          base
          <span className="block pt-0.5 text-[11px] normal-case tracking-normal text-fg">Ahmedabad, IN</span>
        </span>
      </figcaption>
    </figure>
  );
}
