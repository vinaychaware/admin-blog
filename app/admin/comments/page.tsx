'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Search,
  MoreHorizontal,
  Check,
  X,
  Reply,
  Eye,
  Trash2,
  Flag,
  MessageSquare,
  ThumbsUp,
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
} from 'lucide-react';
import Link from 'next/link';

// Mock data for comments
const comments = [
  {
    id: 1,
    content: 'This is an excellent article! I really enjoyed reading about the latest developments in Next.js. The examples were very helpful and easy to follow.',
    author: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    post: {
      id: 1,
      title: 'Building Modern Web Applications with Next.js',
    },
    status: 'approved',
    likes: 12,
    replies: 3,
    createdAt: '2025-01-02T10:30:00Z',
    isSpam: false,
    ipAddress: '192.168.1.100',
  },
  {
    id: 2,
    content: 'I disagree with some of the points made here. While Next.js is great, there are other frameworks that might be better suited for certain use cases.',
    author: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    post: {
      id: 1,
      title: 'Building Modern Web Applications with Next.js',
    },
    status: 'pending',
    likes: 5,
    replies: 1,
    createdAt: '2025-01-01T15:45:00Z',
    isSpam: false,
    ipAddress: '192.168.1.101',
  },
  {
    id: 3,
    content: 'Great insights on AI and content creation! This technology is definitely changing how we approach writing and creativity.',
    author: {
      name: 'Carol Davis',
      email: 'carol@example.com',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    post: {
      id: 2,
      title: 'The Future of AI in Content Creation',
    },
    status: 'approved',
    likes: 8,
    replies: 2,
    createdAt: '2024-12-30T09:20:00Z',
    isSpam: false,
    ipAddress: '192.168.1.102',
  },
  {
    id: 4,
    content: 'This is spam content with promotional links and irrelevant information that should be moderated.',
    author: {
      name: 'Spam User',
      email: 'spam@example.com',
      avatar: '',
    },
    post: {
      id: 3,
      title: 'Responsive Design Best Practices',
    },
    status: 'rejected',
    likes: 0,
    replies: 0,
    createdAt: '2024-12-28T14:10:00Z',
    isSpam: true,
    ipAddress: '192.168.1.103',
  },
  {
    id: 5,
    content: 'Thanks for sharing these health tips! As a developer, I often forget to take care of my physical health while focusing on code.',
    author: {
      name: 'David Wilson',
      email: 'david@example.com',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    post: {
      id: 4,
      title: 'Healthy Lifestyle Tips for Developers',
    },
    status: 'approved',
    likes: 15,
    replies: 4,
    createdAt: '2024-12-25T11:30:00Z',
    isSpam: false,
    ipAddress: '192.168.1.104',
  },
];

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<typeof comments[0] | null>(null);
  const [commentToDelete, setCommentToDelete] = useState<typeof comments[0] | null>(null);
  const [replyContent, setReplyContent] = useState('');
const [commentList, setCommentList] = useState<typeof comments>([]);

  const filteredComments = commentList.filter((comment) => {
    const matchesSearch = 
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
const stats = {
  total: commentList.length,
  approved: commentList.filter(c => c.status === 'approved').length,
  pending: commentList.filter(c => c.status === 'pending').length,
  spam: commentList.filter(c => c.isSpam).length,
};

useEffect(() => {
  const stored = localStorage.getItem('comments');
  if (stored) {
    setCommentList(JSON.parse(stored));
  } else {
    setCommentList(comments); 
  }
}, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="h-3 w-3" />;
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'rejected':
        return <X className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleApprove = (commentId: number) => {
    console.log('Approving comment:', commentId);
    // Add your approval logic here
  };

  const handleReject = (commentId: number) => {
    console.log('Rejecting comment:', commentId);
    // Add your rejection logic here
  };

  const handleMarkAsSpam = (commentId: number) => {
    console.log('Marking as spam:', commentId);
    // Add your spam marking logic here
  };

const handleDelete = () => {
  if (commentToDelete) {
    const updatedList = commentList.filter((c) => c.id !== commentToDelete.id);
    setCommentList(updatedList);
    localStorage.setItem('comments', JSON.stringify(updatedList));
    setDeleteDialogOpen(false);
    setCommentToDelete(null);
  }
};


  const handleReply = () => {
    if (selectedComment && replyContent.trim()) {
      console.log('Replying to comment:', selectedComment.id, 'with:', replyContent);
      // Add your reply logic here
      setReplyDialogOpen(false);
      setSelectedComment(null);
      setReplyContent('');
    }
  };

  const openDeleteDialog = (comment: typeof comments[0]) => {
    setCommentToDelete(comment);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Comments</h1>
          <p className="text-muted-foreground">
            Manage and moderate comments across all your blog posts.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.approved / stats.total) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting moderation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spam Detected</CardTitle>
            <Flag className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.spam}</div>
            <p className="text-xs text-muted-foreground">
              Automatically flagged
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Comments Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Comments</CardTitle>
          <CardDescription>
            Review, moderate, and manage comments from your blog readers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search comments, authors, or posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Comment</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Post</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComments.map((comment) => (
                  <TableRow key={comment.id} className="hover:bg-muted/50">
                    <TableCell className="max-w-md">
                      <div className="space-y-2">
                        <p className="text-sm line-clamp-3">{comment.content}</p>
                        {comment.isSpam && (
                          <Badge variant="destructive" className="text-xs">
                            <Flag className="mr-1 h-3 w-3" />
                            Flagged as spam
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                          <AvatarFallback>
                            {comment.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{comment.author.name}</p>
                          <p className="text-xs text-muted-foreground">{comment.author.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                    <Link
                      href={`/admin/posts/${comment.post.id}/edit`}
                      className="text-sm hover:text-blue-600 transition-colors line-clamp-2"
                    >
                      {comment.post.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                      <Badge className={getStatusColor(comment.status)}>
                        {getStatusIcon(comment.status)}
                        <span className="ml-1 capitalize">{comment.status}</span>
                      </Badge>
                    </TableCell>
                  <TableCell>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {comment.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Reply className="h-3 w-3" />
                          {comment.replies}
                        </div>
                      </div>
                    </TableCell>
                  <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(comment.createdAt)}
                      </div>
                    </TableCell>
                  <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>

                          {comment.status === 'pending' && (
                            <>
                              <DropdownMenuItem onClick={() => handleApprove(comment.id)}>
                                <Check className="mr-2 h-4 w-4 text-green-600" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReject(comment.id)}>
                                <X className="mr-2 h-4 w-4 text-red-600" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}

                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedComment(comment);
                              setReplyDialogOpen(true);
                            } }
                          >
                            <Reply className="mr-2 h-4 w-4" />
                            Reply
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          {!comment.isSpam && (
                            <DropdownMenuItem onClick={() => handleMarkAsSpam(comment.id)}>
                              <Flag className="mr-2 h-4 w-4 text-orange-600" />
                              Mark as Spam
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => openDeleteDialog(comment)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredComments.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No comments found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No comments have been posted yet.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Reply to Comment</DialogTitle>
            <DialogDescription>
              Respond to {selectedComment?.author.name}s comment
            </DialogDescription>
          </DialogHeader>
          
          {selectedComment && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={selectedComment.author.avatar} alt={selectedComment.author.name} />
                    <AvatarFallback className="text-xs">
                      {selectedComment.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">{selectedComment.author.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{selectedComment.content}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reply">Your Reply</Label>
                <Textarea
                  id="reply"
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReply} disabled={!replyContent.trim()}>
              <Reply className="mr-2 h-4 w-4" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the comment
              from {commentToDelete?.author.name} and remove it from the post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCommentToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete Comment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}