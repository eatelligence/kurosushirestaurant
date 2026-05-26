"use client";

import { useEffect, useRef } from "react";
import { RESTAURANT } from "@/lib/constants";

export default function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      // styles
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }
      if (cancelled || !containerRef.current || mapRef.current) return;

      const { lat, lng } = RESTAURANT.address.coords;
      const map = L.map(containerRef.current, {
        center: [lat, lng],
        zoom: 16,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });
      mapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution: "© OpenStreetMap · © CARTO",
        }
      ).addTo(map);

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
        `<strong style="font-family:Georgia,serif;color:#0A0A0A;">Kuro Sushi</strong><br/><span style="font-size:11px;color:#666;">${RESTAURANT.address.street}</span>`
      );
    })();

    return () => {
      cancelled = true;
      // @ts-expect-error leaflet map type lazy
      mapRef.current?.remove?.();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[440px] overflow-hidden border border-kuro-smoke"
      aria-label="Mapa de Kuro Sushi en Los Palos Grandes"
    />
  );
}
