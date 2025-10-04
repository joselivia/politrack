// app/insights/[slug]/page.tsx
import {
  getSerializableInsightById,
  getAllInsightIds,
} from "@/lib/insights-utils";
import InsightPageClient from "./page-client";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const ids = getAllInsightIds();
  return ids.map((slug) => ({
    slug,
  }));
}

export default function InsightPage({ params }: PageProps) {
  const insight = getSerializableInsightById(params.slug);

  if (!insight) {
    notFound();
  }

  return <InsightPageClient insight={insight} />;
}

export async function generateMetadata({ params }: any) {
  const insight = getSerializableInsightById(params.slug);

  if (!insight) {
    return {
      title: "Insight Not Found",
    };
  }

  return {
    title: `${insight.title} | Your Site Name`,
    description: insight.description,
  };
}
