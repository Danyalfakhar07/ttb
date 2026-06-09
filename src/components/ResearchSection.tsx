"use client";

import { ScrollReveal } from "./ScrollReveal";

const SPECIES_TESTED = [
  "Carnivorous plants",
  "Indoor bonsai trees",
  "Temperate redwood bonsai specimens",
  "Succulents and cacti",
  "Tropical and humidity-loving species",
] as const;

const REFINEMENTS = [
  "Reservoir sizing and water retention strategies",
  "Wick placement and moisture distribution",
  "Drainage design and airflow requirements",
  "Soil composition for different species groups",
  "Seasonal care requirements",
  "Environmental stability within enclosed systems",
] as const;

export function ResearchSection() {
  return (
    <section className="relative overflow-hidden px-5 py-24 md:px-10 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.04),transparent_65%)]" />

      <div className="relative mx-auto max-w-[920px]">
        <ScrollReveal>
          <p className="type-eyebrow mb-5 text-[11px] text-white/45 md:text-[10px]">
            Research
          </p>
          <h1 className="font-display text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.06] tracking-[-0.03em] text-white">
            Research &amp; Development
          </h1>
        </ScrollReveal>

        <ScrollReveal className="mt-10 space-y-6 md:mt-14 md:space-y-8">
          <p className="text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.75] text-white/72">
            Since 2023, we have undertaken an extensive programme of research and environmental
            testing to better understand how different plant species interact with enclosed ecosystems
            and self-watering technologies.
          </p>
          <p className="text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.75] text-white/68">
            Our objective has been simple: create environments that support healthier plants while
            reducing maintenance requirements and increasing long-term reliability.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-12 md:mt-16">
          <p className="text-[clamp(1rem,2.1vw,1.1rem)] leading-[1.74] text-white/66">
            Throughout the development process, we have tested a diverse range of species,
            environmental conditions, soil compositions, reservoir capacities, drainage systems, and
            wick placements. These trials have included:
          </p>
          <ul className="mt-6 space-y-3">
            {SPECIES_TESTED.map((item) => (
              <li
                key={item}
                className="text-[clamp(0.98rem,2vw,1.08rem)] leading-[1.65] text-white/62 before:mr-3 before:inline-block before:text-white/30 before:content-['—']"
              >
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal className="mt-12 md:mt-16">
          <p className="text-[clamp(1rem,2.1vw,1.1rem)] leading-[1.74] text-white/64">
            Testing has included controlled variations in watering frequency, soil moisture retention,
            seasonal changes, reservoir sizing, drainage rates, and environmental temperature
            exposure.
          </p>
          <p className="mt-6 text-[clamp(1rem,2.1vw,1.1rem)] leading-[1.74] text-white/62">
            Some experiments intentionally pushed plants beyond optimal conditions to better
            understand failure points and environmental tolerances. These trials included prolonged
            drought simulations, reduced water availability, and exposure to winter temperatures as
            low as -8°C.
          </p>
          <p className="mt-6 text-[clamp(1rem,2.1vw,1.1rem)] leading-[1.74] text-white/58">
            While not every specimen survived these tests, the knowledge gained proved invaluable.
            The data collected helped us refine:
          </p>
          <ul className="mt-6 space-y-3">
            {REFINEMENTS.map((item) => (
              <li
                key={item}
                className="text-[clamp(0.98rem,2vw,1.08rem)] leading-[1.65] text-white/62 before:mr-3 before:inline-block before:text-white/30 before:content-['—']"
              >
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal className="mt-12 space-y-6 border-t border-white/[0.08] pt-12 md:mt-16">
          <p className="text-[clamp(1rem,2.1vw,1.1rem)] leading-[1.74] text-white/64">
            The result is a continuously improving ecosystem platform built upon practical testing,
            observation, and real-world experience rather than theory alone.
          </p>
          <p className="text-[clamp(1rem,2.1vw,1.08rem)] leading-[1.72] text-white/52">
            Research and development remains at the core of our mission as we continue to refine and
            expand our ecosystem designs.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
