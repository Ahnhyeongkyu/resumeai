export const TEMPLATES = [
  { id: "classic", name: "Classic", description: "Traditional ATS-friendly layout" },
  { id: "modern", name: "Modern", description: "Clean with accent colors" },
  { id: "minimal", name: "Minimal", description: "Simple and elegant" },
  { id: "professional", name: "Professional", description: "Corporate-ready format" },
  { id: "executive", name: "Executive", description: "Senior-level presentation" },
] as const;

export type TemplateId = typeof TEMPLATES[number]["id"];

export const TEMPLATE_COLORS: Record<TemplateId, { primary: string; accent: string }> = {
  classic: { primary: "#1a1a1a", accent: "#2563eb" },
  modern: { primary: "#111827", accent: "#7c3aed" },
  minimal: { primary: "#374151", accent: "#059669" },
  professional: { primary: "#1e293b", accent: "#0369a1" },
  executive: { primary: "#0f172a", accent: "#b91c1c" },
};
