import { createFileRoute, Link } from "@tanstack/react-router";
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

// `status` is the bold lead statement (matches the reference's <strong>
// lead paragraph); `details` is the regular-weight follow-up.
const roles = [
  {
    title: "Postdoctoral Scholars",
    status:
      "We are not currently advertising a specific postdoctoral opening; applications are considered on a rolling basis as funding allows.",
    details: `We are always interested in discussing project ideas and helping postdocs secure independent fellowships in genomics, metabolomics, computational biology or anaerobic microbiology — including DBT-BioCARe, the SERB National Postdoctoral Fellowship, and DST Women Scientist schemes. Get in touch to discuss potential opportunities at ${lab.email}.`,
  },
  {
    title: "Ph.D. Students",
    status:
      "We are not currently recruiting outside the regular NCCS admission cycle — but motivated students should still get in touch.",
    details: `Ph.D. admissions run through NCCS's doctoral programme, and most students enter on a CSIR-UGC NET JRF, DBT-JRF or ICMR fellowship. A lack of prior experience in microbiome research shouldn't discourage a genuinely motivated candidate — write in ahead of the interview cycle to discuss fit and current openings at ${lab.academics}.`,
  },
  {
    title: "MSc / Project Students",
    status:
      "We host a limited number of MSc dissertation and short-term project students each year.",
    details:
      "Projects span wet-lab microbiology, sequencing library preparation and computational microbiome analysis. Write in directly with your CV and preferred timeline.",
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
          <Accordion
            type="single"
            collapsible
            defaultValue={roles[0]!.title}
            className="w-full"
          >
            {roles.map((r) => (
              <AccordionItem key={r.title} value={r.title}>
                <AccordionTrigger className="display-title my-6 py-0 text-[20px] leading-snug uppercase no-underline hover:no-underline hover:text-primary data-[state=open]:text-primary sm:my-8 sm:text-[24px] lg:my-10 lg:text-[30px]">
                  {r.title}
                </AccordionTrigger>
                <AccordionContent className="pb-8 text-[16px] leading-relaxed text-muted-foreground sm:text-[18px] lg:pb-10 lg:text-[22px]">
                  <p className="mt-4 font-bold text-foreground lg:mt-5">
                    {r.status}
                  </p>
                  <p className="mt-4 lg:mt-5">{r.details}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>

      {/* Ready to apply? */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-6 pb-20 text-center lg:pb-28">
          <Reveal>
            <h2 className="display-title text-[32px] leading-tight sm:text-[40px] lg:text-[50px]">
              Ready to apply?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground sm:text-[18px] lg:mt-5 lg:text-[22px]">
              We're especially interested in mentees developing their own
              independent project ideas. Explore our research program first,
              then feel free to propose the direction of highest interest to
              you.
            </p>
            <Link
              to="/research"
              className="mt-8 inline-block bg-[#F5FAFD] px-[20px] py-[20px] text-[20px] font-bold tracking-[0.04em] text-[#13233E] uppercase shadow-lg transition-opacity hover:opacity-90"
            >
              Explore our research program
            </Link>
          </Reveal>
        </div>
      </section>

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
