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
  const [headerVisible, setHeaderVisible] = useState(false);
  const [copyReady, setCopyReady] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setHeaderVisible(true), 900);
    setTimeout(() => setCopyReady(true), 1900);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {!loaded && <LaunchLoader onComplete={handleLoadComplete} />}

      {loaded && (
        <SmoothScroll enabled>
          <SiteHeader
            visible={headerVisible}
            onRegister={() => scrollTo("inquiry")}
          />

          <main>
            <HeroSection
              imageReady={loaded}
              copyReady={copyReady}
              onWatchFilm={() => scrollTo("film")}
              onRegister={() => scrollTo("inquiry")}
            />
            <VideoSection onContinue={() => scrollTo("inquiry")} />
            <SurveyExperience onReturnOverview={() => scrollTo("overview")} />
          </main>

          <SiteFooter />
        </SmoothScroll>
      )}
    </>
  );
}
