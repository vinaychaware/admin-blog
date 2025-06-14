// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Badge } from '@/components/ui/badge';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import {
//   Edit3,
//   Plus,
//   Search,
//   Filter,
//   Eye,
//   Trash2,
//   Calendar,
//   User,
//   CheckCircle,
//   Clock,
//   AlertCircle,
//   Save,
//   X,
// } from 'lucide-react';

// interface BlogPost {
//   id: string;
//   title: string;
//   slug: string;
//   excerpt: string;
//   content: string;
//   status: 'draft' | 'published' | 'archived';
//   category: string;
//   tags: string[];
//   author: string;
//   createdAt: string;
//   updatedAt: string;
//   views: number;
//   featuredImage?: string;
// }

// const initialPosts: BlogPost[] = [
//   {
//     id: '1',
//     title: 'Getting Started with React and TypeScript',
//     slug: 'getting-started-react-typescript',
//     excerpt: 'Learn how to set up a modern React application with TypeScript for better type safety and developer experience. This comprehensive guide covers everything from initial setup to advanced patterns.',
//     content: `# Getting Started with React and TypeScript

// React and TypeScript make a powerful combination for building robust web applications. In this guide, we'll explore how to set up and work with both technologies.

// ## Why TypeScript with React?

// TypeScript brings static type checking to JavaScript, which helps catch errors early and provides better IDE support. When combined with React, it offers:

// - Better IntelliSense and autocomplete
// - Compile-time error checking
// - Improved refactoring capabilities
// - Self-documenting code

// ## Setting Up Your Project

// First, create a new React project with TypeScript:

// \`\`\`bash
// npx create-react-app my-app --template typescript
// cd my-app
// npm start
// \`\`\`

// ## Basic Component Example

// Here's a simple TypeScript React component:

// \`\`\`tsx
// interface Props {
//   name: string;
//   age?: number;
// }

// const UserCard: React.FC<Props> = ({ name, age }) => {
//   return (
//     <div className="user-card">
//       <h2>{name}</h2>
//       {age && <p>Age: {age}</p>}
//     </div>
//   );
// };
// \`\`\`

// ## Conclusion

// TypeScript with React provides a solid foundation for building scalable applications. Start small and gradually adopt more advanced TypeScript features as you become comfortable.`,
//     status: 'published',
//     category: 'Development',
//     tags: ['React', 'TypeScript', 'Frontend', 'JavaScript'],
//     author: 'John Doe',
//     createdAt: '2024-01-15',
//     updatedAt: '2024-01-20',
//     views: 1250,
//     featuredImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800'
//   },
//   {
//     id: '2',
//     title: 'Advanced CSS Grid Techniques for Modern Layouts',
//     slug: 'advanced-css-grid-techniques',
//     excerpt: 'Explore advanced CSS Grid features and learn how to create complex, responsive layouts with ease. Master grid areas, auto-placement, and advanced alignment techniques.',
//     content: `# Advanced CSS Grid Techniques

// CSS Grid has revolutionized how we approach layout design. Let's dive into some advanced techniques that will take your layouts to the next level.

// ## Grid Template Areas

// One of the most powerful features of CSS Grid is template areas:

// \`\`\`css
// .container {
//   display: grid;
//   grid-template-areas: 
//     "header header header"
//     "sidebar main aside"
//     "footer footer footer";
//   grid-template-columns: 200px 1fr 200px;
//   grid-template-rows: auto 1fr auto;
//   min-height: 100vh;
// }

// .header { grid-area: header; }
// .sidebar { grid-area: sidebar; }
// .main { grid-area: main; }
// .aside { grid-area: aside; }
// .footer { grid-area: footer; }
// \`\`\`

// ## Auto-Placement and Dense Packing

// CSS Grid can automatically place items:

// \`\`\`css
// .gallery {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   grid-auto-flow: dense;
//   gap: 1rem;
// }

// .gallery-item:nth-child(3n) {
//   grid-column: span 2;
// }
// \`\`\`

// ## Responsive Grids Without Media Queries

// Create responsive layouts without media queries:

// \`\`\`css
// .responsive-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 2rem;
// }
// \`\`\`

// ## Conclusion

// CSS Grid provides incredible flexibility for creating modern layouts. These advanced techniques will help you build more sophisticated and responsive designs.`,
//     status: 'draft',
//     category: 'Design',
//     tags: ['CSS', 'Grid', 'Layout', 'Responsive Design'],
//     author: 'Jane Smith',
//     createdAt: '2024-01-10',
//     updatedAt: '2024-01-18',
//     views: 890,
//     featuredImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'
//   },
//   {
//     id: '3',
//     title: 'Building Scalable REST APIs with Node.js and Express',
//     slug: 'building-rest-apis-nodejs',
//     excerpt: 'A comprehensive guide to building scalable REST APIs using Node.js and Express. Learn about middleware, authentication, error handling, and best practices.',
//     content: `# Building Scalable REST APIs with Node.js

// Node.js and Express provide a powerful platform for building REST APIs. Let's explore how to create scalable and maintainable APIs.

// ## Project Setup

// Start by setting up your Node.js project:

// \`\`\`bash
// mkdir my-api
// cd my-api
// npm init -y
// npm install express cors helmet morgan dotenv
// npm install -D nodemon
// \`\`\`

// ## Basic Express Server

// Create a basic Express server:

// \`\`\`javascript
// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(helmet());
// app.use(cors());
// app.use(morgan('combined'));
// app.use(express.json());

// // Routes
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// app.listen(PORT, () => {
//   console.log(\`Server running on port \${PORT}\`);
// });
// \`\`\`

// ## Error Handling Middleware

// Implement proper error handling:

// \`\`\`javascript
// const errorHandler = (err, req, res, next) => {
//   console.error(err.stack);
  
//   if (err.name === 'ValidationError') {
//     return res.status(400).json({
//       error: 'Validation Error',
//       details: err.message
//     });
//   }
  
//   res.status(500).json({
//     error: 'Internal Server Error',
//     message: process.env.NODE_ENV === 'production' 
//       ? 'Something went wrong' 
//       : err.message
//   });
// };

// app.use(errorHandler);
// \`\`\`

// ## Authentication Middleware

// Add JWT authentication:

// \`\`\`javascript
// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
  
//   if (!token) {
//     return res.status(401).json({ error: 'Access token required' });
//   }
  
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: 'Invalid token' });
//     }
//     req.user = user;
//     next();
//   });
// };
// \`\`\`

// ## Best Practices

// 1. **Use environment variables** for configuration
// 2. **Implement proper logging** with structured logs
// 3. **Add rate limiting** to prevent abuse
// 4. **Use validation libraries** like Joi or express-validator
// 5. **Implement proper CORS** policies
// 6. **Add comprehensive testing** with Jest or Mocha

// ## Conclusion

// Building scalable REST APIs requires careful planning and adherence to best practices. Focus on security, performance, and maintainability from the start.`,
//     status: 'published',
//     category: 'Backend',
//     tags: ['Node.js', 'API', 'Express', 'Backend', 'REST'],
//     author: 'Mike Johnson',
//     createdAt: '2024-01-05',
//     updatedAt: '2024-01-12',
//     views: 2100,
//     featuredImage: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'
//   },
//   {
//     id: '4',
//     title: 'Modern JavaScript ES2024 Features You Should Know',
//     slug: 'modern-javascript-es2024-features',
//     excerpt: 'Discover the latest JavaScript features introduced in ES2024. Learn about new syntax, improved performance, and developer experience enhancements.',
//     content: `# Modern JavaScript ES2024 Features

// JavaScript continues to evolve with new features that improve developer experience and code quality. Let's explore the latest additions in ES2024.

// ## Array Grouping

// Group array elements by a key:

// \`\`\`javascript
// const users = [
//   { name: 'Alice', role: 'admin' },
//   { name: 'Bob', role: 'user' },
//   { name: 'Charlie', role: 'admin' }
// ];

// const groupedByRole = Object.groupBy(users, user => user.role);
// // { admin: [...], user: [...] }
// \`\`\`

// ## Promise.withResolvers()

// A new way to create promises:

// \`\`\`javascript
// const { promise, resolve, reject } = Promise.withResolvers();

// // Use resolve/reject from outside the promise
// setTimeout(() => resolve('Done!'), 1000);

// promise.then(console.log); // 'Done!' after 1 second
// \`\`\`

// ## Temporal API (Stage 3)

// Better date and time handling:

// \`\`\`javascript
// import { Temporal } from '@js-temporal/polyfill';

// const now = Temporal.Now.plainDateTimeISO();
// const birthday = Temporal.PlainDate.from('1990-05-15');
// const age = now.toPlainDate().since(birthday).years;
// \`\`\`

// ## Pattern Matching (Proposal)

// Powerful pattern matching syntax:

// \`\`\`javascript
// const result = match (value) {
//   when ({ type: 'user', active: true }) -> 'Active user',
//   when ({ type: 'user', active: false }) -> 'Inactive user',
//   when ({ type: 'admin' }) -> 'Administrator',
//   when (null) -> 'No data',
//   else -> 'Unknown'
// };
// \`\`\`

// ## Improved Error Handling

// Better error context with cause:

// \`\`\`javascript
// try {
//   await fetchUserData();
// } catch (originalError) {
//   throw new Error('Failed to load user', { 
//     cause: originalError 
//   });
// }
// \`\`\`

// ## Conclusion

// These new JavaScript features enhance code readability, performance, and developer experience. Start experimenting with them in your projects today!`,
//     status: 'published',
//     category: 'Development',
//     tags: ['JavaScript', 'ES2024', 'Modern JS', 'Features'],
//     author: 'Sarah Wilson',
//     createdAt: '2024-01-08',
//     updatedAt: '2024-01-15',
//     views: 1680,
//     featuredImage: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800'
//   },
//   {
//     id: '5',
//     title: 'The Complete Guide to Web Performance Optimization',
//     slug: 'web-performance-optimization-guide',
//     excerpt: 'Master web performance optimization with this comprehensive guide. Learn about Core Web Vitals, image optimization, caching strategies, and modern performance techniques.',
//     content: `# The Complete Guide to Web Performance Optimization

// Web performance is crucial for user experience and SEO. Let's explore comprehensive strategies to optimize your website's performance.

// ## Core Web Vitals

// Focus on these key metrics:

// ### Largest Contentful Paint (LCP)
// - Target: < 2.5 seconds
// - Optimize images and fonts
// - Use CDN for faster delivery
// - Implement lazy loading

// ### First Input Delay (FID)
// - Target: < 100 milliseconds
// - Minimize JavaScript execution time
// - Use web workers for heavy tasks
// - Optimize third-party scripts

// ### Cumulative Layout Shift (CLS)
// - Target: < 0.1
// - Set dimensions for images and videos
// - Avoid inserting content above existing content
// - Use CSS transforms for animations

// ## Image Optimization

// Modern image optimization techniques:

// \`\`\`html
// <picture>
//   <source srcset="image.avif" type="image/avif">
//   <source srcset="image.webp" type="image/webp">
//   <img src="image.jpg" alt="Description" loading="lazy">
// </picture>
// \`\`\`

// ## Caching Strategies

// Implement effective caching:

// \`\`\`javascript
// // Service Worker caching
// self.addEventListener('fetch', event => {
//   if (event.request.destination === 'image') {
//     event.respondWith(
//       caches.open('images').then(cache => {
//         return cache.match(event.request).then(response => {
//           return response || fetch(event.request).then(fetchResponse => {
//             cache.put(event.request, fetchResponse.clone());
//             return fetchResponse;
//           });
//         });
//       })
//     );
//   }
// });
// \`\`\`

// ## Code Splitting

// Split your JavaScript bundles:

// \`\`\`javascript
// // Dynamic imports
// const LazyComponent = lazy(() => import('./LazyComponent'));

// // Route-based splitting
// const Home = lazy(() => import('./pages/Home'));
// const About = lazy(() => import('./pages/About'));
// \`\`\`

// ## Resource Hints

// Use resource hints for better loading:

// \`\`\`html
// <link rel="preload" href="critical.css" as="style">
// <link rel="prefetch" href="next-page.js">
// <link rel="preconnect" href="https://fonts.googleapis.com">
// \`\`\`

// ## Performance Monitoring

// Monitor performance continuously:

// \`\`\`javascript
// // Web Vitals
// import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// getCLS(console.log);
// getFID(console.log);
// getFCP(console.log);
// getLCP(console.log);
// getTTFB(console.log);
// \`\`\`

// ## Conclusion

// Web performance optimization is an ongoing process. Regular monitoring and optimization ensure your users have the best possible experience.`,
//     status: 'draft',
//     category: 'Performance',
//     tags: ['Performance', 'Web Vitals', 'Optimization', 'Speed'],
//     author: 'Alex Chen',
//     createdAt: '2024-01-12',
//     updatedAt: '2024-01-19',
//     views: 945,
//     featuredImage: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800'
//   }
// ];

// export default function EditPage() {
//   const [posts, setPosts] = useState<BlogPost[]>([]);
//   const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);

//   const [editForm, setEditForm] = useState({
//     title: '',
//     slug: '',
//     excerpt: '',
//     content: '',
//     status: 'draft' as 'draft' | 'published' | 'archived',
//     category: '',
//     tags: '',
//     featuredImage: ''
//   });

//   useEffect(() => {
//     // Load posts from localStorage or use initial data
//     const storedPosts = localStorage.getItem('blogPosts');
//     if (storedPosts) {
//       setPosts(JSON.parse(storedPosts));
//     } else {
//       setPosts(initialPosts);
//       localStorage.setItem('blogPosts', JSON.stringify(initialPosts));
//     }
//   }, []);

//   const filteredPosts = posts.filter((post: BlogPost) => {
//     const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const handleEditPost = (post: BlogPost) => {
//     setSelectedPost(post);
//     setEditForm({
//       title: post.title,
//       slug: post.slug,
//       excerpt: post.excerpt,
//       content: post.content,
//       status: post.status,
//       category: post.category,
//       tags: post.tags.join(', '),
//       featuredImage: post.featuredImage || ''
//     });
//     setIsEditDialogOpen(true);
//   };

//   const handleSavePost = async () => {
//     if (!selectedPost) return;
    
//     setIsSaving(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     // Update the post in the list
//     const updatedPosts = posts.map((post: BlogPost) => {
//       if (post.id === selectedPost.id) {
//         return {
//           ...post,
//           title: editForm.title,
//           slug: editForm.slug,
//           excerpt: editForm.excerpt,
//           content: editForm.content,
//           status: editForm.status,
//           category: editForm.category,
//           tags: editForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
//           featuredImage: editForm.featuredImage,
//           updatedAt: new Date().toISOString().split('T')[0]
//         };
//       }
//       return post;
//     });
    
//     setPosts(updatedPosts);
//     localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    
//     setIsSaving(false);
//     setSaveSuccess(true);
//     setIsEditDialogOpen(false);
    
//     setTimeout(() => setSaveSuccess(false), 3000);
//   };

//   const handleDeletePost = async (postId: string) => {
//     if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 500));
//       const updatedPosts = posts.filter((post: BlogPost) => post.id !== postId);
//       setPosts(updatedPosts);
//       localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'published':
//         return (
//           <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
//             <CheckCircle className="w-3 h-3 mr-1" />
//             Published
//           </Badge>
//         );
//       case 'draft':
//         return (
//           <Badge variant="outline">
//             <Clock className="w-3 h-3 mr-1" />
//             Draft
//           </Badge>
//         );
//       case 'archived':
//         return (
//           <Badge variant="secondary">
//             <AlertCircle className="w-3 h-3 mr-1" />
//             Archived
//           </Badge>
//         );
//       default:
//         return <Badge variant="outline">{status}</Badge>;
//     }
//   };

//   const getStatusCount = (status: string) => {
//     if (status === 'all') return posts.length;
//     return posts.filter(post => post.status === status).length;
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Edit Posts</h1>
//           <p className="text-muted-foreground">
//             Manage and edit your blog posts
//           </p>
//         </div>
//         <Button>
//           <Plus className="mr-2 h-4 w-4" />
//           New Post
//         </Button>
//       </div>

//       {/* Success Alert */}
//       {saveSuccess && (
//         <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
//           <CheckCircle className="h-4 w-4" />
//           <AlertDescription>
//             Post updated successfully!
//           </AlertDescription>
//         </Alert>
//       )}

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
//                 <p className="text-2xl font-bold">{getStatusCount('all')}</p>
//               </div>
//               <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <Edit3 className="h-4 w-4 text-blue-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Published</p>
//                 <p className="text-2xl font-bold text-green-600">{getStatusCount('published')}</p>
//               </div>
//               <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
//                 <CheckCircle className="h-4 w-4 text-green-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Drafts</p>
//                 <p className="text-2xl font-bold text-yellow-600">{getStatusCount('draft')}</p>
//               </div>
//               <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
//                 <Clock className="h-4 w-4 text-yellow-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Total Views</p>
//                 <p className="text-2xl font-bold">{posts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}</p>
//               </div>
//               <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
//                 <Eye className="h-4 w-4 text-purple-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div className="flex flex-1 items-center space-x-2">
//               <Search className="h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search posts by title, content, author, or category..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="max-w-md"
//               />
//             </div>
//             <div className="flex items-center space-x-2">
//               <Filter className="h-4 w-4 text-muted-foreground" />
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-36">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="published">Published</SelectItem>
//                   <SelectItem value="draft">Draft</SelectItem>
//                   <SelectItem value="archived">Archived</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Horizontal Blog Cards */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Posts ({filteredPosts.length})</CardTitle>
//           <CardDescription>
//             {filteredPosts.length === posts.length 
//               ? "All your blog posts" 
//               : `Showing ${filteredPosts.length} of ${posts.length} posts`}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {filteredPosts.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-muted-foreground">No posts found matching your criteria.</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {filteredPosts.map((post) => (
//                 <Card 
//                   key={post.id} 
//                   className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
//                   onClick={() => handleEditPost(post)}
//                 >
//                   <CardContent className="p-6">
//                     <div className="flex gap-6">
//                       {/* Featured Image */}
//                       <div className="flex-shrink-0">
//                         <div className="w-32 h-24 bg-muted rounded-lg overflow-hidden">
//                           {post.featuredImage ? (
//                             <Image
//                               src={post.featuredImage}
//                               alt={post.title}
//                               fill
//                               style={{ objectFit: 'cover' }}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center">
//                               <Edit3 className="h-8 w-8 text-muted-foreground" />
//                             </div>
//                           )}
//                         </div>
//                       </div>
                      
//                       {/* Content */}
//                       <div className="flex-1 space-y-3">
//                         <div className="flex justify-between items-start">
//                           <div className="space-y-1">
//                             <h3 className="font-semibold text-xl leading-tight">{post.title}</h3>
//                             <p className="text-sm text-muted-foreground line-clamp-2">
//                               {post.excerpt}
//                             </p>
//                           </div>
//                           {getStatusBadge(post.status)}
//                         </div>
                        
//                         <div className="flex flex-wrap gap-2">
//                           <Badge variant="outline">{post.category}</Badge>
//                           {post.tags.slice(0, 3).map((tag, index) => (
//                             <Badge key={index} variant="outline" className="text-xs">
//                               {tag}
//                             </Badge>
//                           ))}
//                           {post.tags.length > 3 && (
//                             <Badge variant="outline" className="text-xs">
//                               +{post.tags.length - 3}
//                             </Badge>
//                           )}
//                         </div>
                        
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-4 text-sm text-muted-foreground">
//                             <div className="flex items-center">
//                               <User className="mr-2 h-4 w-4" />
//                               {post.author}
//                             </div>
//                             <div className="flex items-center">
//                               <Calendar className="mr-2 h-4 w-4" />
//                               {post.updatedAt}
//                             </div>
//                             <div className="flex items-center">
//                               <Eye className="mr-2 h-4 w-4" />
//                               {post.views.toLocaleString()} views
//                             </div>
//                           </div>
                          
//                           <Button 
//                             variant="destructive" 
//                             size="sm"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDeletePost(post.id);
//                             }}
//                           >
//                             <Trash2 className="h-4 w-4 mr-1" />
//                             Delete
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Edit Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Edit Post</DialogTitle>
//             <DialogDescription>
//               Make changes to your post here. Click save when youre done.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="title">Title</Label>
//                 <Input
//                   id="title"
//                   value={editForm.title}
//                   onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="slug">Slug</Label>
//                 <Input
//                   id="slug"
//                   value={editForm.slug}
//                   onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
//                 />
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="excerpt">Excerpt</Label>
//               <Textarea
//                 id="excerpt"
//                 value={editForm.excerpt}
//                 onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
//                 rows={3}
//               />
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="content">Content</Label>
//               <Textarea
//                 id="content"
//                 value={editForm.content}
//                 onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
//                 rows={12}
//                 className="font-mono text-sm"
//               />
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="featuredImage">Featured Image URL</Label>
//               <Input
//                 id="featuredImage"
//                 value={editForm.featuredImage}
//                 onChange={(e) => setEditForm({ ...editForm, featuredImage: e.target.value })}
//                 placeholder="https://example.com/image.jpg"
//               />
//             </div>
            
//             <div className="grid grid-cols-3 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="status">Status</Label>
//                 <Select value={editForm.status} onValueChange={(value: any) => setEditForm({ ...editForm, status: value })}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="draft">Draft</SelectItem>
//                     <SelectItem value="published">Published</SelectItem>
//                     <SelectItem value="archived">Archived</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="category">Category</Label>
//                 <Input
//                   id="category"
//                   value={editForm.category}
//                   onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="tags">Tags</Label>
//                 <Input
//                   id="tags"
//                   value={editForm.tags}
//                   onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
//                   placeholder="tag1, tag2, tag3"
//                 />
//               </div>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleSavePost} disabled={isSaving}>
//               {isSaving ? 'Saving...' : 'Save Changes'}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }