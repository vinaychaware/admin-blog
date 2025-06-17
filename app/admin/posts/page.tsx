'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Expected array, got:", data);
          setPosts([]);
        }
      } catch (err) {
        console.error("Error fetching posts", err);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">
            Manage your blog posts, edit content, and track performance.
          </p>
        </div>
        <Link href="/admin/posts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        </Link>
      </div>

      <div className="relative w-full max-w-xl">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search posts by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="relative">
            <img
              src={post.img || '/placeholder.png'}
              alt="Post thumbnail"
              className="w-full h-48 object-cover rounded-t-md"
            />
            <CardHeader>
              <CardTitle className="line-clamp-2 text-lg font-semibold">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {post.user?.name || post.userEmail}
              </p>
              <div className="flex items-center text-xs text-muted-foreground mb-3">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <div className="flex justify-between">
                <Link href={`/admin/posts/${post.slug}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-4 w-4" /> Edit
                  </Button>
                </Link>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-1 h-4 w-4" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No posts found</h3>
          <p className="text-gray-500 mt-1">
            {searchTerm ? 'Try adjusting your search term.' : 'Create your first blog post to get started.'}
          </p>
          {!searchTerm && (
            <Link href="/admin/posts/new">
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" /> Create Post
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}