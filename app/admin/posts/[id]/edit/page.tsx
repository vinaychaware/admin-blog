'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Edit3,
  Plus,
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  Save,
  X,
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

const EditPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    // ... existing posts data
  ]);

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [editForm, setEditForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    category: '',
    tags: ''
  });

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setEditForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      status: post.status,
      category: post.category,
      tags: post.tags.join(', ')
    });
    setIsEditDialogOpen(true);
  };

  const handleSavePost = async () => {
    if (!selectedPost) return;
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update the post in the list
    setPosts(posts.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          title: editForm.title,
          slug: editForm.slug,
          excerpt: editForm.excerpt,
          content: editForm.content,
          status: editForm.status,
          category: editForm.category,
          tags: editForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return post;
    }));
    
    setIsSaving(false);
    setSaveSuccess(true);
    setIsEditDialogOpen(false);
    
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeletePost = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Published
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            Draft
          </Badge>
        );
      case 'archived':
        return (
          <Badge variant="secondary">
            <AlertCircle className="w-3 h-3 mr-1" />
            Archived
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusCount = (status: string) => {
    if (status === 'all') return posts.length;
    return posts.filter(post => post.status === status).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Posts</h1>
          <p className="text-muted-foreground">
            Manage and edit your blog posts
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Success Alert */}
      {saveSuccess && (
        <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Post updated successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* ... existing stats cards ... */}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts by title, content, author, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Horizontal Blog Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Posts ({filteredPosts.length})</CardTitle>
          <CardDescription>
            {filteredPosts.length === posts.length 
              ? "All your blog posts" 
              : `Showing ${filteredPosts.length} of ${posts.length} posts`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No posts found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="cursor-pointer transition-shadow hover:shadow-lg"
                  onClick={() => handleEditPost(post)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      {getStatusBadge(post.status)}
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-1">
                      <Badge variant="outline">{post.category}</Badge>
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {post.updatedAt}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <Eye className="mr-2 h-4 w-4" />
                        {post.views.toLocaleString()} views
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePost(post.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog (same as before) */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        {/* ... existing dialog code ... */}
      </Dialog>
    </div>
  );
};

export default EditPage;