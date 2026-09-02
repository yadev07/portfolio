import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated social card. Built at request/build time by next/og so the repo
 * carries no binary image that can go stale when the data changes.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0E1320",
          padding: "72px",
          color: "#E8E4DA",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "52px",
              height: "52px",
              marginRight: "16px",
              borderRadius: "12px",
              border: "1px solid rgba(224,164,88,0.5)",
              color: "#E0A458",
              fontSize: "28px",
            }}
          >
            {profile.monogram}
          </div>
          <div style={{ display: "flex", fontSize: "24px", color: "#8A93A8" }}>
            {profile.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: "92px", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "28px",
              fontSize: "30px",
              color: "#8A93A8",
              maxWidth: "900px",
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#8A93A8",
            borderTop: "1px solid rgba(255,255,255,0.09)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex" }}>
            {`${profile.universityShort}, ${profile.campus}`}
          </div>
          <div style={{ display: "flex", color: "#E0A458" }}>
            {`Expected ${profile.graduationYear}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
