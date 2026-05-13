"use client";
import { motion } from "framer-motion";

type Props = {
  label: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  kanji?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  kanji,
}: Props) {
  const isCenter = align === "center";
  return (
    <div
      className={`flex flex-col gap-5 ${
        isCenter ? "items-center text-center" : "items-start text-left"
      } max-w-2xl ${isCenter ? "mx-auto" : ""}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3"
      >
        <span className="h-px w-8 bg-kuro-gold/60" />
        <span className="label-tracked">{label}</span>
        {kanji && (
          <span className="display-italic text-kuro-red text-xl ml-2">
            {kanji}
          </span>
        )}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="text-h1 text-kuro-cream"
        style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-kuro-stone text-base md:text-lg max-w-xl leading-relaxed"
          style={{ fontWeight: 300 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
