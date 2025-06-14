"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  FileText,
  Eye,
  MessageSquare,
  Heart,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    name: "Total Posts",
    value: "2,651",
    change: "+4.75%",
    changeType: "positive",
    icon: FileText,
  },
  {
    name: "Total Views",
    value: "54,923",
    change: "+54.02%",
    changeType: "positive",
    icon: Eye,
  },
  {
    name: "Active Users",
    value: "1,423",
    change: "-1.39%",
    changeType: "negative",
    icon: Users,
  },
  {
    name: "Comments",
    value: "12,234",
    change: "+10.18%",
    changeType: "positive",
    icon: MessageSquare,
  },
];

const chartData = [
  { name: "Jan", views: 4000, posts: 240, comments: 400 },
  { name: "Feb", views: 3000, posts: 139, comments: 300 },
  { name: "Mar", views: 2000, posts: 980, comments: 200 },
  { name: "Apr", views: 2780, posts: 390, comments: 278 },
  { name: "May", views: 1890, posts: 480, comments: 189 },
  { name: "Jun", views: 2390, posts: 380, comments: 239 },
  { name: "Jul", views: 3490, posts: 430, comments: 349 },
];

const categoryData = [
  { name: "Technology", value: 400, color: "hsl(var(--chart-1))" },
  { name: "Lifestyle", value: 300, color: "hsl(var(--chart-2))" },
  { name: "Business", value: 200, color: "hsl(var(--chart-3))" },
  { name: "Health", value: 150, color: "hsl(var(--chart-4))" },
];

const recentPosts = [
  {
    id: 1,
    title: "Building Modern Web Applications with Next.js",
    author: "John Doe",
    status: "Published",
    views: 1234,
    comments: 23,
    date: "2025-01-02",
  },
  {
    id: 2,
    title: "The Future of AI in Content Creation",
    author: "Jane Smith",
    status: "Draft",
    views: 0,
    comments: 0,
    date: "2025-01-01",
  },
  {
    id: 3,
    title: "Responsive Design Best Practices",
    author: "Mike Johnson",
    status: "Published",
    views: 856,
    comments: 12,
    date: "2024-12-30",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&#39;s what&#39;s happening with your blog.
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.name} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {item.changeType === "positive" ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    item.changeType === "positive"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {item.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Monthly views, posts, and comments</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="name" 
                    className="text-muted-foreground"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Bar dataKey="views" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="posts" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="comments" fill="hsl(var(--chart-3))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Posts by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="h-3 w-3 rounded-full mr-2"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{category.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
          <CardDescription>
            Latest blog posts and their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-1">
                  <h3 className="font-medium leading-none">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    by {post.author} • {post.date}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge
                    variant={
                      post.status === "Published" ? "default" : "secondary"
                    }
                  >
                    {post.status}
                  </Badge>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
