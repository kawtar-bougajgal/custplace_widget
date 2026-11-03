/** @type {import('tailwindcss').Config} */
export default {
  // Scanne ghi les fichiers dial widget — machi kolshi dial site
  // dial client (bach build ykon khfif w ma ykounch conflits)
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  // ⚠️ CRITIQUE: kolshi utility class ghadi tji b "cp-" prefix
  // (ex: cp-flex, cp-bg-blue-500, hover:cp-w-[257px])
  // Hadchi kayeliminir 100% risque dial conflict m3a classes
  // dial site dial client li 3ndo Bootstrap, dial CSS khass, etc.
  prefix: "cp-",

  // ⚠️ CRITIQUE: preflight = reset CSS global dial Tailwind
  // (kaybeddel margins/paddings/line-height dial <h1>, <p>, <button>...
  // f WHOLE PAGE). Ila khaliناه mfa77al, ghadi يكسر l site dial client.
  // B false, Tailwind ghadi ghi يزيد utility classes bla ma يمسّ
  // baqi l page.
  corePlugins: {
    preflight: false,
  },

  theme: {
    extend: {
      fontFamily: {
        // nafss variable dyal font li kant f variables.css
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        "cp-primary": "#3e5cff",
        "cp-primary-dark": "#2d46d1",
        "cp-accent-star": "#ffb400",
        "cp-success": "#16a34a",
        "cp-success-dark": "#128a3e",
        "cp-bg-soft": "#ffffff",
        "cp-border": "#e6e8f0",
        "cp-text": "#1a1a2e",
        "cp-text-muted": "#6b7280",
        "cp-text-light": "#9ca3af",
      },
      boxShadow: {
        // Shadow dyal badge f hover (exact Figma value)
        "cp-badge": "0px 4px 4px 0px rgba(231, 13, 35, 0.06)",
        "cp-badge-rest": "0 4px 4px 0 rgba(27, 14, 60, 0.35)",
        "cp-panel": "0 20px 50px rgba(20, 20, 40, 0.2)",
      },
      backgroundImage: {
        "cp-gradient":
          "linear-gradient(135deg, rgba(27,14,60,1) 0%, rgba(62,92,255,1) 50%, rgba(239,171,255,1) 100%)",
      },
      zIndex: {
        "cp-badge": "999998",
        "cp-panel": "999999",
      },
      transitionTimingFunction: {
        "cp-ease": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};