import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import landingHtml from "../../public/mapa.html?raw";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import mockupAsset from "@/assets/mockup-pack-trinca-ferro.png.asset.json";
import mapa1Asset from "@/assets/preview-gestante-01.png.asset.json";
import mapa2Asset from "@/assets/preview-gestante-02.png.asset.json";
import mapa3Asset from "@/assets/preview-gestante-03.png.asset.json";
import mapa4Asset from "@/assets/preview-gestante-04.png.asset.json";
import mapa5Asset from "@/assets/preview-gestante-05.png.asset.json";
import depoimento1Asset from "@/assets/depoimento-conversa-01.png.asset.json";
import depoimento2Asset from "@/assets/depoimento-conversa-02.png.asset.json";
import depoimento3Asset from "@/assets/depoimento-conversa-03.png.asset.json";
import depoimento4Asset from "@/assets/depoimento-conversa-04.png.asset.json";
import avatarLucas from "@/assets/avatar-mulher-1.jpg.asset.json";
import avatarRafael from "@/assets/avatar-mulher-2.jpg.asset.json";
import avatarMarcos from "@/assets/avatar-mulher-3.jpg.asset.json";
import avatarAndre from "@/assets/avatar-mulher-4.jpg.asset.json";
import bonus1Asset from "@/assets/bonus-alongamentos.png.asset.json";
import bonus2Asset from "@/assets/bonus-rotina-semanal.png.asset.json";
import bonus3Asset from "@/assets/bonus-planner-gestante.png.asset.json";
import bonus4Asset from "@/assets/bonus-terceiro-trimestre.png.asset.json";
import bonus5Asset from "@/assets/bonus-fichas-acompanhamento.png.asset.json";
import draCamilaAsset from "@/assets/dra-camila-rodrigues.png.asset.json";
import premiumPlanAsset from "@/assets/plano-premium.png.asset.json";

const kitMockup = mockupAsset.url;
const mapa1 = mapa1Asset.url;
const mapa2 = mapa2Asset.url;
const mapa3 = mapa3Asset.url;
const mapa4 = mapa4Asset.url;
const mapa5 = mapa5Asset.url;
const depoimento1 = depoimento1Asset.url;
const depoimento2 = depoimento2Asset.url;
const depoimento3 = depoimento3Asset.url;
const depoimento4 = depoimento4Asset.url;
const bonus1 = bonus1Asset.url;
const bonus2 = bonus2Asset.url;
const bonus3 = bonus3Asset.url;
const bonus4 = bonus4Asset.url;
const bonus5 = bonus5Asset.url;

const mapas = [mapa1, mapa2, mapa3, mapa4, mapa5];
const bonusImgs = [bonus1, bonus2, bonus3, bonus4, bonus5];

const depoimentos: Record<string, { produto: string; avatar: string }> = {
  lucas: { produto: depoimento1, avatar: avatarLucas.url },
  rafael: { produto: depoimento2, avatar: avatarRafael.url },
  marcos: { produto: depoimento3, avatar: avatarMarcos.url },
  andre: { produto: depoimento4, avatar: avatarAndre.url },
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
    .replace(/\/assets\/plano-premium-upload\.png/g, premiumPlanAsset.url)
    .replace(/\/assets\/mapa_preview_(\d)\.webp/g, (_m, n) => mapas[(Number(n) - 1) % mapas.length] ?? mapa1)
    .replace(/\/assets\/bonus_(\d)\.webp/g, (_m, n) => bonusImgs[(Number(n) - 1) % bonusImgs.length] ?? bonus1)
    .replace(/\/assets\/dra_camila_rodrigues\.webp/g, draCamilaAsset.url)
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
      { title: "150 Guias de Canto para Trinca-Ferro" },
      {
        name: "description",
        content:
          "Organize o manejo, o treino e a preparação do canto do seu trinca-ferro com 150 guias digitais práticos.",
      },
      { property: "og:title", content: "150 Guias de Canto para Trinca-Ferro" },
      {
        property: "og:description",
        content:
          "Guias digitais para criadores organizarem manejo, treino e preparação para rodas e torneios. Acesso vitalício.",
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
            Guias digitais organizados por tema para facilitar o manejo, o treino e a evolução do
            canto do seu trinca-ferro. Arraste para explorar.
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
