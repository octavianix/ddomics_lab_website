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
      <div className="relative mx-auto max-w-4xl px-6 py-16 text-center text-white sm:py-20 lg:py-32">
        <Reveal>
          <h2 className="display-title text-[26px] leading-tight sm:text-[36px] lg:text-[50px]">
            Join the DDOmics Lab
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-6 max-w-3xl text-[16px] leading-relaxed font-semibold sm:mt-8 sm:text-[19px] lg:text-[22px]">
            We're looking for postdocs, Ph.D. students and MSc project
            students to work on the human microbiome with us.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-relaxed text-white/85 sm:mt-5 sm:text-[19px] lg:text-[22px]">
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
