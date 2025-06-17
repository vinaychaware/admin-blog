// 'use client';

// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Switch } from '@/components/ui/switch';
// import { Separator } from '@/components/ui/separator';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from '@/components/ui/tabs';
// import {
//   Settings,
//   Globe,
//   Mail,
//   Shield,
//   Palette,
//   Bell,
//   Database,
//   Save,
//   CheckCircle,
//   AlertTriangle,
//   Info,
//   Upload,
//   Download,
//   Trash2,
// } from 'lucide-react';

// interface SiteSettings {
//   siteName: string;
//   siteDescription: string;
//   siteUrl: string;
//   adminEmail: string;
//   timezone: string;
//   language: string;
//   allowRegistration: boolean;
//   requireEmailVerification: boolean;
//   enableComments: boolean;
//   moderateComments: boolean;
//   enableNotifications: boolean;
//   emailNotifications: boolean;
//   theme: string;
//   postsPerPage: number;
//   maxUploadSize: number;
//   allowedFileTypes: string;
//   backupFrequency: string;
//   maintenanceMode: boolean;
// }

// const defaultSettings: SiteSettings = {
//   siteName: 'My Blog',
//   siteDescription: 'A modern blog built with Next.js',
//   siteUrl: 'https://myblog.com',
//   adminEmail: 'admin@myblog.com',
//   timezone: 'UTC',
//   language: 'en',
//   allowRegistration: true,
//   requireEmailVerification: true,
//   enableComments: true,
//   moderateComments: true,
//   enableNotifications: true,
//   emailNotifications: true,
//   theme: 'system',
//   postsPerPage: 10,
//   maxUploadSize: 5,
//   allowedFileTypes: 'jpg,jpeg,png,gif,webp,pdf,doc,docx',
//   backupFrequency: 'daily',
//   maintenanceMode: false,
// };

// export default function SettingsPage() {
//   const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [activeTab, setActiveTab] = useState('general');

//   useEffect(() => {
//     // Load settings from localStorage
//     const savedSettings = localStorage.getItem('siteSettings');
//     if (savedSettings) {
//       setSettings(JSON.parse(savedSettings));
//     }
//   }, []);

//   const handleSave = async () => {
//     setIsSaving(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     // Save to localStorage
//     localStorage.setItem('siteSettings', JSON.stringify(settings));
    
//     setIsSaving(false);
//     setSaveSuccess(true);
    
//     setTimeout(() => setSaveSuccess(false), 3000);
//   };

//   const handleReset = () => {
//     if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
//       setSettings(defaultSettings);
//       localStorage.removeItem('siteSettings');
//     }
//   };

//   const handleExportSettings = () => {
//     const dataStr = JSON.stringify(settings, null, 2);
//     const dataBlob = new Blob([dataStr], { type: 'application/json' });
//     const url = URL.createObjectURL(dataBlob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'blog-settings.json';
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const importedSettings = JSON.parse(e.target?.result as string);
//           setSettings({ ...defaultSettings, ...importedSettings });
//         } catch (error) {
//           alert('Invalid settings file');
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
//           <p className="text-muted-foreground">
//             Configure your blog settings and preferences.
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline" onClick={handleExportSettings}>
//             <Download className="mr-2 h-4 w-4" />
//             Export
//           </Button>
//           <Button variant="outline" onClick={() => document.getElementById('import-file')?.click()}>
//             <Upload className="mr-2 h-4 w-4" />
//             Import
//           </Button>
//           <input
//             id="import-file"
//             type="file"
//             accept=".json"
//             onChange={handleImportSettings}
//             className="hidden"
//           />
//           <Button onClick={handleSave} disabled={isSaving}>
//             <Save className="mr-2 h-4 w-4" />
//             {isSaving ? 'Saving...' : 'Save Changes'}
//           </Button>
//         </div>
//       </div>

//       {/* Success Alert */}
//       {saveSuccess && (
//         <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
//           <CheckCircle className="h-4 w-4" />
//           <AlertDescription>
//             Settings saved successfully!
//           </AlertDescription>
//         </Alert>
//       )}

//       {/* Settings Tabs */}
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid w-full grid-cols-6">
//           <TabsTrigger value="general">General</TabsTrigger>
//           <TabsTrigger value="users">Users</TabsTrigger>
//           <TabsTrigger value="content">Content</TabsTrigger>
//           <TabsTrigger value="notifications">Notifications</TabsTrigger>
//           <TabsTrigger value="appearance">Appearance</TabsTrigger>
//           <TabsTrigger value="advanced">Advanced</TabsTrigger>
//         </TabsList>

//         {/* General Settings */}
//         <TabsContent value="general" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Globe className="h-5 w-5" />
//                 Site Information
//               </CardTitle>
//               <CardDescription>
//                 Basic information about your blog site.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="siteName">Site Name</Label>
//                   <Input
//                     id="siteName"
//                     value={settings.siteName}
//                     onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="siteUrl">Site URL</Label>
//                   <Input
//                     id="siteUrl"
//                     value={settings.siteUrl}
//                     onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
//                   />
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="siteDescription">Site Description</Label>
//                 <Textarea
//                   id="siteDescription"
//                   value={settings.siteDescription}
//                   onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
//                   rows={3}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="adminEmail">Admin Email</Label>
//                   <Input
//                     id="adminEmail"
//                     type="email"
//                     value={settings.adminEmail}
//                     onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="timezone">Timezone</Label>
//                   <Select value={settings.timezone} onValueChange={(value) => setSettings({ ...settings, timezone: value })}>
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="UTC">UTC</SelectItem>
//                       <SelectItem value="America/New_York">Eastern Time</SelectItem>
//                       <SelectItem value="America/Chicago">Central Time</SelectItem>
//                       <SelectItem value="America/Denver">Mountain Time</SelectItem>
//                       <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
//                       <SelectItem value="Europe/London">London</SelectItem>
//                       <SelectItem value="Europe/Paris">Paris</SelectItem>
//                       <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="language">Language</Label>
//                   <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="en">English</SelectItem>
//                       <SelectItem value="es">Spanish</SelectItem>
//                       <SelectItem value="fr">French</SelectItem>
//                       <SelectItem value="de">German</SelectItem>
//                       <SelectItem value="it">Italian</SelectItem>
//                       <SelectItem value="pt">Portuguese</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* User Settings */}
//         <TabsContent value="users" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Shield className="h-5 w-5" />
//                 User Management
//               </CardTitle>
//               <CardDescription>
//                 Configure user registration and authentication settings.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Allow User Registration</Label>
//                   <p className="text-sm text-muted-foreground">
//                     Allow new users to register for accounts
//                   </p>
//                 </div>
//                 <Switch
//                   checked={settings.allowRegistration}
//                   onCheckedChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
//                 />
//               </div>

//               <Separator />

//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Require Email Verification</Label>
//                   <p className="text-sm text-muted-foreground">
//                     Users must verify their email before accessing the site
//                   </p>
//                 </div>
//                 <Switch
//                   checked={settings.requireEmailVerification}
//                   onCheckedChange={(checked) => setSettings({ ...settings, requireEmailVerification: checked })}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Content Settings */}
//         <TabsContent value="content" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Settings className="h-5 w-5" />
//                 Content Management
//               </CardTitle>
//               <CardDescription>
//                 Configure how content is displayed and managed.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="postsPerPage">Posts Per Page</Label>
//                   <Input
//                     id="postsPerPage"
//                     type="number"
//                     min="1"
//                     max="50"
//                     value={settings.postsPerPage}
//                     onChange={(e) => setSettings({ ...settings, postsPerPage: parseInt(e.target.value) || 10 })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="maxUploadSize">Max Upload Size (MB)</Label>
//                   <Input
//                     id="maxUploadSize"
//                     type="number"
//                     min="1"
//                     max="100"
//                     value={settings.maxUploadSize}
//                     onChange={(e) => setSettings({ ...settings, maxUploadSize: parseInt(e.target.value) || 5 })}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
//                 <Input
//                   id="allowedFileTypes"
//                   value={settings.allowedFileTypes}
//                   onChange={(e) => setSettings({ ...settings, allowedFileTypes: e.target.value })}
//                   placeholder="jpg,jpeg,png,gif,webp,pdf"
//                 />
//                 <p className="text-sm text-muted-foreground">
//                   Comma-separated list of allowed file extensions
//                 </p>
//               </div>

//               <Separator />

//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Enable Comments</Label>
//                   <p className="text-sm text-muted-foreground">
//                     Allow users to comment on blog posts
//                   </p>
//                 </div>
//                 <Switch
//                   checked={settings.enableComments}
//                   onCheckedChange={(checked) => setSettings({ ...settings, enableComments: checked })}
//                 />
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Moderate Comments</Label>
//                   <p className="text-sm text-muted-foreground">
//                     Require approval before comments are published
//                   </p>
//                 </div>
//                 <Switch
//                   checked={settings.moderateComments}
//                   onCheckedChange={(checked) => setSettings({ ...settings, moderateComments: checked })}
//                   disabled={!settings.enableComments}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Notification Settings */}
//         <TabsContent value="notifications" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Bell className="h-5 w-5" />
//                 Notification Settings
//               </CardTitle>
//               <CardDescription>
//                 Configure how and when you receive notifications.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Enable Notifications</Label>
//                   <p className="text-sm text-muted-foreground">
//                     Receive notifications for important events
//                   </p>
//                 </div>
//                 <Switch
//                   checked={settings.enableNotifications}
//                   onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
//                 />
//               </div>

//               <Separator />

//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Email Notifications</Label>
//                   <p className="text-sm text-muted-foreground">
//                     Receive notifications via email
//                   </p>
//                 </div>
//                 <Switch
//                   checked={settings.emailNotifications}
//                   onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
//                   disabled={!settings.enableNotifications}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Appearance Settings */}
//         <TabsContent value="appearance" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Palette className="h-5 w-5" />
//                 Appearance
//               </CardTitle>
//               <CardDescription>
//                 Customize the look and feel of your blog.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="theme">Theme</Label>
//                 <Select value={settings.theme} onValueChange={(value) => setSettings({ ...settings, theme: value })}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="light">Light</SelectItem>
//                     <SelectItem value="dark">Dark</SelectItem>
//                     <SelectItem value="system">System</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Advanced Settings */}
//         <TabsContent value="advanced" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Database className="h-5 w-5" />
//                 Advanced Settings
//               </CardTitle>
//               <CardDescription>
//                 Advanced configuration options for your blog.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="backupFrequency">Backup Frequency</Label>
//                 <Select value={settings.backupFrequency} onValueChange={(value) => setSettings({ ...settings, backupFrequency: value })}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="hourly">Hourly</SelectItem>
//                     <SelectItem value="daily">Daily</SelectItem>
//                     <SelectItem value="weekly">Weekly</SelectItem>
//                     <SelectItem value="monthly">Monthly</SelectItem>
//                     <SelectItem value="never">Never</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <Separator />

//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Maintenance Mode</Label>
//                   <p className="text-sm text-muted-foreground">
//                     Put the site in maintenance mode for updates
//                   </p>
//                 </div>
//                 <Switch
//                   checked={settings.maintenanceMode}
//                   onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
//                 />
//               </div>

//               {settings.maintenanceMode && (
//                 <Alert>
//                   <AlertTriangle className="h-4 w-4" />
//                   <AlertDescription>
//                     Maintenance mode is enabled. Visitors will see a maintenance page.
//                   </AlertDescription>
//                 </Alert>
//               )}

//               <Separator />

//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium">Danger Zone</h3>
//                 <div className="border border-red-200 rounded-lg p-4 space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-medium text-red-900 dark:text-red-100">Reset Settings</h4>
//                       <p className="text-sm text-red-700 dark:text-red-300">
//                         Reset all settings to their default values
//                       </p>
//                     </div>
//                     <Button variant="destructive" onClick={handleReset}>
//                       <Trash2 className="mr-2 h-4 w-4" />
//                       Reset
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }