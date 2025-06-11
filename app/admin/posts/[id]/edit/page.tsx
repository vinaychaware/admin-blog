'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Save,
  Eye,
  Calendar,
  Tag,
  Image,
  FileText,
  Clock,
  Users,
  MessageSquare,
  Heart,
  BarChart,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock data - in real app this would come from API
const mockPost = {
  id: 1,
  title: 'Building Modern Web Applications with Next.js',
  slug: 'building-modern-web-applications-nextjs',
  content: `# Building Modern Web Applications with Next.js

Next.js has revolutionized the way we build React applications. In this comprehensive guide, we'll explore the key features that make Next.js the go-to framework for modern web development.

## Getting Started

First, let's create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Features

### Server-Side Rendering (SSR)
Next.js provides built-in SSR capabilities that improve performance and SEO.

### Static Site Generation (SSG)  
Generate static pages at build time for optimal performance.

### API Routes
Build full-stack applications with built-in API routes.

## Conclusion

Next.js continues to evolve and remains the top choice for React developers building production applications.`,
  excerpt: 'Learn how to build modern, fast, and SEO-friendly web applications using Next.js framework.',
  author: 'John Doe',
  category: 'Technology',
  tags: ['Next.js', 'React', 'Web Development', 'JavaScript'],
  status: 'Published',
  publishedAt: '2025-01-02T10:00:00Z',
  createdAt: '2024-12-28T15:30:00Z',
  updatedAt: '2025-01-02T10:00:00Z',
  featuredImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1200',
  seoTitle: 'Building Modern Web Applications with Next.js - Complete Guide',
  seoDescription: 'Complete guide to building modern web applications with Next.js. Learn SSR, SSG, API routes and more.',
  views: 12340,
  comments: 23,
  likes: 156,
  readTime: 8,
};

export default function EditPost() {
  const params = useParams();
  const [post, setPost] = useState(mockPost);
  const [isPublished, setIsPublished] = useState(post.status === 'Published');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handlePublishToggle = (checked: boolean) => {
    setIsPublished(checked);
    setPost({ ...post, status: checked ? 'Published' : 'Draft' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Posts
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
            <p className="text-muted-foreground">
              Make changes to your blog post and track its performance.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
              <CardDescription>
                Edit the basic information and content of your blog post.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  placeholder="Enter post title..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={post.slug}
                  onChange={(e) => setPost({ ...post, slug: e.target.value })}
                  placeholder="post-slug"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={post.excerpt}
                  onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                  placeholder="Brief description of the post..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={post.content}
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                  placeholder="Write your post content here..."
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your post for search engines.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={post.seoTitle}
                  onChange={(e) => setPost({ ...post, seoTitle: e.target.value })}
                  placeholder="SEO optimized title..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">Meta Description</Label>
                <Textarea
                  id="seoDescription"
                  value={post.seoDescription}
                  onChange={(e) => setPost({ ...post, seoDescription: e.target.value })}
                  placeholder="Brief description for search results..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Post Status */}
          <Card>
            <CardHeader>
              <CardTitle>Publication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Published</Label>
                <Switch
                  id="published"
                  checked={isPublished}
                  onCheckedChange={handlePublishToggle}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Status</Label>
                <Badge className={post.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {post.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label>Published Date</Label>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories and Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={post.category}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden border">
                  <img
                    src={post.featuredImage}
                    alt="Featured"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button variant="outline" className="w-full">
                  <Image className="mr-2 h-4 w-4" />
                  Change Image
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>
                Current post statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-lg font-bold">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    {post.views.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-lg font-bold">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    {post.comments}
                  </div>
                  <p className="text-xs text-muted-foreground">Comments</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-lg font-bold">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    {post.likes}
                  </div>
                  <p className="text-xs text-muted-foreground">Likes</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-lg font-bold">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {post.readTime}m
                  </div>
                  <p className="text-xs text-muted-foreground">Read Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}