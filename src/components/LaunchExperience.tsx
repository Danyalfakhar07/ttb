"use client";

import { useCallback, useState } from "react";
import { LaunchLoader } from "./LaunchLoader";
import { HeroSection } from "./HeroSection";
import { VideoSection } from "./VideoSection";
import { SurveyExperience } from "./SurveyExperience";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { SmoothScroll } from "./SmoothScroll";

const INTRO_SESSION_KEY = "ttb-home-intro-complete";

function hasSeenIntro(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
}

export function LaunchExperience() {
  const [loaded, setLoaded] = useState(hasSeenIntro);
  const [loaderVisible, setLoaderVisible] = useState(() => !hasSeenIntro());
  const [headerVisible, setHeaderVisible] = useState(hasSeenIntro);
  const [copyReady, setCopyReady] = useState(hasSeenIntro);

  const handleLoadComplete = useCallback(() => {
    sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    setLoaded(true);
    setTimeout(() => setHeaderVisible(true), 1300);
    setTimeout(() => setCopyReady(true), 2600);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {loaderVisible && (
        <LaunchLoader
          onComplete={handleLoadComplete}
          onExitComplete={() => setLoaderVisible(false)}
        />
      )}

      {loaded && (
        <SmoothScroll enabled>
          <SiteHeader
            visible={headerVisible}
            onRegister={() => scrollTo("enquiry")}
          />

          <main>
            <HeroSection
              imageReady={loaded}
              copyReady={copyReady}
              onWatchFilm={() => scrollTo("film")}
              onRegister={() => scrollTo("enquiry")}
            />
            <VideoSection onContinue={() => scrollTo("enquiry")} />
            <SurveyExperience onReturnOverview={() => scrollTo("overview")} />
          </main>

          <SiteFooter />
        </SmoothScroll>
      )}
    </>
  );
}
