import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import bgJoin from "@/assets/bg-join.jpg";

// Full-bleed "Join the Lab" banner. Dimensions/type scale match the
// reference layout: 50px heading, 22px bold intro line, 22px body line
// (20px margin-top), light rectangular CTA button.
export function JoinCta() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <img
        src={bgJoin}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#13233E]/75" />
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center text-white lg:py-32">
        <Reveal>
          <h2 className="display-title text-[32px] leading-tight lg:text-[50px]">
            Join the DDOmics Lab
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-8 max-w-3xl text-[22px] leading-relaxed font-semibold">
            We're looking for postdocs, Ph.D. students and MSc project
            students to work on the human microbiome with us.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-5 max-w-3xl text-[22px] leading-relaxed text-white/85">
            If you're motivated by questions in microbiome genomics,
            metabolomics or computational biology, we'd like to hear from
            you.
          </p>
        </Reveal>
        <Reveal delay={300} className="mt-10 flex justify-center">
          <Link
            to="/join"
            className="bg-[#F5FAFD] px-8 py-4 text-sm font-bold tracking-[0.08em] text-[#13233E] uppercase shadow-lg transition-transform hover:scale-[1.02]"
          >
            Join the DDOmics Lab
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
