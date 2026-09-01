"use client";

import { useEffect, useRef } from "react";
// Il CSS viaggia nel bundle: caricarlo da un CDN a runtime significa mappa
// senza stili quando quel CDN e' lento o bloccato.
import "leaflet/dist/leaflet.css";

export default function LocationMap({
  lat,
  lng,
  street,
  name,
}: {
  lat: number;
  lng: number;
  street: string;
  name: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [lat, lng],
        zoom: 16,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });
      mapRef.current = map;

      // Esri Canvas Dark Gray: grigio neutro, senza chiave API.
      // Le tile esistono fino a z16; oltre, Esri serve un placeholder chiaro
      // "Map data not yet available". maxNativeZoom ferma le richieste a 16 e
      // lascia che Leaflet riscali, cosi' lo zoom resta usabile.
      const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas";
      const tileOpts = { maxNativeZoom: 16, maxZoom: 19 };

      L.tileLayer(`${ESRI}/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}`, {
        ...tileOpts,
        attribution: "Tiles © Esri · © OpenStreetMap contributors",
      }).addTo(map);

      L.tileLayer(`${ESRI}/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}`, {
        ...tileOpts,
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `
          <div style="position:relative;width:48px;height:48px;">
            <div style="position:absolute;inset:0;border-radius:50%;background:rgba(245,242,236,0.2);animation:kuropulse 2.4s ease-out infinite;"></div>
            <div style="position:absolute;inset:6px;border-radius:50%;background:#0A0A0A;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.6);border:1px solid rgba(245,242,236,0.3);display:flex;align-items:center;justify-content:center;">
              <img src="/logopesce.jpg" alt="Kuro" style="width:78%;height:auto;display:block;" />
            </div>
          </div>
          <style>@keyframes kuropulse{0%{transform:scale(0.6);opacity:0.7}100%{transform:scale(1.7);opacity:0}}</style>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      });

      L.marker([lat, lng], { icon }).addTo(map).bindPopup(
        `<strong style="font-family:Georgia,serif;color:#0A0A0A;">${name}</strong><br/><span style="font-size:11px;color:#666;">${street}</span>`
      );
    })();

    return () => {
      cancelled = true;
      // @ts-expect-error leaflet map type lazy
      mapRef.current?.remove?.();
      mapRef.current = null;
    };
  }, [lat, lng, street, name]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[440px] overflow-hidden border border-kuro-smoke"
      aria-label="Mapa del restaurante"
    />
  );
}
