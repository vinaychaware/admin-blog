// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import {
//   Search,
//   Plus,
//   MoreHorizontal,
//   Edit,
//   Trash2,
//   Eye,
//   MessageSquare,
//   Heart,
//   Calendar,
//   Filter,
// } from "lucide-react";
// import Link from "next/link";

// // const posts = [
// //   {
// //     id: 1,
// //     title: "Building Modern Web Applications with Next.js",
// //     author: "John Doe",
// //     category: "Technology",
// //     status: "Published",
// //     views: 12340,
// //     comments: 23,
// //     likes: 156,
// //     publishedAt: "2025-01-02",
// //     createdAt: "2024-12-28",
// //   },
// //   {
// //     id: 2,
// //     title: "The Future of AI in Content Creation",
// //     author: "Jane Smith",
// //     category: "Technology",
// //     status: "Draft",
// //     views: 0,
// //     comments: 0,
// //     likes: 0,
// //     publishedAt: null,
// //     createdAt: "2025-01-01",
// //   },
// //   {
// //     id: 3,
// //     title: "Responsive Design Best Practices",
// //     author: "Mike Johnson",
// //     category: "Design",
// //     status: "Published",
// //     views: 8560,
// //     comments: 12,
// //     likes: 89,
// //     publishedAt: "2024-12-30",
// //     createdAt: "2024-12-25",
// //   },
// //   {
// //     id: 4,
// //     title: "Healthy Lifestyle Tips for Developers",
// //     author: "Sarah Wilson",
// //     category: "Health",
// //     status: "Published",
// //     views: 4320,
// //     comments: 34,
// //     likes: 67,
// //     publishedAt: "2024-12-28",
// //     createdAt: "2024-12-20",
// //   },
// //   {
// //     id: 5,
// //     title: "Investment Strategies for 2025",
// //     author: "Robert Brown",
// //     category: "Business",
// //     status: "Scheduled",
// //     views: 0,
// //     comments: 0,
// //     likes: 0,
// //     publishedAt: "2025-01-05",
// //     createdAt: "2024-12-15",
// //   },
// // ];

// export default function PostsPage() {
//  const [posts, setPosts] = useState<any[]>([]); // ✅ initialize as an array
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [categoryFilter, setCategoryFilter] = useState('all');

// useEffect(() => {
//   const fetchPosts = async () => {
//     try {
//       const res = await fetch("/api/posts");
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setPosts(data);
//       } else {
//         console.error("Expected array, got:", data);
//         setPosts([]); // fallback to avoid crash
//       }
//     } catch (err) {
//       console.error("Error fetching posts", err);
//       setPosts([]);
//     }
//   };

//   fetchPosts();
// }, []);

//   const filteredPosts = posts.filter((post) => {
//     const matchesSearch =
//       post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       post.author?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       statusFilter === 'all' || post.status?.toLowerCase() === statusFilter;
//     const matchesCategory =
//       categoryFilter === 'all' || post.category?.toLowerCase() === categoryFilter;

//     return matchesSearch && matchesStatus && matchesCategory;
//   });


//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
//           <p className="text-muted-foreground">
//             Manage your blog posts, edit content, and track performance.
//           </p>
//         </div>
//         <Link href="/admin/posts/new">
//           <Button>
//             <Plus className="mr-2 h-4 w-4" />
//             New Post
//           </Button>
//         </Link>
//       </div>

//       {/* Filters and Search */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Posts</CardTitle>
//           <CardDescription>
//             A list of all your blog posts with their current status and
//             performance metrics.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search posts..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-8"
//               />
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="published">Published</SelectItem>
//                 <SelectItem value="draft">Draft</SelectItem>
//                 <SelectItem value="scheduled">Scheduled</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter by category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 <SelectItem value="technology">Technology</SelectItem>
//                 <SelectItem value="design">Design</SelectItem>
//                 <SelectItem value="health">Health</SelectItem>
//                 <SelectItem value="business">Business</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filteredPosts.map((post) => (
//               <Card key={post.id} className="flex flex-row overflow-hidden">
//                 <Link
//                   href={`/posts/${post.id}`}
//                   className="w-1/3 cursor-pointer"
//                 >
//                   <img
//                     src={`/images/post-${post.id}.jpg`} // Use dynamic or static image
//                     alt={post.title}
//                     className="object-cover h-full w-full"
//                   />
//                 </Link>
//                 <div className="p-4 w-2/3 flex flex-col justify-between">
//                   <div>
//                     <Link href={`/posts/${post.id}`}>
//                       <h3 className="text-lg font-semibold hover:underline cursor-pointer">
//                         {post.title}
//                       </h3>
//                     </Link>
//                     <p className="text-sm text-muted-foreground">
//                       {post.author} • {post.category}
//                     </p>
//                     <Badge
//                       className={`mt-2 w-fit ${getStatusColor(post.status)}`}
//                     >
//                       {post.status}
//                     </Badge>
//                   </div>
//                   <div className="flex justify-end gap-2 mt-4">
//                     <Link href={`/admin/posts/${post.id}/edit`}>
//                       <Button size="sm" variant="outline">
//                         <Edit className="h-4 w-4 mr-1" /> Edit
//                       </Button>
//                     </Link>
//                     <AlertDialog>
//                       <AlertDialogTrigger asChild>
//                         <Button size="sm" variant="destructive">
//                           <Trash2 className="h-4 w-4 mr-1" /> Delete
//                         </Button>
//                       </AlertDialogTrigger>
//                       <AlertDialogContent>
//                         <AlertDialogHeader>
//                           <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                           <AlertDialogDescription>
//                             This will permanently delete "{post.title}".
//                           </AlertDialogDescription>
//                         </AlertDialogHeader>
//                         <AlertDialogFooter>
//                           <AlertDialogCancel>Cancel</AlertDialogCancel>
//                           <AlertDialogAction className="bg-red-600 hover:bg-red-700">
//                             Delete
//                           </AlertDialogAction>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>

//           {filteredPosts.length === 0 && (
//             <div className="text-center py-12">
//               <h3 className="text-lg font-medium text-gray-900">
//                 No posts found
//               </h3>
//               <p className="text-gray-500 mt-1">
//                 {searchTerm ||
//                 statusFilter !== "all" ||
//                 categoryFilter !== "all"
//                   ? "Try adjusting your search or filter criteria."
//                   : "Get started by creating your first blog post."}
//               </p>
//               {!searchTerm &&
//                 statusFilter === "all" &&
//                 categoryFilter === "all" && (
//                   <Link href="/admin/posts/new">
//                     <Button className="mt-4">
//                       <Plus className="mr-2 h-4 w-4" />
//                       Create Post
//                     </Button>
//                   </Link>
//                 )}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  Heart,
  Calendar,
  Filter,
} from 'lucide-react';
import Link from 'next/link';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { AlertDialogHeader, AlertDialogFooter } from '@/components/ui/alert-dialog';

export default function PostsPage() {
   const [posts, setPosts] = useState<any[]>([]); // ✅ initialize as an array
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error("Expected array, got:", data);
        setPosts([]); // fallback to avoid crash
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
      post.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || post.status?.toLowerCase() === statusFilter;
    const matchesCategory =
      categoryFilter === 'all' || post.category?.toLowerCase() === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-gray-100 text-gray-800'; // default or fallback
    switch (status.toLowerCase()) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
          <Card key={post._id} className="relative">
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
                {post.userEmail}
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