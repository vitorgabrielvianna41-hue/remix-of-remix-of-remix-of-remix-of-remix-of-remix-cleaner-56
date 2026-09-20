import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import landingHtml from "../../public/mapa.html?raw";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

const siteImage = (name: string) => `/site-images/${name}`;
const kitMockup = siteImage("plano-premium.png");
const mapa1 = siteImage("preview-gestante-01.png");
const mapa2 = siteImage("preview-gestante-02.png");
const mapa3 = siteImage("preview-gestante-03.png");
const mapa4 = siteImage("preview-gestante-04.png");
const mapa5 = siteImage("preview-gestante-05.png");
const depoimento1 = siteImage("depoimento-conversa-01.png");
const depoimento2 = siteImage("depoimento-conversa-02.png");
const depoimento3 = siteImage("depoimento-conversa-03.png");
const depoimento4 = siteImage("depoimento-conversa-04.png");
const bonus1 = siteImage("bonus-alongamentos.png");
const bonus2 = siteImage("bonus-rotina-semanal.png");
const bonus3 = siteImage("bonus-planner-gestante.png");
const bonus4 = siteImage("bonus-terceiro-trimestre.png");
const bonus5 = siteImage("bonus-fichas-acompanhamento.png");

const mapas = [mapa1, mapa2, mapa3, mapa4, mapa5];
const bonusImgs = [bonus1, bonus2, bonus3, bonus4, bonus5];

const depoimentos: Record<string, { produto: string; avatar: string }> = {
  lucas: { produto: depoimento1, avatar: siteImage("avatar-mulher-1.jpg") },
  rafael: { produto: depoimento2, avatar: siteImage("avatar-mulher-2.jpg") },
  marcos: { produto: depoimento3, avatar: siteImage("avatar-mulher-3.jpg") },
  andre: { produto: depoimento4, avatar: siteImage("avatar-mulher-4.jpg") },
};

const slides = [
  { src: mapa1, alt: "Exercício adaptado de mobilidade de ombros para gestantes" },
  { src: mapa2, alt: "Exercício adaptado de mobilidade de quadril para gestantes" },
  { src: mapa3, alt: "Exercício adaptado de alongamento lateral para gestantes" },
  { src: mapa4, alt: "Exercício adaptado de elevação de calcanhares para gestantes" },
  { src: mapa5, alt: "Exercício adaptado de sentar e levantar da cadeira para gestantes" },
];

function rewriteAssets(html: string) {
  return html
    .replace(/\/assets\/kit_mockup_v2\.webp/g, kitMockup)
    .replace(/\/assets\/plano-premium-upload\.png/g, siteImage("plano-premium.png"))
    .replace(/\/assets\/mapa_preview_(\d)\.webp/g, (_m, n) => mapas[(Number(n) - 1) % mapas.length] ?? mapa1)
    .replace(/\/assets\/bonus_(\d)\.webp/g, (_m, n) => bonusImgs[(Number(n) - 1) % bonusImgs.length] ?? bonus1)
    .replace(/\/assets\/dra_camila_rodrigues\.webp/g, siteImage("dra-camila-rodrigues.png"))
    .replace(
      /\/assets\/depoimento_(\w+)_produto\.webp/g,
      (_m, name: string) => depoimentos[name]?.produto ?? depoimento1,
    )
    .replace(
      /\/assets\/depoimento_(\w+)_avatar\.webp/g,
      (_m, name: string) => depoimentos[name]?.avatar ?? depoimento1,
    )
    .replace(/\/assets\/hero_avatar_(\d)\.webp/g, (_m, idx: string) => {
      const testimonialImages = [depoimento1, depoimento2, depoimento3, depoimento4];
      return testimonialImages[(Number(idx) - 1) % testimonialImages.length] ?? depoimento1;
    });
}


const rawBody = (landingHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? "")
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .trim();

// The dark "preview" section is replaced by the React coverflow carousel.
const previewSection = /<section class="section section--dark">[\s\S]*?<\/section>/i;
const match = rawBody.match(previewSection);
const splitIndex = match ? (match.index ?? 0) : rawBody.length;

const beforeHtml = rewriteAssets(rawBody.slice(0, splitIndex));
const afterHtml = rewriteAssets(rawBody.slice(splitIndex + (match?.[0].length ?? 0)));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "150 Exercícios Adaptados para Gestantes | Gestação em Movimento" },
      {
        name: "description",
        content:
          "Exercícios leves e progressivos para gestantes sedentárias criarem uma rotina de movimento em casa, com orientação profissional.",
      },
      { property: "og:title", content: "150 Exercícios Adaptados para Gestantes" },
      {
        property: "og:description",
        content:
          "Movimentos leves e explicados passo a passo para gestantes começarem em casa com segurança e no próprio ritmo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: "/style.css" },
    ],
  }),
  component: Index,
});

function useLandingScript() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    let cleanup: (() => void) | undefined;

    // Wistia VSL player (custom element <wistia-player> in the hero)
    if (!document.querySelector('script[src*="wistia.com/player.js"]')) {
      const playerScript = document.createElement("script");
      playerScript.src = "https://fast.wistia.com/player.js";
      playerScript.async = true;
      document.head.appendChild(playerScript);
    }
    if (!document.querySelector('script[src*="wistia.com/embed/1pnbax76zm.js"]')) {
      const embedScript = document.createElement("script");
      embedScript.src = "https://fast.wistia.com/embed/1pnbax76zm.js";
      embedScript.type = "module";
      embedScript.async = true;
      document.head.appendChild(embedScript);
    }

    const trackingWindow = window as unknown as { pixelId?: string };
    trackingWindow.pixelId = "6aaeffe7cc1284fd9442334d";

    if (!document.querySelector('script[src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"]')) {
      const pixelScript = document.createElement("script");
      pixelScript.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
      pixelScript.async = true;
      pixelScript.defer = true;
      document.head.appendChild(pixelScript);
    }

    if (!document.querySelector('script[src="https://cdn.utmify.com.br/scripts/utms/latest.js"]')) {
      const utmScript = document.createElement("script");
      utmScript.src = "https://cdn.utmify.com.br/scripts/utms/latest.js";
      utmScript.async = true;
      utmScript.defer = true;
      utmScript.setAttribute("data-utmify-prevent-xcod-sck", "");
      utmScript.setAttribute("data-utmify-prevent-subids", "");
      document.head.appendChild(utmScript);
    }

    const run = () => {
      const init = (window as unknown as { initLanding?: (r: ParentNode) => (() => void) | void })
        .initLanding;
      if (init) cleanup = init(document) || undefined;
    };

    (window as unknown as { __LANDING_MANUAL_INIT__?: boolean }).__LANDING_MANUAL_INIT__ = true;

    if ((window as unknown as { initLanding?: unknown }).initLanding) {
      run();
    } else {
      const script = document.createElement("script");
      script.src = "/script.js";
      script.onload = run;
      document.body.appendChild(script);
    }

    return () => cleanup?.();
  }, []);

  return containerRef;
}

function Index() {
  const containerRef = useLandingScript();

  return (
    <div ref={containerRef}>
      <div dangerouslySetInnerHTML={{ __html: beforeHtml }} />

      <section className="section section--dark">
        <div className="container">
          <span className="section-label">O Material por Dentro</span>
          <h2 className="section-title">
            Veja como o material é por dentro
          </h2>
          <p className="section-subtitle">
            Exercícios organizados por objetivo e fase da gestação para você praticar com mais
            clareza e confiança. Arraste para explorar.
          </p>

          <CoverflowCarousel
            slides={slides}
            showNavigation
            showPagination
            className="text-primary-foreground"
            cardWidth="clamp(240px, 76vw, 320px)"
            cardClassName="bg-card aspect-square"
            label="Prévia dos guias digitais"
          />

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="#value-stack-section" className="btn-cta">
              Quero Garantir Agora
            </a>
          </div>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: afterHtml }} />
    </div>
  );
}
