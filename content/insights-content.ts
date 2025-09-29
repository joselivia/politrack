// content/insights-content.ts
import { Users, BarChart3, TrendingUp } from "lucide-react";

export interface InsightContent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  featured: boolean;
  icon: any;
  content: {
    pages: number;
    language: string;
    sections: {
      title: string;
      content: string[];
    }[];
    keyFindings: string[];
  };
}

export const insightsContent: InsightContent[] = [
  {
    id: "african-youth-political-engagement-2024",
    title: "African Youth Political Engagement Report 2024",
    description:
      "78% of urban youth in 5 African nations show increased political participation, with digital platforms driving civic engagement.",
    date: "March 2024",
    type: "Research Report",
    featured: true,
    icon: Users,
    content: {
      pages: 42,
      language: "English",
      sections: [
        {
          title: "Executive Summary",
          content: [
            "This comprehensive study examines the political engagement patterns of youth aged 18-35 across five African nations: Nigeria, Kenya, Ghana, South Africa, and Ethiopia. Our research reveals a significant shift in political participation driven by digital transformation and changing socio-economic dynamics.",
            "The study employed mixed-methods research, combining quantitative surveys with 5,000 respondents and qualitative focus groups across major urban centers. Data collection occurred between September 2023 and February 2024, providing real-time insights into youth political behavior.",
          ],
        },
        {
          title: "Digital Transformation in Political Participation",
          content: [
            "Social media platforms have emerged as the primary channel for political discourse among African youth. 85% of respondents reported using platforms like Twitter, Facebook, and WhatsApp to discuss political issues and organize civic actions.",
            "Mobile technology has democratized political information access. 92% of youth respondents use smartphones as their primary device for consuming political news, with 67% engaging directly with political content daily.",
            "Digital activism is translating into real-world action. 45% of digitally engaged youth reported participating in physical political events or community organizing within the last six months.",
          ],
        },
        {
          title: "Regional Variations and Trends",
          content: [
            "East African nations show the highest rates of youth political engagement, with Kenya leading at 82% participation rate. This correlates with higher mobile penetration rates and digital literacy programs.",
            "West African youth demonstrate strong interest in governance issues, particularly around economic opportunities and anti-corruption measures. Nigerian youth showed 76% engagement despite infrastructural challenges.",
            "Southern African youth prioritize environmental and climate issues, with 68% expressing concern about climate change impacts on their political decisions.",
          ],
        },
      ],
      keyFindings: [
        "78% overall increase in youth political participation across surveyed nations",
        "Digital platform usage correlates with 3.2x higher political engagement",
        "62% of youth prefer online political discussions over traditional forums",
        "Women's political participation increased by 45% in digital spaces",
        "Youth-led political initiatives show 68% higher community impact",
      ],
    },
  },
  {
    id: "post-election-analysis-nigeria-2023",
    title: "Post-Election Analysis: Nigeria 2023",
    description:
      "Comprehensive analysis of voter behavior, turnout patterns, and demographic shifts in Nigeria's 2023 general elections.",
    date: "February 2024",
    type: "Case Study",
    featured: false,
    icon: BarChart3,
    content: {
      pages: 36,
      language: "English",
      sections: [
        {
          title: "Election Overview and Methodology",
          content: [
            "The 2023 Nigerian general elections represented a significant milestone in the nation's democratic journey, featuring unprecedented youth participation and technological integration in the electoral process.",
            "Our analysis combines official INEC data, independent observer reports, and post-election surveys conducted across all six geopolitical zones. The study focuses on voting patterns, demographic influences, and the impact of electoral reforms.",
          ],
        },
        {
          title: "Voter Turnout and Demographic Analysis",
          content: [
            "National voter turnout reached 34.5%, with significant variations across regions. Urban centers recorded higher participation rates (42%) compared to rural areas (28%).",
            "Youth voters (18-35) constituted 38% of total votes cast, marking a 15% increase from the 2019 elections. This demographic showed strong preference for candidates with digital outreach strategies.",
            "Gender participation reached near-parity in several states, with women constituting 48% of voters in Southwest regions. However, Northern regions maintained traditional gender participation gaps.",
          ],
        },
        {
          title: "Impact of Electoral Technology",
          content: [
            "The introduction of BVAS technology significantly reduced electoral malpractices in implemented areas. States with full BVAS deployment saw 65% reduction in reported irregularities.",
            "Digital voter education campaigns reached 45 million Nigerians through social media platforms, contributing to improved voter awareness and participation, particularly among first-time voters.",
            "Real-time result transmission faced technical challenges in 18% of polling units, highlighting infrastructure limitations that affected result collation timelines.",
          ],
        },
      ],
      keyFindings: [
        "34.5% national voter turnout with significant regional variations",
        "Youth participation increased by 15% compared to 2019 elections",
        "BVAS technology reduced electoral irregularities by 65%",
        "Digital campaigns reached 45 million potential voters",
        "Women's participation reached 48% in several states",
      ],
    },
  },
  {
    id: "economic-sentiment-tracker-q1-2024",
    title: "Economic Sentiment Tracker Q1 2024",
    description:
      "Quarterly assessment of business confidence and consumer sentiment across East African markets.",
    date: "January 2024",
    type: "Market Intelligence",
    featured: false,
    icon: TrendingUp,
    content: {
      pages: 28,
      language: "English",
      sections: [
        {
          title: "Economic Outlook and Methodology",
          content: [
            "The Q1 2024 Economic Sentiment Tracker provides comprehensive analysis of business and consumer confidence across Kenya, Tanzania, Uganda, Rwanda, and Ethiopia. This quarterly assessment helps stakeholders understand economic trends and make informed decisions.",
            "Our research methodology includes surveys of 1,500 businesses and 3,000 consumers, combined with expert interviews and macroeconomic data analysis. The sentiment index ranges from 0-100, with scores above 50 indicating positive sentiment.",
          ],
        },
        {
          title: "Business Confidence Trends",
          content: [
            "Overall business confidence index reached 58.3, indicating cautious optimism among East African enterprises. Manufacturing and technology sectors showed the highest confidence levels at 65.2 and 68.7 respectively.",
            "Small and medium enterprises reported improved access to digital financial services, with 72% utilizing mobile banking for business operations. This has contributed to increased operational efficiency and market access.",
            "Foreign investment interest remains strong, particularly in renewable energy and technology sectors. However, regulatory uncertainty continues to be a concern for 45% of surveyed businesses.",
          ],
        },
        {
          title: "Consumer Sentiment and Spending Patterns",
          content: [
            "Consumer confidence index stands at 52.1, reflecting moderate optimism despite inflationary pressures. Essential goods spending remains stable while discretionary spending shows cautious growth.",
            "Digital payment adoption continues to rise, with 68% of urban consumers using mobile money for regular transactions. This digital transformation is reshaping retail and service industries across the region.",
            "Employment expectations improved slightly, with 42% of consumers anticipating better job opportunities in the next quarter. Youth employment prospects show particular improvement in technology and service sectors.",
          ],
        },
      ],
      keyFindings: [
        "Business confidence index at 58.3, indicating cautious optimism",
        "Consumer confidence reaches 52.1 despite inflationary pressures",
        "72% of SMEs utilize mobile banking for business operations",
        "Technology sector shows highest confidence at 68.7",
        "68% of urban consumers regularly use mobile money services",
      ],
    },
  },
];
