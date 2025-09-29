"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Users, Globe, BarChart3, ArrowRight } from "lucide-react";

const pollData = [
  { name: "Jan", value: 65 },
  { name: "Feb", value: 72 },
  { name: "Mar", value: 68 },
  { name: "Apr", value: 75 },
  { name: "May", value: 82 },
  { name: "Jun", value: 78 },
];

const regionData = [
  { name: "East Africa", value: 35, color: "#F6D207" },
  { name: "West Africa", value: 30, color: "#000000" },
  { name: "Southern Africa", value: 20, color: "#4B5563" },
  { name: "Central Africa", value: 15, color: "#9CA3AF" },
];

export function HeroSection() {
  return (
    <section className="relative py-24 lg:py-40 overflow-hidden bg-gradient-to-br from-muted/50 via-background to-muted/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(246,210,7,0.08),transparent_50%)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-black text-balance leading-tight">
                Decoding Africa&apos;s
                <span className="text-foreground block">Pulse</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-medium text-pretty">
                Data-Driven Insights for Political &amp; Socio-Economic Strategy
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Politrack Africa empowers leaders with cutting-edge opinion
              polling, research, and strategic advisory services tailored to
              Africa&apos;s complex political and socio-economic landscape.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                Download Free Report
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-2 border-primary text-foreground hover:bg-primary hover:text-primary-foreground font-semibold bg-transparent"
              >
                Get In Touch
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-accent/20 rounded-xl">
                    <Globe className="h-8 w-8 text-accent-foreground" />
                  </div>
                </div>
                <div className="text-3xl font-black text-foreground">25+</div>
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Countries
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-accent/20 rounded-xl">
                    <Users className="h-8 w-8 text-accent-foreground" />
                  </div>
                </div>
                <div className="text-3xl font-black text-foreground">90%</div>
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Africa-Based
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-accent/20 rounded-xl">
                    <BarChart3 className="h-8 w-8 text-accent-foreground" />
                  </div>
                </div>
                <div className="text-3xl font-black text-foreground">7/7</div>
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Predictions
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-accent/20 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-accent-foreground" />
                  </div>
                </div>
                <div className="text-3xl font-black text-foreground">92%</div>
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Approval
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <Card className="p-8 border border-border shadow-lg hover:shadow-xl transition-shadow bg-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">
                  Youth Economic Priorities
                </h3>
                <div className="flex items-center text-sm font-semibold text-accent-foreground bg-accent/20 px-3 py-1 rounded-full">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  78% prioritize economy
                </div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pollData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Bar dataKey="value" fill="#F6D207" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-8 border border-border shadow-lg hover:shadow-xl transition-shadow bg-card">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Regional Coverage
              </h3>
              <div className="flex items-center space-x-8">
                <div className="h-36 w-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={65}
                        dataKey="value"
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {regionData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {item.name}
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
