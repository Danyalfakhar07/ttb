"use client";

import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

const ENVIRONMENTS = [
  {
    title: "Carnivorous Plant Environments",
    body: "Specially designed ecosystems supporting species that thrive in nutrient-poor conditions with carefully controlled humidity and moisture levels.",
    image: "/environments/carnivorous.jpeg",
    focus: "center center",
  },
  {
    title: "Indoor Bonsai Environments",
    body: "Micro-environments developed to support the growth and maintenance of indoor bonsai trees, balancing airflow, humidity, and aesthetic presentation.",
    image: "/environments/bonsai.jpeg",
    focus: "center center",
  },
  {
    title: "Temperate Redwood Bonsai Environments",
    body: "Experimental ecosystems focused on temperate species, including redwood bonsai, designed to replicate natural woodland conditions within a controlled enclosure.",
    image: "/environments/temperate-redwood.jpeg",
    focus: "center center",
  },
  {
    title: "Succulent and Cactus Desert Environments",
    body: "Arid ecosystem designs engineered to support drought-tolerant species through carefully managed drainage, lighting, and low-humidity conditions.",
    image: "/environments/succulent-cactus.jpeg",
    focus: "center center",
  },
] as const;

export function EnvironmentsSection() {
  return (
    <section className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_100%,rgba(255,255,255,0.03),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1200px]">
        <ScrollReveal className="mx-auto max-w-[820px] text-center">
          <p className="type-eyebrow mb-5 text-[11px] text-white/45 md:text-[10px]">Environments</p>
          <h1 className="font-display text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.06] tracking-[-0.03em] text-white">
            Our Environments
          </h1>
          <p className="mx-auto mt-6 max-w-[720px] text-[clamp(1rem,2.1vw,1.12rem)] leading-[1.72] text-white/65">
            Since 2024, our team has been actively researching, testing, and refining a diverse range
            of enclosed plant environments to better understand the unique requirements of different
            species and ecosystems.
          </p>
          <p className="mx-auto mt-5 max-w-[720px] text-[clamp(1rem,2.1vw,1.1rem)] leading-[1.72] text-white/58">
            Our development process has focused on creating stable, sustainable micro-environments that
            support long-term plant health while providing an engaging and educational experience for
            collectors, enthusiasts, and future commercial partners.
          </p>
        </ScrollReveal>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {ENVIRONMENTS.map((env, index) => {
            const reversed = index % 2 === 1;

            return (
              <ScrollReveal key={env.title}>
                <article
                  className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                    reversed ? "md:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a]">
                    <Image
                      src={env.image}
                      alt=""
                      fill
                      className="object-cover"
                      style={{ objectPosition: env.focus }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  </div>

                  <div className={reversed ? "md:pr-4" : "md:pl-4"}>
                    <h2 className="font-display text-[clamp(1.45rem,3.2vw,2rem)] leading-[1.12] tracking-[-0.02em] text-white">
                      {env.title}
                    </h2>
                    <p className="mt-4 text-[clamp(0.98rem,2vw,1.08rem)] leading-[1.7] text-white/66">
                      {env.body}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mx-auto mt-20 max-w-[820px] space-y-6 text-center md:mt-28">
          <p className="text-[clamp(1rem,2.1vw,1.1rem)] leading-[1.72] text-white/62">
            Our ongoing research allows us to continually improve environmental stability, plant
            performance, and long-term sustainability across a wide range of species.
          </p>
          <p className="text-[clamp(1rem,2.1vw,1.1rem)] leading-[1.72] text-white/58">
            These trials form the foundation of our future ecosystem products, educational initiatives,
            and innovative living display concepts.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
