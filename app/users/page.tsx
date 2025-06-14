// 'use client';

// import { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
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
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import {
//   Search,
//   Plus,
//   MoreHorizontal,
//   Edit,
//   Trash2,
//   Shield,
//   Mail,
//   Calendar,
//   UserPlus,
// } from 'lucide-react';

// const users = [
//   {
//     id: 1,
//     name: 'John Doe',
//     email: 'john@example.com',
//     role: 'Admin',
//     status: 'Active',
//     avatar: '/avatars/01.png',
//     lastLogin: '2025-01-02',
//     joinedAt: '2024-01-15',
//     postsCount: 12,
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//     role: 'Editor',
//     status: 'Active',
//     avatar: '/avatars/02.png',
//     lastLogin: '2025-01-01',
//     joinedAt: '2024-03-22',
//     postsCount: 8,
//   },
//   {
//     id: 3,
//     name: 'Mike Johnson',
//     email: 'mike@example.com',
//     role: 'Author',
//     status: 'Active',
//     avatar: '/avatars/03.png',
//     lastLogin: '2024-12-30',
//     joinedAt: '2024-06-10',
//     postsCount: 15,
//   },
//   {
//     id: 4,
//     name: 'Sarah Wilson',
//     email: 'sarah@example.com',
//     role: 'Author',
//     status: 'Inactive',
//     avatar: '/avatars/04.png',
//     lastLogin: '2024-11-15',
//     joinedAt: '2024-02-28',
//     postsCount: 3,
//   },
//   {
//     id: 5,
//     name: 'Robert Brown',
//     email: 'robert@example.com',
//     role: 'Editor',
//     status: 'Active',
//     avatar: '/avatars/05.png',
//     lastLogin: '2024-12-28',
//     joinedAt: '2024-04-05',
//     postsCount: 6,
//   },
// ];

// export default function UsersPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [roleFilter, setRoleFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [newUserOpen, setNewUserOpen] = useState(false);

//   const filteredUsers = users.filter((user) => {
//     const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
//     const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    
//     return matchesSearch && matchesRole && matchesStatus;
//   });

//   const getRoleColor = (role: string) => {
//     switch (role.toLowerCase()) {
//       case 'admin':
//         return 'bg-red-100 text-red-800';
//       case 'editor':
//         return 'bg-blue-100 text-blue-800';
//       case 'author':
//         return 'bg-green-100 text-green-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusColor = (status: string) => {
//     return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Users</h1>
//           <p className="text-muted-foreground">
//             Manage user accounts, roles, and permissions.
//           </p>
//         </div>
//         <Dialog open={newUserOpen} onOpenChange={setNewUserOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Add User
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Add New User</DialogTitle>
//               <DialogDescription>
//                 Create a new user account and assign appropriate permissions.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input id="name" placeholder="John Doe" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input id="email" type="email" placeholder="john@example.com" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="role">Role</Label>
//                 <Select>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a role" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="author">Author</SelectItem>
//                     <SelectItem value="editor">Editor</SelectItem>
//                     <SelectItem value="admin">Admin</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setNewUserOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={() => setNewUserOpen(false)}>
//                 <UserPlus className="mr-2 h-4 w-4" />
//                 Create User
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Users Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>User Management</CardTitle>
//           <CardDescription>
//             View and manage all user accounts, their roles, and access permissions.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search users..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-8"
//               />
//             </div>
//             <Select value={roleFilter} onValueChange={setRoleFilter}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter by role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Roles</SelectItem>
//                 <SelectItem value="admin">Admin</SelectItem>
//                 <SelectItem value="editor">Editor</SelectItem>
//                 <SelectItem value="author">Author</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="inactive">Inactive</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>User</TableHead>
//                   <TableHead>Role</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Posts</TableHead>
//                   <TableHead>Last Login</TableHead>
//                   <TableHead>Joined</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredUsers.map((user) => (
//                   <TableRow key={user.id} className="hover:bg-muted/50">
//                     <TableCell>
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-8 w-8">
//                           <AvatarImage src={user.avatar} alt={user.name} />
//                           <AvatarFallback>
//                             {user.name.split(' ').map(n => n[0]).join('')}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-medium">{user.name}</p>
//                           <p className="text-sm text-muted-foreground">{user.email}</p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge className={getRoleColor(user.role)}>
//                         <Shield className="mr-1 h-3 w-3" />
//                         {user.role}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Badge className={getStatusColor(user.status)}>
//                         {user.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <span className="font-mono text-sm">{user.postsCount}</span>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                         <Calendar className="h-3 w-3" />
//                         {user.lastLogin}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                         <Calendar className="h-3 w-3" />
//                         {user.joinedAt}
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" className="h-8 w-8 p-0">
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                           <DropdownMenuItem>
//                             <Edit className="mr-2 h-4 w-4" />
//                             Edit User
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <Mail className="mr-2 h-4 w-4" />
//                             Send Email
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem className="text-red-600">
//                             <Trash2 className="mr-2 h-4 w-4" />
//                             Delete User
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {filteredUsers.length === 0 && (
//             <div className="text-center py-12">
//               <h3 className="text-lg font-medium text-gray-900">No users found</h3>
//               <p className="text-gray-500 mt-1">
//                 {searchTerm || roleFilter !== 'all' || statusFilter !== 'all'
//                   ? 'Try adjusting your search or filter criteria.'
//                   : 'No users have been added yet.'}
//               </p>
//               {!searchTerm && roleFilter === 'all' && statusFilter === 'all' && (
//                 <Button className="mt-4" onClick={() => setNewUserOpen(true)}>
//                   <Plus className="mr-2 h-4 w-4" />
//                   Add First User
//                 </Button>
//               )}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Mail,
  Calendar,
  UserPlus,
} from 'lucide-react';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newUserOpen, setNewUserOpen] = useState(false);
  type User = {
    id: string;
    name: string;
    email: string;
    image?: string;
    emailVerified?: string | null;
    Post?: { id: string }[];
  };

  const [users, setUsers] = useState<User[]>([]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      console.log('Fetched users:', data); // 👈 Add this
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Unexpected data:', data);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  fetchUsers();
}, []);


const filteredUsers = Array.isArray(users) ? users.filter((user) => {
  const matchesSearch =
    (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase());
  return matchesSearch;
}) : [];

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'editor':
        return 'bg-blue-100 text-blue-800';
      case 'author':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage user accounts, roles, and permissions.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            View and manage all user accounts, their roles, and access permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="author">Author</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Posts</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback>
                            {(user.name || '').split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor('author')}>
                        <Shield className="mr-1 h-3 w-3" />
                        Author
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.emailVerified ? 'Active' : 'Inactive')}>
                        {user.emailVerified ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">{user.Post?.length ?? 0}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {user.emailVerified
                          ? new Date(user.emailVerified).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })
                          : '—'}
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
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <h3 className="text-lg font-medium text-gray-900">No users found</h3>
              <p className="text-gray-500 mt-1">All users have been removed or filtered out.</p>
              <Button onClick={() => window.location.reload()}>
                Reload
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}