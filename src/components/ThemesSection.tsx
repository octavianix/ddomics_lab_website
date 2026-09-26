import { methods } from "@/lib/lab-data";
import { Reveal } from "@/components/Reveal";
import themeCultureIsolation from "@/assets/themes/theme-culture-isolation.jpg";
import themePopulationGenomics from "@/assets/themes/theme-population-genomics.png";
import themeMultiomicsDisease from "@/assets/themes/theme-multiomics-disease.jpg";

// Short card labels, paired by index with `methods` in lab-data.ts.
const LABELS = ["Culture & Isolation", "Population Genomics", "Multi-Omics & Disease"];

// Theme circle photos, supplied directly for these three themes.
const IMAGES = [
  themeCultureIsolation,
  themePopulationGenomics,
  themeMultiomicsDisease,
];

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
                <img
                  src={IMAGES[i]}
                  alt=""
                  className="h-full w-full object-cover"
                />
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
