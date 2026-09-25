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

// Circular photo + card for each of the lab's three working methods.
// Card is fixed at 424 x 544.88 with 25.437px padding on every side,
// matching the reference "Themes in our work" layout; the 316px round
// portrait overlaps the top of the card, on a solid navy banner.
export function ThemesSection() {
  return (
    <section className="border-b border-border bg-[#13233E] text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:py-20">
        <Reveal>
          <h2 className="display-title text-center text-[32px] lg:text-[50px]">
            Themes in our work:
          </h2>
        </Reveal>

        <div className="mt-20 flex flex-wrap justify-center gap-8">
          {methods.map((m, i) => (
            <Reveal
              key={m.title}
              delay={i * 100}
              className="flex w-[424px] max-w-full flex-col items-center text-center"
            >
              <div className="fluid-overlay-navy relative z-10 -mb-16 h-[316px] w-[316px] shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
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
              <div className="flex h-[544.88px] w-[424px] max-w-full flex-col bg-card p-[25.437px] pt-[89px] text-foreground">
                <h3 className="display-title my-10 text-[30px] leading-snug uppercase">
                  <span className="bg-primary/15 px-1">{LABELS[i]}</span>
                </h3>
                <p className="mt-5 text-[22px] leading-relaxed text-muted-foreground">
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
