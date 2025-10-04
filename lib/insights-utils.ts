// lib/insights-utils.ts
import { insightsContent, InsightContent } from "@/content/insights-content";

// Create a serializable version of the insight data
export function getSerializableInsightById(id: string) {
  const insight = insightsContent.find((item) => item.id === id);

  if (!insight) return undefined;

  // Return a plain object without the icon component
  return {
    ...insight,
    icon: undefined, // Remove the icon component
    iconName: getIconName(insight.icon), // Store icon name instead
  };
}

// Helper function to get icon name
function getIconName(iconComponent: any): string {
  // Extract the display name from the component
  const name = iconComponent.displayName || iconComponent.name || "";

  // Map to consistent names
  if (name.includes("Users")) return "Users";
  if (name.includes("BarChart3")) return "BarChart3";
  if (name.includes("TrendingUp")) return "TrendingUp";

  return "FileText"; // default
}

export function getAllInsightIds(): string[] {
  return insightsContent.map((insight) => insight.id);
}

// Client-side icon mapping
export const iconMap = {
  Users: () => import("lucide-react").then((mod) => mod.Users),
  BarChart3: () => import("lucide-react").then((mod) => mod.BarChart3),
  TrendingUp: () => import("lucide-react").then((mod) => mod.TrendingUp),
  FileText: () => import("lucide-react").then((mod) => mod.FileText),
};
