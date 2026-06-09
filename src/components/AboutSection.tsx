"use client";

import { ScrollReveal } from "./ScrollReveal";

export function AboutSection() {
  return (
    <section className="relative overflow-hidden px-5 py-24 md:px-10 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.04),transparent_65%)]" />

      <div className="relative mx-auto max-w-[920px]">
        <ScrollReveal>
          <p className="type-eyebrow mb-5 text-[11px] text-white/45 md:text-[10px]">About Us</p>
          <h1 className="font-display text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.06] tracking-[-0.03em] text-white">
            Building the Future of Living Ecosystems
          </h1>
        </ScrollReveal>

        <ScrollReveal className="mt-10 space-y-6 md:mt-14 md:space-y-8">
          <p className="text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.75] text-white/72">
            We are dedicated to developing innovative enclosed ecosystems that combine science,
            design, sustainability, and education. Through extensive research and hands-on testing
            since 2024, our mission has been to create environments that support healthy plant growth
            while inspiring curiosity about the natural world.
          </p>
          <p className="text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.75] text-white/68">
            Our work spans a diverse range of ecosystem types, including carnivorous plant habitats,
            indoor bonsai environments, temperate redwood bonsai systems, and arid desert ecosystems
            for succulents and cacti. Each project contributes valuable data and experience that drives
            the continuous improvement of our designs and cultivation methods.
          </p>
          <p className="text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.75] text-white/64">
            By combining scientific understanding with creative design, we aim to develop products and
            experiences that appeal to collectors, educators, investors, and plant enthusiasts alike.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
