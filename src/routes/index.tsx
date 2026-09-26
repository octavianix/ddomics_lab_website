import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { DomainsMarquee } from "@/components/DomainsMarquee";
import { TeamMarquee } from "@/components/TeamMarquee";
import { ThemesSection } from "@/components/ThemesSection";
import { JoinCta } from "@/components/JoinCta";
import heroBg from "@/assets/microbiome-heads.png";
import logoBmgf from "@/assets/collaborators/bmgf.png";
import logoDst from "@/assets/collaborators/dst.png";
import logoDbt from "@/assets/collaborators/dbt.png";
import logoNccs from "@/assets/collaborators/nccs.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DDOmics Lab — Microbiome Research at NCCS Pune" },
      {
        name: "description",
        content:
          "The DDOmics Lab at NCCS Pune studies microbial communities in human health and disease using classic microbiology, next-generation sequencing and multi-omics integration.",
      },
      {
        property: "og:title",
        content: "DDOmics Lab — Microbiome Research at NCCS Pune",
      },
      {
        property: "og:description",
        content:
          "Mapping the Indian microbiome: gut, oral and skin communities across health, disease and early life.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero — plain image, no overlaid text */}
      <section className="hero-veil relative -mt-24 flex min-h-[32vh] items-center overflow-hidden text-deep-foreground">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="hero-drift pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--deep)_92%)]"
        />
      </section>

      {/* Mission — directly beneath the hero image, no gap */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="relative mx-auto max-w-4xl px-6 pt-16 pb-16 text-center lg:pt-20 lg:pb-20">
          <Reveal delay={120}>
            <h1 className="display-title text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">
              <em>The microbiome is an integral part of</em>
              <br />
              <span className="silver-text">Human Health</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Mission paragraphs — each half-width, alternating sides */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-5xl px-6 pb-16 text-left lg:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
            <div aria-hidden="true" className="hidden md:block" />
            <Reveal delay={200}>
              <p className="text-justify text-[16px] leading-relaxed text-muted-foreground sm:text-[18px] lg:text-[21.7px]">
                Human body harbors microbial cells in 1:1 proportion to human
                cells and these microbes are involved in host activities
                including metabolism, immune modulation and production of
                antimicrobial agents. Imbalance in microbial communities
                associated with the host has been observed in multiple
                diseases as well as metabolic disorders.
              </p>
            </Reveal>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 md:gap-10 lg:mt-20">
            <Reveal delay={280}>
              <p className="text-justify text-[16px] leading-relaxed text-muted-foreground sm:text-[18px] lg:text-[21.7px]">
                In the DDOmics Lab, we study microbial community structure
                and function in human health and diseases using classic
                microbiology techniques, next generation sequencing and
                multi-omics data integration approach. Our areas of focus are
                Microbiome of Indian healthy communities, Microbiome of
                gluten spectrum disorders, Mother and infant microbiome,
                Gut-brain axis, and Surveillance of SARS-CoV-2.
              </p>
            </Reveal>
            <div aria-hidden="true" className="hidden md:block" />
          </div>
        </div>
      </section>

      <ThemesSection />

      {/* Research preview */}
      <section className="bg-surface">
        <div className="py-14 lg:py-20">
          <Reveal className="mx-auto mb-10 max-w-2xl px-6 text-center lg:px-10">
            <h2 className="display-title text-3xl lg:text-[45.13px]">
              Our lab researches in the following domains
            </h2>
          </Reveal>

          <DomainsMarquee />
        </div>
      </section>

      {/* People behind it */}
      <section className="bg-background">
        <div className="py-14 lg:py-20">
          <Reveal className="mx-auto mb-10 max-w-2xl px-6 text-center lg:px-10">
            <h2 className="display-title text-3xl lg:text-[45.13px]">
              The people behind it
            </h2>
          </Reveal>

          <TeamMarquee />

          <Reveal
            delay={100}
            className="mt-10 flex justify-center px-6"
          >
            <Link
              to="/people"
              className="eyebrow sheen inline-flex items-center gap-2 border border-primary px-6 py-3 tracking-[0.12em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Meet the team
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Collaborators & funders */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center lg:px-10 lg:py-20">
          <Reveal>
            <h2 className="display-title text-2xl text-muted-foreground lg:text-3xl">
              Collaborators &amp; Funders
            </h2>
          </Reveal>
          <Reveal
            delay={100}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-16 gap-y-10"
          >
            <img
              src={logoBmgf}
              alt="Bill &amp; Melinda Gates Foundation"
              className="h-24 w-auto object-contain grayscale lg:h-28"
            />
            <img
              src={logoDst}
              alt="Department of Science and Technology, Government of India"
              className="h-24 w-auto object-contain grayscale lg:h-28"
            />
            <img
              src={logoDbt}
              alt="Department of Biotechnology, Government of India"
              className="h-24 w-auto object-contain grayscale lg:h-28"
            />
            <img
              src={logoNccs}
              alt="National Centre for Cell Science"
              className="h-24 w-auto object-contain grayscale lg:h-28"
            />
          </Reveal>
        </div>
      </section>

      <JoinCta />
    </>
  );
}
