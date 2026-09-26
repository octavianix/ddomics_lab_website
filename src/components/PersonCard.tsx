import { Link } from "@tanstack/react-router";
import { ProtectedImage } from "@/components/ProtectedImage";
import type { Person } from "@/lib/lab-data";

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// The single source of truth for a person's photo card — used on both the
// People page and the homepage team section, so both stay pixel-identical.
export function PersonCard({ p }: { p: Person }) {
  const card = (
    <>
      <div className="relative flex aspect-square w-28 items-center justify-center overflow-hidden rounded-full bg-muted ring-1 ring-silver/30 transition-all duration-500 group-hover:ring-primary fluid-overlay sm:w-32 lg:w-36">
        {p.photo ? (
          <ProtectedImage
            src={p.photo}
            alt={p.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <span className="display-title text-3xl text-muted-foreground transition-transform duration-500 group-hover:scale-110">
            {initials(p.name)}
          </span>
        )}
      </div>
      <div>
        <h3 className="display-title text-xl leading-tight">{p.name}</h3>
        <p className="mt-1 font-display text-base font-semibold text-primary">
          {p.role}
        </p>
      </div>
    </>
  );
  const cls =
    "lift-card sheen group flex h-full flex-col items-center gap-5 border border-border bg-card p-5 text-center sm:p-6 lg:p-8";
  const staticCls =
    "flex h-full cursor-default flex-col items-center gap-5 border border-border bg-card p-5 text-center sm:p-6 lg:p-8";
  const viewProfile = (
    <span className="eyebrow text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
      View profile →
    </span>
  );

  if (p.link) {
    return (
      <Link to="/dhiraj-dhotre" className={cls}>
        {card}
        {viewProfile}
      </Link>
    );
  }
  if (p.noProfilePage) {
    return <div className={staticCls}>{card}</div>;
  }
  return (
    <Link to="/people/$personId" params={{ personId: p.slug }} className={cls}>
      {card}
      {viewProfile}
    </Link>
  );
}
