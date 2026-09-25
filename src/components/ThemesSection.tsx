import { methods } from "@/lib/lab-data";
import { Reveal } from "@/components/Reveal";

// Short card labels, paired by index with `methods` in lab-data.ts.
const LABELS = [
  "Classic Microbiology",
  "Next-Gen Sequencing",
  "Multi-Omics Integration",
];

// No real photos wired in yet — each entry stays a numbered placeholder
// circle until an image is provided. To add one: import it at the top of
// this file and put it in the matching slot here.
const IMAGES: (string | undefined)[] = [undefined, undefined, undefined];

// Circular photo + card for each of the lab's three working methods,
// styled after the reference "Themes in our work" layout: a ~180px round
// portrait overlapping the top edge of its card.
export function ThemesSection() {
  return (
    <section className="border-b border-border bg-ink text-ink-foreground">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <Reveal>
          <h2 className="display-title text-center text-3xl lg:text-[45.13px]">
            Themes in our work
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-16 sm:grid-cols-3 sm:gap-8">
          {methods.map((m, i) => (
            <Reveal
              key={m.title}
              delay={i * 100}
              className="flex flex-col items-center text-center"
            >
              <div className="fluid-overlay relative z-10 -mb-[90px] h-[180px] w-[180px] shrink-0 overflow-hidden rounded-full ring-1 ring-silver/30">
                {IMAGES[i] ? (
                  <img
                    src={IMAGES[i]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <span className="display-title text-3xl text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex w-full flex-1 flex-col border border-border bg-card px-6 pt-24 pb-8">
                <h3 className="display-title text-lg leading-snug uppercase">
                  <span className="bg-primary/15 px-1">{LABELS[i]}</span>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {m.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
