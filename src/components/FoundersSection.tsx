"use client";

import { ScrollReveal } from "./ScrollReveal";

const FOUNDERS = [
  {
    name: "Teayam Tasbihgou",
    role: "Co-Founder | Ecosystem Specialist | Natural Sciences Consultant",
    bio: [
      "Teayam Tasbihgou is a rare plant enthusiast and ecosystem specialist with extensive experience in the development of enclosed living environments. Since 2024, Teayam has led the research, testing, and refinement of a diverse range of controlled ecosystems, including carnivorous plant habitats, indoor bonsai environments, temperate redwood bonsai systems, and arid desert ecosystems for succulents and cacti.",
      "Drawing upon a multidisciplinary background in plant cultivation, arachnology, herpetology, environmental observation, and creative design, Teayam combines scientific knowledge with practical hands-on experience to develop sustainable and visually engaging living ecosystems.",
    ],
    expertise: [
      "Rare and unusual plant cultivation",
      "Enclosed ecosystem design and maintenance",
      "Arachnology and invertebrate husbandry",
      "Herpetology and reptile care",
      "Houseplant care consultation and technical support",
      "Environmental monitoring and habitat development",
      "Artistic design and creative direction",
    ],
    closing:
      "Teayam's commitment to research and innovation continues to drive the development of new ecosystem concepts and cultivation methodologies.",
  },
  {
    name: "Rob Hudson",
    role: "Co-Founder | Designer | Visionary | Inventor",
    bio: [
      "Rob Hudson is the creative force behind the company's long-term vision and product innovation strategy. As a designer, inventor, and problem solver, Rob focuses on transforming complex ideas into practical, scalable solutions that bridge the gap between nature, technology, education, and design.",
      "With a strong emphasis on innovation and user experience, Rob has played a key role in developing the concepts, systems, and products that form the foundation of the company's ecosystem platform.",
    ],
    expertise: [
      "Product innovation and concept development",
      "System design and creative engineering",
      "Strategic planning and business development",
      "Creative problem solving",
      "User-focused design and experience",
      "Vision-led project development",
    ],
    closing: null,
  },
] as const;

export function FoundersSection() {
  return (
    <section className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_50%_0%,rgba(255,255,255,0.035),transparent_68%)]" />

      <div className="relative mx-auto max-w-[980px]">
        <ScrollReveal className="text-center">
          <p className="type-eyebrow mb-5 text-[11px] text-white/45 md:text-[10px]">Leadership</p>
          <h1 className="font-display text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.06] tracking-[-0.03em] text-white">
            Founders
          </h1>
        </ScrollReveal>

        <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
          {FOUNDERS.map((founder) => (
            <ScrollReveal key={founder.name}>
              <article className="border-t border-white/[0.08] pt-10 md:pt-12">
                <h2 className="font-display text-[clamp(1.55rem,3.4vw,2.15rem)] leading-[1.1] tracking-[-0.025em] text-white">
                  {founder.name}
                </h2>
                <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-white/48">
                  {founder.role}
                </p>

                <div className="mt-7 space-y-5">
                  {founder.bio.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-[clamp(1rem,2.1vw,1.1rem)] leading-[1.74] text-white/68"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">
                    Areas of expertise
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {founder.expertise.map((item) => (
                      <li
                        key={item}
                        className="text-[clamp(0.95rem,2vw,1.05rem)] leading-[1.6] text-white/62 before:mr-3 before:inline-block before:text-white/30 before:content-['—']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {founder.closing && (
                  <p className="mt-7 text-[clamp(1rem,2.1vw,1.08rem)] leading-[1.72] text-white/58">
                    {founder.closing}
                  </p>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-16 space-y-6 border-t border-white/[0.08] pt-12 md:mt-20">
          <p className="text-[clamp(1rem,2.1vw,1.1rem)] leading-[1.74] text-white/64">
            Together, the founders share a commitment to creating innovative living ecosystems that
            promote education, sustainability, conservation, and a deeper connection with the natural
            world.
          </p>
          <p className="text-[clamp(0.98rem,2vw,1.06rem)] leading-[1.72] text-white/52">
            Founded in 2024, the company was established to develop innovative enclosed ecosystems
            that combine scientific research, sustainable cultivation, education, and design. Through
            ongoing environmental testing and product development, the founders are building a
            platform capable of supporting a wide range of plant species and ecosystem applications.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
