import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize i18n before rendering the application.
import i18n, { isRtlLanguage } from "./i18n";

// Set document language + direction early (prevents layout flicker for RTL languages).
const initialLang = (i18n.language || "sv").slice(0, 2);
document.documentElement.setAttribute("lang", initialLang);
document.documentElement.setAttribute("dir", isRtlLanguage(initialLang) ? "rtl" : "ltr");

createRoot(document.getElementById("root")!).render(<App />);
