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
// Card caps at 424 x 544.88 with 25.437px padding at desktop width
// (matching the reference "Themes in our work" layout); both shrink on
// smaller screens so nothing overflows a narrow viewport. The circle
// overlaps the top of its card, on a solid navy banner.
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
              <div className="fluid-overlay-navy relative z-10 -mb-8 h-[180px] w-[180px] shrink-0 overflow-hidden rounded-full ring-1 ring-white/20 sm:-mb-12 sm:h-[240px] sm:w-[240px] lg:-mb-16 lg:h-[316px] lg:w-[316px]">
                <img
                  src={IMAGES[i]}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex min-h-[380px] w-[424px] max-w-full flex-col bg-card p-5 pt-14 text-foreground sm:min-h-[460px] sm:p-6 sm:pt-20 lg:min-h-[544.88px] lg:p-[25.437px] lg:pt-[89px]">
                <h3 className="display-title my-6 text-[22px] leading-snug uppercase sm:my-8 sm:text-[26px] lg:my-10 lg:text-[30px]">
                  <span className="bg-primary/15 px-1">{LABELS[i]}</span>
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-[18px] lg:mt-5 lg:text-[22px]">
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
