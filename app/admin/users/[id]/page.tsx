'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  Mail,
  Calendar,
  Edit,
  Save,
  Camera,
  Shield,
  FileText,
  MessageSquare,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowLeft,
  Loader2,
  MapPin,
  Globe,
  Twitter,
  Linkedin,
} from 'lucide-react';
import Link from 'next/link';

// Define the User type based on our API response
type UserProfile = {
  id: string;
  name: string | null;
  email: string;
  emailVerified?: string | null;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  role?: string | null;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  posts?: Array<{
    id: string;
    title: string;
    slug?: string;
    views: number;
    comments: any[];
    createdAt: string;
    _count?: {
      comments: number;
    };
  }>;
  comments?: Array<{
    id: string;
    desc: string;
    post: {
      title: string;
      slug?: string;
    };
    createdAt: string;
  }>;
  _count?: {
    posts: number;
    comments: number;
  };
};

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    location: '',
    website: '',
    twitter: '',
    linkedin: '',
    role: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/users/${userId}`, {
          cache: 'no-store',
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'User not found');
        }
        
        const userData = await response.json();
        setUser(userData);
        
        // Initialize edit form
        setEditForm({
          name: userData.name || '',
          bio: userData.bio || '',
          location: userData.location || '',
          website: userData.website || '',
          twitter: userData.twitter || '',
          linkedin: userData.linkedin || '',
          role: userData.role || 'Author',
        });
      } catch (err: any) {
        console.error('Error fetching user:', err);
        setError(err.message || 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }
      
      const updatedUser = await response.json();
      setUser(updatedUser);
      
      setIsEditing(false);
      setSaveSuccess(true);
      
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error updating user:', err);
      alert(`Failed to update user: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (!user) return;
    
    setEditForm({
      name: user.name || '',
      bio: user.bio || '',
      location: user.location || '',
      website: user.website || '',
      twitter: user.twitter || '',
      linkedin: user.linkedin || '',
      role: user.role || 'Author',
    });
    setIsEditing(false);
  };

  const handleImageUpdate = async () => {
    if (!newImageUrl.trim() || !user) return;
    
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: newImageUrl }),
      });
      
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setNewImageUrl('');
        setImageDialogOpen(false);
      }
    } catch (err: any) {
      console.error('Error updating image:', err);
      alert(`Failed to update image: ${err.message}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.slice(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading user profile...</span>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400">{error || 'The requested user could not be found.'}</p>
          </div>
          <Link href="/admin/users">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Users
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Users
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
            <p className="text-muted-foreground">
              View and manage user account information.
            </p>
          </div>
        </div>
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
                    <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
                    <AvatarFallback className="text-lg">
                      {getInitials(user.name, user.email)}
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
                          Enter a new image URL to update the profile picture.
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
                  <h3 className="text-xl font-semibold">{user.name || 'Unnamed User'}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      <Shield className="mr-1 h-3 w-3" />
                      {user.role || 'Author'}
                    </Badge>
                    {user.emailVerified && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
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
                      placeholder="Enter full name"
                    />
                  ) : (
                    <p className="text-sm py-2">{user.name || 'Not provided'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  {isEditing ? (
                    <Select value={editForm.role} onValueChange={(value) => setEditForm({ ...editForm, role: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Editor">Editor</SelectItem>
                        <SelectItem value="Author">Author</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm py-2">{user.role || 'Author'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Location
                  </Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      placeholder="Enter location"
                    />
                  ) : (
                    <p className="text-sm py-2">{user.location || 'Not provided'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">
                    <Globe className="inline h-4 w-4 mr-1" />
                    Website
                  </Label>
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
                  <Label htmlFor="twitter">
                    <Twitter className="inline h-4 w-4 mr-1" />
                    Twitter
                  </Label>
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

                <div className="space-y-2">
                  <Label htmlFor="linkedin">
                    <Linkedin className="inline h-4 w-4 mr-1" />
                    LinkedIn
                  </Label>
                  {isEditing ? (
                    <Input
                      id="linkedin"
                      value={editForm.linkedin}
                      onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                      placeholder="linkedin.com/in/username"
                    />
                  ) : (
                    <p className="text-sm py-2">{user.linkedin || 'Not provided'}</p>
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
                    placeholder="Tell us about this user..."
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
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
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
                    {user._count?.posts || user.posts?.length || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    {(user.posts?.reduce((sum, post) => sum + post.views, 0) || 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    {user._count?.comments || user.comments?.length || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Comments</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                    ❤️ {user.posts?.reduce((sum, post) => sum + (post._count?.comments || post.comments?.length || 0), 0) || 0}
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
              {user.posts && user.posts.length > 0 ? (
                <>
                  {user.posts.slice(0, 3).map((post) => (
                    <div key={post.id} className="space-y-2 p-3 border rounded-lg">
                      <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Published
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
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No posts yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Comments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.comments && user.comments.length > 0 ? (
                <>
                  {user.comments.slice(0, 2).map((comment) => (
                    <div key={comment.id} className="space-y-2 p-3 border rounded-lg">
                      <p className="text-sm line-clamp-2">{comment.desc}</p>
                      <div className="text-xs text-muted-foreground">
                        on "{comment.post.title}"
                      </div>
                    </div>
                  ))}
                  <Link href="/admin/comments">
                    <Button variant="outline" className="w-full">
                      View All Comments
                    </Button>
                  </Link>
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No comments yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}