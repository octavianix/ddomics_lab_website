import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import bgJoin from "@/assets/bg-join.jpg";
import { lab } from "@/lib/lab-data";
import iconGmail from "@/assets/social/gmail.png";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join the Lab — DDOmics Lab, NCCS Pune" },
      {
        name: "description",
        content:
          "Open positions for postdocs, Ph.D. students and MSc project students in microbiome sequencing, metabolomics and anaerobic isolation at NCCS Pune.",
      },
      {
        property: "og:title",
        content: "Join the Lab — DDOmics Lab, NCCS Pune",
      },
      {
        property: "og:description",
        content:
          "Postdoc, Ph.D. and MSc project opportunities in the DDOmics Lab.",
      },
    ],
  }),
  component: JoinPage,
});

// Same "status + how to apply + contact" pattern per track, mirroring the
// reference Join the Lab page's three-accordion layout.
const roles = [
  {
    title: "Postdoctoral Scholars",
    body: `We are not currently advertising a specific postdoctoral opening, but we are always happy to discuss project ideas and help postdocs secure independent fellowships in genomics, metabolomics, computational biology or anaerobic microbiology — including DBT-BioCARe, the SERB National Postdoctoral Fellowship, and DST Women Scientist schemes. Get in touch to discuss potential opportunities at ${lab.email}.`,
  },
  {
    title: "Ph.D. Students",
    body: `Ph.D. admissions run through NCCS's doctoral programme, and most students enter on a CSIR-UGC NET JRF, DBT-JRF or ICMR fellowship. A lack of prior experience in microbiome research shouldn't discourage a genuinely motivated candidate — write in ahead of the interview cycle to discuss fit and current openings at ${lab.academics}.`,
  },
  {
    title: "MSc / Project Students",
    body: `We host a limited number of MSc dissertation and short-term project students each year, spanning wet-lab microbiology, sequencing library preparation and computational microbiome analysis. Write in directly with your CV and preferred timeline at ${lab.email}.`,
  },
];

function JoinPage() {
  return (
    <>
      <PageHero
        image={bgJoin}
        eyebrow="Join the Lab"
        focal="right"
        title={
          <>
            Let's <span className="silver-text">collaborate</span>
          </>
        }
      />

      <div className="mx-auto max-w-4xl px-6 py-14 lg:px-10 lg:py-20">
        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {roles.map((r) => (
              <AccordionItem key={r.title} value={r.title}>
                <AccordionTrigger className="display-title py-6 text-xl no-underline hover:no-underline lg:text-2xl">
                  {r.title}
                </AccordionTrigger>
                <AccordionContent className="pb-8 text-base leading-relaxed text-muted-foreground">
                  {r.body}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:py-32">
          <Reveal>
            <h2 className="display-title text-3xl lg:text-4xl">Write to us</h2>
            <p className="measure mx-auto mt-6 leading-relaxed opacity-60">
              Include a CV, a brief note on what you'd like to work on, and your
              expected start date.
            </p>
            <a
              href={`mailto:${lab.email}`}
              className="eyebrow mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-foreground transition-opacity hover:opacity-80"
            >
              <img src={iconGmail} alt="" className="h-4 w-4 rounded-sm" />
              {lab.email}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
