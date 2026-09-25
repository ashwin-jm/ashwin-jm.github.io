/* ============================================================
   SITE CONFIG — edit this file to update your details.
   Leave a value as "" to hide that link everywhere on the site.
   ============================================================ */
window.SITE = {
  name: "Ashwin Joseph Manthara",
  shortName: "Ashwin",
  role: "Data Engineer",
  location: "Kottayam, Kerala, India",

  email: "ashwinjm25@gmail.com",
  linkedin: "https://www.linkedin.com/in/ashwin-jm/",   // e.g. "https://www.linkedin.com/in/your-handle"
  github: "https://github.com/ashwin-jm",     // e.g. "https://github.com/your-handle"

  // Your Medium handle WITHOUT the @ (e.g. "ashwinjm").
  // The Blog page pulls your latest posts automatically from Medium's RSS feed.
  mediumHandle: "ashwinjm",

  // Optional: path to your photo, e.g. "assets/img/ashwin.jpg". Leave "" to show initials.
  photo: "assets/img/ashwin.jpg",

  // Optional: path to your resume PDF, e.g. "assets/resume.pdf". Leave "" to hide the button.
  resume: "assets/Ashwin_Joseph_Manthara_Resume.pdf",

  /* "CURRENTLY BUILDING" — shown on the home page. Update it as you go.
     Set to null to hide the section. */
  now: {
    title: "End-to-end Fabric lakehouse with incremental loads & data quality checks",
    summary: "A production-style Microsoft Fabric platform built from scratch: ingestion, Bronze/Silver/Gold layers, watermark-based incremental loads and automated data quality checks, with a Power BI layer on top. I'm writing up every step on Medium.",
    updated: "2026-09-24",       // YYYY-MM-DD, shown as "Updated …"
    repo: "",                    // GitHub repo link once it's public
    learning: ["Microsoft Fabric", "Delta Lake", "Incremental loads", "Data quality", "DP-700 prep"],
    milestones: [                // status: "done" | "active" | "next"
      { label: "Architecture & data model", status: "active" },
      { label: "Bronze ingestion pipeline", status: "next" },
      { label: "Silver/Gold + incremental loads", status: "next" },
      { label: "Data quality checks & alerts", status: "next" },
      { label: "Power BI report + write-up", status: "next" }
    ]
  },

  /* Fallback posts — shown only if the Medium feed can't be reached
     (or before you set mediumHandle). Same shape as below. */
  manualPosts: [
    // { title: "My first post", link: "https://medium.com/@you/...", image: "https://...", date: "2026-09-01" }
  ]
};
