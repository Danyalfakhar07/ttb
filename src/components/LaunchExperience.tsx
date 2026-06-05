"use client";

import { useCallback, useState } from "react";
import { LaunchLoader } from "./LaunchLoader";
import { HeroSection } from "./HeroSection";
import { VideoSection } from "./VideoSection";
import { SurveyExperience } from "./SurveyExperience";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { SmoothScroll } from "./SmoothScroll";

export function LaunchExperience() {
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setShowContent(true), 120);
    setTimeout(() => setHeroReady(true), 700);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {!loaded && <LaunchLoader onComplete={handleLoadComplete} />}

      <SmoothScroll enabled={showContent}>
        <div
          className="transition-opacity duration-1000"
          style={{ opacity: showContent ? 1 : 0 }}
        >
          <SiteHeader
            visible={heroReady}
            onRegister={() => scrollTo("inquiry")}
          />

          <main>
            <HeroSection
              ready={heroReady}
              onWatchFilm={() => scrollTo("film")}
              onRegister={() => scrollTo("inquiry")}
            />
            <VideoSection onContinue={() => scrollTo("inquiry")} />
            <SurveyExperience onReturnOverview={() => scrollTo("overview")} />
          </main>

          <SiteFooter />
        </div>
      </SmoothScroll>
    </>
  );
}
