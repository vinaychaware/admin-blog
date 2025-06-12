'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
  User,
  Mail,
  Calendar,
  Edit,
  Save,
  Upload,
  Camera,
  Shield,
  FileText,
  MessageSquare,
  Eye,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

// Mock user data based on the schema
const mockUser = {
  id: 'cuid_example_123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  emailVerified: '2024-01-15T10:30:00Z',
  image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
  createdAt: '2024-01-15T08:00:00Z',
  updatedAt: '2025-01-02T14:30:00Z',
  role: 'Admin',
  bio: 'Passionate blogger and content creator with over 5 years of experience in web development and digital marketing.',
  location: 'San Francisco, CA',
  website: 'https://johndoe.dev',
  twitter: '@johndoe',
  linkedin: 'linkedin.com/in/johndoe',
  posts: [
    {
      id: '1',
      title: 'Building Modern Web Applications with Next.js',
      status: 'Published',
      views: 12340,
      comments: 23,
      createdAt: '2025-01-02T10:00:00Z',
    },
    {
      id: '2',
      title: 'The Future of AI in Content Creation',
      status: 'Draft',
      views: 0,
      comments: 0,
      createdAt: '2025-01-01T15:30:00Z',
    },
    {
      id: '3',
      title: 'Responsive Design Best Practices',
      status: 'Published',
      views: 8560,
      comments: 12,
      createdAt: '2024-12-30T09:20:00Z',
    },
  ],
  comments: [
    {
      id: '1',
      content: 'Great article! Very helpful insights.',
      postTitle: 'Building Modern Web Applications',
      createdAt: '2025-01-02T11:30:00Z',
    },
    {
      id: '2',
      content: 'Thanks for sharing this valuable information.',
      postTitle: 'Responsive Design Best Practices',
      createdAt: '2024-12-30T14:15:00Z',
    },
  ],
  stats: {
    totalPosts: 15,
    totalViews: 45230,
    totalComments: 156,
    totalLikes: 892,
  },
};

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name || '',
    bio: user.bio || '',
    location: user.location || '',
    website: user.website || '',
    twitter: user.twitter || '',
    linkedin: user.linkedin || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUser({
      ...user,
      ...editForm,
      updatedAt: new Date().toISOString(),
    });
    
    setIsEditing(false);
    setIsSaving(false);
    setSaveSuccess(true);
    
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name || '',
      bio: user.bio || '',
      location: user.location || '',
      website: user.website || '',
      twitter: user.twitter || '',
      linkedin: user.linkedin || '',
    });
    setIsEditing(false);
  };

  const handleImageUpdate = () => {
    if (newImageUrl.trim()) {
      setUser({
        ...user,
        image: newImageUrl,
        updatedAt: new Date().toISOString(),
      });
      setNewImageUrl('');
      setImageDialogOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and view your activity.
          </p>
        </div>
        <Link href="/admin/profile/edit">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Button>
        </Link>
      </div>

      {/* Success Alert */}
      {saveSuccess && (
        <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Profile updated successfully!
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.image || ''} alt={user.name || 'User'} />
                    <AvatarFallback className="text-lg">
                      {user.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Profile Picture</DialogTitle>
                        <DialogDescription>
                          Enter a new image URL to update your profile picture.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="imageUrl">Image URL</Label>
                          <Input
                            id="imageUrl"
                            placeholder="https://example.com/image.jpg"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                          />
                        </div>
                        {newImageUrl && (
                          <div className="space-y-2">
                            <Label>Preview</Label>
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={newImageUrl} alt="Preview" />
                              <AvatarFallback>Preview</AvatarFallback>
                            </Avatar>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setImageDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleImageUpdate} disabled={!newImageUrl.trim()}>
                          Update Picture
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      <Shield className="mr-1 h-3 w-3" />
                      {user.role}
                    </Badge>
                    {user.emailVerified && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Editable Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-sm py-2">{user.name || 'Not provided'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      placeholder="Enter your location"
                    />
                  ) : (
                    <p className="text-sm py-2">{user.location || 'Not provided'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  {isEditing ? (
                    <Input
                      id="website"
                      value={editForm.website}
                      onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                      placeholder="https://yourwebsite.com"
                    />
                  ) : (
                    <p className="text-sm py-2">
                      {user.website ? (
                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {user.website}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  {isEditing ? (
                    <Input
                      id="twitter"
                      value={editForm.twitter}
                      onChange={(e) => setEditForm({ ...editForm, twitter: e.target.value })}
                      placeholder="@username"
                    />
                  ) : (
                    <p className="text-sm py-2">{user.twitter || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                ) : (
                  <p className="text-sm py-2">{user.bio || 'No bio provided'}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>User ID</Label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">{user.id}</p>
                </div>
                <div className="space-y-2">
                  <Label>Email Status</Label>
                  <div className="flex items-center gap-2">
                    {user.emailVerified ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Unverified
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Member Since</Label>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(user.createdAt)}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Last Updated</Label>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {formatDate(user.updatedAt)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    {user.stats.totalPosts}
                  </div>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    {user.stats.totalViews.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    {user.stats.totalComments}
                  </div>
                  <p className="text-xs text-muted-foreground">Comments</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                    ❤️ {user.stats.totalLikes}
                  </div>
                  <p className="text-xs text-muted-foreground">Likes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.posts.slice(0, 3).map((post) => (
                <div key={post.id} className="space-y-2 p-3 border rounded-lg">
                  <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      {post.views}
                    </div>
                  </div>
                </div>
              ))}
              <Link href="/admin/posts">
                <Button variant="outline" className="w-full">
                  View All Posts
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Comments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.comments.slice(0, 2).map((comment) => (
                <div key={comment.id} className="space-y-2 p-3 border rounded-lg">
                  <p className="text-sm line-clamp-2">{comment.content}</p>
                  <div className="text-xs text-muted-foreground">
                    on "{comment.postTitle}"
                  </div>
                </div>
              ))}
              <Link href="/admin/comments">
                <Button variant="outline" className="w-full">
                  View All Comments
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}