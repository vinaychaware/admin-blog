"text-white hover:bg-white/10"
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