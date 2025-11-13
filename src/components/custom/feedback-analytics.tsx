/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, Star, Users, MessageSquare } from "lucide-react";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Kolkata");

export interface IFeedback {
  _id: string;
  name: string;
  email: string;
  rating: number;
  description: string;
  website: string; // website ID reference
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v?: number; // optional version key (MongoDB)
}

export function FeedbackAnalytics({websiteId}: {websiteId: string}) {
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);

  useEffect(() => {
    async function fetchFeedbacks() {
        try{
            const {data} = await axios.get(`/api/fetch-feedbacks?websiteId=${websiteId}`)
            if(data.success){
                setFeedbacks(data.data)
            }
        }catch(error){
            console.log(error)
        }
    }
    fetchFeedbacks()
  },[])

  

  console.log(feedbacks)

  const totalFeedbacks = feedbacks.length;
  const totalRating = feedbacks.reduce(
    (acc: number, f: any) => acc + f.rating,
    0
  );

  const avg =
    totalFeedbacks > 0 ? Number((totalRating / totalFeedbacks).toFixed(2)) : 0;

  const satisfied = feedbacks.filter((f) => f.rating >= 4).length;
  const satisfactionRate =
    totalFeedbacks > 0
      ? Number(((satisfied / totalFeedbacks) * 100).toFixed(2))
      : 0;


    const now = dayjs().tz();

    const feedbacksToday = feedbacks.filter((f) =>
      dayjs(f.createdAt).tz().isSame(now, "day")
    ).length;

    const feedbacksYesterday = feedbacks.filter((f) =>
      dayjs(f.createdAt).tz().isSame(now.subtract(1, "day"), "day")
    ).length;

    let growthRate = 0;
    if (feedbacksYesterday > 0) {
      growthRate =
        ((feedbacksToday - feedbacksYesterday) / feedbacksYesterday) * 100;
    }
    growthRate = Number(growthRate.toFixed(2));

    console.log({ feedbacksToday, feedbacksYesterday, growthRate });



  const analytics = useMemo(() => {
    if (!feedbacks || feedbacks.length === 0) {
      return {
        totalFeedback: 0,
        avgRating: 0,
        positivePercent: 0,
        growthRate: 0,
        ratingDistribution: [],
        sentimentData: [],
        ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        positiveCount: 0,
        negativeCount: 0,
        trendData: [],
      };
    }

    const totalFeedback = feedbacks.length;

    const avgRating = Number(
      (
        feedbacks.reduce((sum: number, f: any) => sum + f.rating, 0) /
        totalFeedback
      ).toFixed(1)
    );

    const ratingCounts = {
      5: feedbacks.filter((f: any) => f.rating === 5).length,
      4: feedbacks.filter((f: any) => f.rating === 4).length,
      3: feedbacks.filter((f: any) => f.rating === 3).length,
      2: feedbacks.filter((f: any) => f.rating === 2).length,
      1: feedbacks.filter((f: any) => f.rating === 1).length,
    };

    const positiveCount = ratingCounts[5] + ratingCounts[4];
    const neutralCount = ratingCounts[3];
    const negativeCount = ratingCounts[2] + ratingCounts[1];

    const positivePercent = Number(
      ((positiveCount / totalFeedback) * 100).toFixed(1)
    );

    const now = dayjs();
    const feedbacksThisMonth = feedbacks.filter((f: any) =>
      dayjs(f.createdAt).isAfter(now.subtract(30, "day"))
    ).length;

    const feedbacksLastMonth = feedbacks.filter(
      (f: any) =>
        dayjs(f.createdAt).isAfter(now.subtract(60, "day")) &&
        dayjs(f.createdAt).isBefore(now.subtract(30, "day"))
    ).length;

    let growthRate = 0;
    if (feedbacksLastMonth > 0) {
      growthRate =
        ((feedbacksThisMonth - feedbacksLastMonth) / feedbacksLastMonth) * 100;
    } else if (feedbacksThisMonth > 0) {
      growthRate = 100; // new growth
    }
    growthRate = Number(growthRate.toFixed(2));

    const ratingDistribution = [
      { name: "5★", value: ratingCounts[5], fill: "#10B981" },
      { name: "4★", value: ratingCounts[4], fill: "#34D399" },
      { name: "3★", value: ratingCounts[3], fill: "#6EE7B7" },
      { name: "2★", value: ratingCounts[2], fill: "#FCD34D" },
      { name: "1★", value: ratingCounts[1], fill: "#EF4444" },
    ];

    // Sentiment breakdown for PieChart
    const sentimentData = [
      { name: "Positive", value: positiveCount, fill: "#10B981" },
      { name: "Neutral", value: neutralCount, fill: "#6EE7B7" },
      { name: "Negative", value: negativeCount, fill: "#EF4444" },
    ];

    // Trend data (group by date)
    const trendMap: Record<string, { feedback: number; totalRating: number }> =
      {};
    feedbacks.forEach((f: any) => {
      const date = dayjs(f.createdAt).format("MMM DD");
      if (!trendMap[date]) trendMap[date] = { feedback: 0, totalRating: 0 };
      trendMap[date].feedback++;
      trendMap[date].totalRating += f.rating;
    });

    const trendData = Object.keys(trendMap).map((date) => ({
      date,
      feedback: trendMap[date].feedback,
      rating: Number(
        (trendMap[date].totalRating / trendMap[date].feedback).toFixed(1)
      ),
    }));

    return {
      totalFeedback,
      avgRating,
      positivePercent,
      growthRate,
      ratingDistribution,
      sentimentData,
      ratingCounts,
      positiveCount,
      negativeCount,
      trendData,
    };
  }, [feedbacks]);


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-emerald-100 bg-gradient-to-r from-white via-emerald-50/60 to-emerald-100/30 backdrop-blur-md">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left Section */}
            <div>
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-800 tracking-tight">
                Feedback Analytics
              </h1>
              <p className="text-emerald-700/70 mt-2 text-lg font-medium">
                Comprehensive real-time feedback analysis & insights
              </p>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <div className="px-5 py-2.5 bg-white/80 border border-emerald-200 rounded-xl shadow-sm text-sm text-emerald-700 font-semibold flex items-center gap-2 hover:shadow-md transition-all duration-300">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Last 30 days
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ">
          <KPICard
            title="Total Feedback"
            value={feedbacks.length}
            unit="responses"
            icon={<MessageSquare className="w-5 h-5" />}
            trend="up"
            trendValue="8.2%"
          />
          <KPICard
            title="Average Rating"
            value={avg}
            unit="/ 5.0"
            icon={<Star className="w-5 h-5" />}
            trend="up"
            trendValue="2.1%"
          />
          <KPICard
            title="Satisfaction Rate"
            value={`${satisfactionRate}%`}
            unit="positive"
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
            trendValue="5.3%"
          />
          <KPICard
            title="Growth Rate"
            value={`${growthRate}%`}
            unit="month over month"
            icon={<Users className="w-5 h-5" />}
            trend="up"
            trendValue="3.7%"
          />
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Rating Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Feedback & Rating Trend</CardTitle>
              <CardDescription>
                Daily feedback volume and average rating
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.trendData}>
                    <defs>
                      <linearGradient
                        id="colorFeedback"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10B981"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10B981"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="date"
                      stroke="#9CA3AF"
                      style={{ fontSize: "12px" }}
                    />
                    <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#F3F4F6" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="feedback"
                      stroke="#10B981"
                      fill="url(#colorFeedback)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Pie */}
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Breakdown</CardTitle>
              <CardDescription>
                Distribution of feedback sentiment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${name} ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analytics.sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rating Distribution & Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Rating Distribution Bar */}
          <Card className="bg-gradient-to-br from-white to-emerald-50 border-emerald-100 shadow-lg hover:shadow-emerald-200 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-emerald-700 text-xl font-bold flex items-center gap-2">
                ⭐ Rating Distribution
              </CardTitle>
              <CardDescription className="text-gray-500">
                Customer ratings by star level
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="h-80 px-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analytics.ratingDistribution}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis type="number" stroke="#94A3B8" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fill: "#059669", fontSize: 14, fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(16, 185, 129, 0.1)" }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #A7F3D0",
                        backgroundColor: "white",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="url(#emeraldGradient)"
                      radius={[0, 10, 10, 0]}
                      barSize={20}
                    />
                    <defs>
                      <linearGradient
                        id="emeraldGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#A7F3D0" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle>Key Statistics</CardTitle>
              <CardDescription>Detailed metrics summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <StatRow
                  label="5-Star Ratings"
                  value={`${analytics.ratingCounts[5]}`}
                  percentage={(
                    (analytics.ratingCounts[5] / analytics.totalFeedback) *
                    100
                  ).toFixed(1)}
                  color="emerald"
                />
                <StatRow
                  label="4-Star Ratings"
                  value={`${analytics.ratingCounts[4]}`}
                  percentage={(
                    (analytics.ratingCounts[4] / analytics.totalFeedback) *
                    100
                  ).toFixed(1)}
                  color="green"
                />
                <StatRow
                  label="3-Star Ratings"
                  value={`${analytics.ratingCounts[3]}`}
                  percentage={(
                    (analytics.ratingCounts[3] / analytics.totalFeedback) *
                    100
                  ).toFixed(1)}
                  color="teal"
                />
                <StatRow
                  label="2-Star Ratings"
                  value={`${analytics.ratingCounts[2]}`}
                  percentage={(
                    (analytics.ratingCounts[2] / analytics.totalFeedback) *
                    100
                  ).toFixed(1)}
                  color="yellow"
                />
                <StatRow
                  label="1-Star Ratings"
                  value={`${analytics.ratingCounts[1]}`}
                  percentage={(
                    (analytics.ratingCounts[1] / analytics.totalFeedback) *
                    100
                  ).toFixed(1)}
                  color="red"
                />
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">
                      Response Rate
                    </span>
                    <span className="text-lg font-bold text-primary">
                      COMMING SOON
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Feedback Table */}
        <Card className="">
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>
              Latest customer feedback submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Rating
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Feedback
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((feedback, index) => (
                    <tr
                      key={index}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 text-foreground">
                        {feedback.name}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {feedback.email}
                      </td>
                      <td className="py-3 px-4">
                        <RatingBadge rating={feedback.rating} />
                      </td>
                      <td className="py-3 px-4 text-foreground max-w-xs truncate">
                        {feedback.description}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-xs">
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(feedback.createdAt))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KPICard({ title, value, unit, icon, trend, trendValue }: any) {
  return (
    <Card className="border border-border bg-card hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{unit}</p>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg text-primary">
            {icon}
          </div>
        </div>
        {trend === "up" && (
          <div className="flex items-center gap-1 mt-4 text-green-600 text-xs font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>{trendValue} from last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatRow({ label, value, percentage, color }: any) {
  const colorMap: any = {
    emerald: "bg-emerald-500",
    green: "bg-green-500",
    teal: "bg-teal-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${colorMap[color]}`}></div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-foreground">{value}</span>
        <span className="text-xs text-muted-foreground">({percentage}%)</span>
      </div>
    </div>
  );
}

function RatingBadge({ rating }: { rating: number }) {
  const getBgColor = (r: number) => {
    if (r === 5) return "bg-emerald-100 text-emerald-700";
    if (r === 4) return "bg-green-100 text-green-700";
    if (r === 3) return "bg-teal-100 text-teal-700";
    if (r === 2) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold ${getBgColor(
        rating
      )}`}
    >
      {rating}★
    </span>
  );
}
