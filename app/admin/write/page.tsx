'use client';

import { useState, useRef } from 'react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Save,
  Eye,
  Upload,
  Image,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Type,
  Palette,
  CheckCircle,
  Calendar,
  Tag,
  FileText,
  Globe,
  Lock,
  Clock,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function WritePage() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    featuredImage: '',
    seoTitle: '',
    seoDescription: '',
    style: 'normal',
  });

  const [settings, setSettings] = useState({
    isPublished: false,
    isScheduled: false,
    scheduledDate: '',
    allowComments: true,
    isFeatured: false,
    visibility: 'public',
  });

  const [isSaving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [readTime, setReadTime] = useState(0);

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContentChange = (content: string) => {
    setPost({ ...post, content });
    
    // Calculate word count and read time
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    const count = words.length;
    const time = Math.ceil(count / 200); // Average reading speed: 200 words per minute
    
    setWordCount(count);
    setReadTime(time);
  };

  const handleSave = async (publish = false) => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (publish) {
      setSettings({ ...settings, isPublished: true });
    }
    
    setSaving(false);
    setSaveSuccess(true);
    
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      const fakeUrl = `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1200`;
      setPost({ ...post, featuredImage: fakeUrl });
    }
  };

  const handleImageUrlAdd = () => {
    if (newImageUrl.trim()) {
      setPost({ ...post, featuredImage: newImageUrl });
      setNewImageUrl('');
      setImageDialogOpen(false);
    }
  };

  const insertFormatting = (format: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let formattedText = '';
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText || 'italic text'}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText || 'underlined text'}</u>`;
        break;
      case 'strikethrough':
        formattedText = `~~${selectedText || 'strikethrough text'}~~`;
        break;
      case 'quote':
        formattedText = `> ${selectedText || 'quoted text'}`;
        break;
      case 'code':
        formattedText = `\`${selectedText || 'code'}\``;
        break;
      case 'link':
        formattedText = `[${selectedText || 'link text'}](https://example.com)`;
        break;
      case 'list':
        formattedText = `- ${selectedText || 'list item'}`;
        break;
      case 'orderedList':
        formattedText = `1. ${selectedText || 'list item'}`;
        break;
      case 'h1':
        formattedText = `# ${selectedText || 'Heading 1'}`;
        break;
      case 'h2':
        formattedText = `## ${selectedText || 'Heading 2'}`;
        break;
      case 'h3':
        formattedText = `### ${selectedText || 'Heading 3'}`;
        break;
      default:
        return;
    }

    const newContent = 
      textarea.value.substring(0, start) + 
      formattedText + 
      textarea.value.substring(end);
    
    handleContentChange(newContent);
    
    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setPost({
      ...post,
      title,
      seoTitle: title,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/posts">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                ← Back to Posts
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Create a Blog Post</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="mr-2 h-4 w-4" />
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => handleSave(false)}
              disabled={isSaving}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => handleSave(true)}
              disabled={isSaving}
            >
              {isSaving ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <Alert className="mb-6 border-green-500 bg-green-500/10 text-green-400">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Post {settings.isPublished ? 'published' : 'saved'} successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <Input
                placeholder="Enter your blog title"
                value={post.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="text-2xl font-bold bg-transparent border-white/20 text-white placeholder:text-white/60 h-16 text-xl"
              />
            </div>

            {/* Style Selector */}
            <div className="space-y-2">
              <Select value={post.style} onValueChange={(value) => setPost({ ...post, style: value })}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <Label className="text-white font-medium">Upload an Image</Label>
              <div className="flex gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={handleImageUpload}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
                <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Link className="mr-2 h-4 w-4" />
                      Add URL
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-white/20 text-white">
                    <DialogHeader>
                      <DialogTitle>Add Image URL</DialogTitle>
                      <DialogDescription className="text-white/70">
                        Enter the URL of an image to use as your featured image.
                      </DialogDescription>
                    </DialogHeader>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="bg-white/5 border-white/20 text-white"
                    />
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setImageDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleImageUrlAdd}>Add Image</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              {post.featuredImage && (
                <div className="mt-4">
                  <img
                    src={post.featuredImage}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-lg border border-white/20"
                  />
                </div>
              )}
            </div>

            {/* Formatting Toolbar */}
            <div className="bg-white/5 border border-white/20 rounded-lg p-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {/* Text Formatting */}
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('bold')}
                    className="text-white hover:bg-white/10"
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('italic')}
                    className="text-white hover:bg-white/10"
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('underline')}
                    className="text-white hover:bg-white/10"
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('strikethrough')}
                    className="text-white hover:bg-white/10"
                  >
                    <Strikethrough className="h-4 w-4" />
                  </Button>
                </div>

                <Separator orientation="vertical" className="h-8 bg-white/20" />

                {/* Alignment */}
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>

                <Separator orientation="vertical" className="h-8 bg-white/20" />

                {/* Lists and Formatting */}
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('list')}
                    className="text-white hover:bg-white/10"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('orderedList')}
                    className="text-white hover:bg-white/10"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('quote')}
                    className="text-white hover:bg-white/10"
                  >
                    <Quote className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('code')}
                    className="text-white hover:bg-white/10"
                  >
                    <Code className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('link')}
                    className="text-white hover:bg-white/10"
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                </div>

                <Separator orientation="vertical" className="h-8 bg-white/20" />

                {/* Headings */}
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('h1')}
                    className="text-white hover:bg-white/10 text-xs"
                  >
                    H1
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('h2')}
                    className="text-white hover:bg-white/10 text-xs"
                  >
                    H2
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('h3')}
                    className="text-white hover:bg-white/10 text-xs"
                  >
                    H3
                  </Button>
                </div>
              </div>

              {/* Content Editor */}
              {!previewMode ? (
                <Textarea
                  ref={contentRef}
                  placeholder="Write your blog post here..."
                  value={post.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="min-h-[400px] bg-transparent border-white/20 text-white placeholder:text-white/60 resize-none font-mono text-sm"
                />
              ) : (
                <div className="min-h-[400px] p-4 bg-white/5 rounded border border-white/20">
                  <div className="prose prose-invert max-w-none">
                    {post.content ? (
                      <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
                    ) : (
                      <p className="text-white/60 italic">Start writing to see preview...</p>
                    )}
                  </div>
                </div>
              )}

              {/* Word Count */}
              <div className="flex justify-between items-center mt-4 text-sm text-white/60">
                <div className="flex gap-4">
                  <span>{wordCount} words</span>
                  <span>{readTime} min read</span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-white/20 text-white/80">
                    {post.style}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card className="bg-white/5 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white">Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Publish Now</Label>
                  <Switch
                    checked={settings.isPublished}
                    onCheckedChange={(checked) => setSettings({ ...settings, isPublished: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-white">Schedule</Label>
                  <Switch
                    checked={settings.isScheduled}
                    onCheckedChange={(checked) => setSettings({ ...settings, isScheduled: checked })}
                  />
                </div>

                {settings.isScheduled && (
                  <Input
                    type="datetime-local"
                    value={settings.scheduledDate}
                    onChange={(e) => setSettings({ ...settings, scheduledDate: e.target.value })}
                    className="bg-white/5 border-white/20 text-white"
                  />
                )}

                <div className="space-y-2">
                  <Label className="text-white">Visibility</Label>
                  <Select 
                    value={settings.visibility} 
                    onValueChange={(value) => setSettings({ ...settings, visibility: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      <SelectItem value="public">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Public
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Private
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Categories and Tags */}
            <Card className="bg-white/5 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white">Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Category</Label>
                  <Select value={post.category} onValueChange={(value) => setPost({ ...post, category: value })}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Tags</Label>
                  <Input
                    placeholder="react, javascript, web-dev"
                    value={post.tags}
                    onChange={(e) => setPost({ ...post, tags: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Post Options */}
            <Card className="bg-white/5 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white">Post Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Allow Comments</Label>
                  <Switch
                    checked={settings.allowComments}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowComments: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-white">Featured Post</Label>
                  <Switch
                    checked={settings.isFeatured}
                    onCheckedChange={(checked) => setSettings({ ...settings, isFeatured: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card className="bg-white/5 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white">SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">SEO Title</Label>
                  <Input
                    placeholder="SEO optimized title"
                    value={post.seoTitle}
                    onChange={(e) => setPost({ ...post, seoTitle: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Meta Description</Label>
                  <Textarea
                    placeholder="Brief description for search engines"
                    value={post.seoDescription}
                    onChange={(e) => setPost({ ...post, seoDescription: e.target.value })}
                    rows={3}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">URL Slug</Label>
                  <Input
                    placeholder="post-url-slug"
                    value={generateSlug(post.title)}
                    readOnly
                    className="bg-white/5 border-white/20 text-white/60"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}