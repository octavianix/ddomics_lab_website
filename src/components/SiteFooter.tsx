import { Link } from "@tanstack/react-router";
import { Github, Twitter } from "lucide-react";
import { lab, navLinks } from "@/lib/lab-data";
import iconGmail from "@/assets/social/gmail.png";

export function SiteFooter() {
  return (
    <footer className="bg-[#0d1321] text-white/60">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:gap-24">
            <div>
              <p className="display-title mb-5 text-[28.376px] font-bold text-primary">
                Contact
              </p>
              <p className="text-[21.6752px] leading-relaxed font-bold text-white">
                Dr. Dhiraj S. Dhotre, Scientist 'E'
              </p>
              <p className="mt-5 text-[21.6752px] leading-relaxed">
                Lab 3, Old Building
              </p>
              <p className="mt-5 text-[21.6752px] leading-relaxed">
                NCCS, SPPU Campus
              </p>
              <p className="mt-5 text-[21.6752px] leading-relaxed">
                Pune 411007
              </p>
              <p className="mt-5 text-[21.6752px] leading-relaxed">
                <a
                  href={`mailto:${lab.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <img
                    src={iconGmail}
                    alt=""
                    className="h-5 w-5 rounded-sm"
                  />
                  {lab.email}
                </a>
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="display-title mb-5 text-[28.376px] font-bold text-primary">
                Quick Links
              </p>
              <div className="flex items-start justify-between gap-16">
                <ul className="space-y-5 text-[21.6752px]">
                  {navLinks.slice(0, 3).map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="underline underline-offset-4 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-5 text-[21.6752px]">
                  {navLinks.slice(3).map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="underline underline-offset-4 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/join"
                      className="underline underline-offset-4 transition-colors hover:text-white"
                    >
                      Join the Lab
                    </Link>
                  </li>
                </ul>
                <a
                  href={lab.twitter}
                  aria-label="@DDOmicsLab on Twitter/X"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0d1321] transition-opacity hover:opacity-80"
                >
                  <Twitter className="h-5 w-5" fill="currentColor" />
                </a>
              </div>
            </div>
          </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <p className="display-title mb-5 text-[28.376px] font-bold text-primary">
            Funded By
          </p>
          <ul className="space-y-3 text-[21.6752px] leading-relaxed">
            <li>Department of Biotechnology</li>
            <li>Department of Science &amp; Technology</li>
            <li>Science &amp; Engineering Research Board, New Delhi</li>
          </ul>
        </div>

        <hr className="my-10 border-primary/60" />

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="font-mono text-[12px] opacity-50">
            © {new Date().getFullYear()} {lab.name}, NCCS Pune. All rights
            reserved.
          </p>
          <a
            href="https://github.com/octavianix"
            target="_blank"
            rel="noreferrer"
            className="sheen inline-flex items-center gap-2 border border-white/20 px-3 py-1.5 font-mono text-[12px] opacity-80 transition-all hover:border-white/40 hover:opacity-100"
          >
            <Github className="h-3 w-3" strokeWidth={1.75} />
            Site built by Suyash Jadhav
          </a>
        </div>
      </div>
    </footer>
  );
}
