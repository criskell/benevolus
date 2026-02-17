'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody, CardHeader, Chip, Button, Input } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'como-criar-campanha-sucesso',
    title: 'blog.posts.post_1.title',
    excerpt: 'blog.posts.post_1.excerpt',
    author: 'Maria Silva',
    date: '2026-02-05',
    readTime: '5 min',
    category: 'blog.categories.tips',
    image: '/blog/campaign-tips.jpg',
  },
  {
    slug: 'impacto-doacoes-comunidade',
    title: 'blog.posts.post_2.title',
    excerpt: 'blog.posts.post_2.excerpt',
    author: 'João Santos',
    date: '2026-02-01',
    readTime: '7 min',
    category: 'blog.categories.impact',
    image: '/blog/community-impact.jpg',
  },
  {
    slug: 'transparencia-plataforma',
    title: 'blog.posts.post_3.title',
    excerpt: 'blog.posts.post_3.excerpt',
    author: 'Ana Costa',
    date: '2026-01-28',
    readTime: '4 min',
    category: 'blog.categories.platform',
    image: '/blog/transparency.jpg',
  },
  {
    slug: 'historias-sucesso-2025',
    title: 'blog.posts.post_4.title',
    excerpt: 'blog.posts.post_4.excerpt',
    author: 'Pedro Oliveira',
    date: '2026-01-25',
    readTime: '6 min',
    category: 'blog.categories.stories',
    image: '/blog/success-stories.jpg',
  },
  {
    slug: 'tecnologia-bem-social',
    title: 'blog.posts.post_5.title',
    excerpt: 'blog.posts.post_5.excerpt',
    author: 'Carla Mendes',
    date: '2026-01-20',
    readTime: '5 min',
    category: 'blog.categories.technology',
    image: '/blog/tech-social-good.jpg',
  },
  {
    slug: 'dicas-divulgacao-campanha',
    title: 'blog.posts.post_6.title',
    excerpt: 'blog.posts.post_6.excerpt',
    author: 'Lucas Ferreira',
    date: '2026-01-15',
    readTime: '8 min',
    category: 'blog.categories.tips',
    image: '/blog/promotion-tips.jpg',
  },
];

const categories = [
  { key: 'all', label: 'blog.categories.all' },
  { key: 'tips', label: 'blog.categories.tips' },
  { key: 'impact', label: 'blog.categories.impact' },
  { key: 'platform', label: 'blog.categories.platform' },
  { key: 'stories', label: 'blog.categories.stories' },
  { key: 'technology', label: 'blog.categories.technology' },
];

const BlogPage = () => {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === `blog.categories.${selectedCategory}`;
    const matchesSearch = searchQuery === '' || 
      t(post.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(post.excerpt).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-background via-default-50/30 to-background">
      {/* Hero Section */}
      <section className="relative min-h-[45vh] flex flex-col items-center justify-center px-6 pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-300/20 via-transparent to-transparent" />
          
          {/* Floating particles */}
          <div className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-blue-400/40 animate-float" />
          <div className="absolute top-40 right-[15%] w-3 h-3 rounded-full bg-blue-500/40 animate-float-delayed" />
          <div className="absolute bottom-32 left-[20%] w-2 h-2 rounded-full bg-blue-400/40 animate-float" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container max-w-5xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-100/70 via-blue-50/50 to-blue-100/70 text-blue-900 px-6 py-2.5 text-sm font-bold mb-8 border-2 border-blue-300/50 backdrop-blur-sm"
          >
            <Icon icon="solar:document-text-bold-duotone" className="size-5 text-blue-600" />
            {t('blog.hero_badge')}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl md:leading-[1.1] mb-6"
          >
            <span className="bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              {t('blog.title')}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-lg text-default-600 max-w-3xl mx-auto sm:text-xl leading-relaxed font-medium"
          >
            {t('blog.subtitle')}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 max-w-xl mx-auto"
          >
            <Input
              placeholder={t('blog.search_placeholder')}
              startContent={<Icon icon="solar:magnifer-linear" className="size-5 text-default-400" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="lg"
              radius="full"
              classNames={{
                input: "text-base",
                inputWrapper: "border-2 border-blue-200 hover:border-blue-400 group-data-[focus=true]:border-blue-500"
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Filter */}
      <section className="relative px-6 pb-12">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <Button
                key={category.key}
                onPress={() => setSelectedCategory(category.key)}
                variant={selectedCategory === category.key ? 'solid' : 'bordered'}
                color={selectedCategory === category.key ? 'primary' : 'default'}
                radius="full"
                className={`font-semibold transition-all duration-300 ${selectedCategory === category.key ? 'scale-105' : 'hover:scale-105 border-blue-200'}`}
              >
                {t(category.label)}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative px-6 pb-24 md:pb-32">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="border-2 border-blue-200/40 transition-all duration-500 hover:scale-[1.02] hover:border-blue-400/60 group overflow-hidden relative bg-gradient-to-br from-background via-blue-50/20 to-background shadow-none h-full">
                    {/* Post Image Placeholder */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon icon="solar:gallery-bold-duotone" className="size-16 text-blue-400 opacity-50" />
                      </div>
                      <Chip
                        size="sm"
                        className="absolute top-3 left-3 bg-blue-600 text-white font-semibold"
                      >
                        {t(post.category)}
                      </Chip>
                    </div>

                    <CardHeader className="flex-col items-start gap-3 p-6">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-blue-600 transition-colors line-clamp-2">
                        {t(post.title)}
                      </h3>
                      <p className="text-default-600 text-sm line-clamp-3 leading-relaxed">
                        {t(post.excerpt)}
                      </p>
                    </CardHeader>

                    <CardBody className="pt-0 px-6 pb-6">
                      <div className="flex items-center justify-between text-sm text-default-500">
                        <div className="flex items-center gap-2">
                          <Icon icon="solar:user-bold-duotone" className="size-4 text-blue-600" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Icon icon="solar:calendar-bold-duotone" className="size-4 text-blue-600" />
                            <span>
                              {new Date(post.date).toLocaleDateString(t('common.locale'), {
                                day: '2-digit',
                                month: 'short',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon icon="solar:clock-circle-bold-duotone" className="size-4 text-blue-600" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Icon icon="solar:document-text-bold-duotone" className="size-24 text-blue-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {t('blog.no_posts_found')}
              </h3>
              <p className="text-default-600">
                {t('blog.no_posts_description')}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative px-6 pb-24">
        <div className="container max-w-4xl mx-auto">
          <Card className="border-2 border-blue-300/50 overflow-hidden relative bg-gradient-to-br from-blue-50/40 via-blue-100/30 to-blue-50/40 backdrop-blur-sm shadow-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.08),rgba(255,255,255,0))]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-transparent rounded-full blur-3xl" />
            
            <CardBody className="p-12 text-center relative z-10">
              <div className="inline-flex rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-1 mb-6">
                <div className="rounded-full bg-background p-4">
                  <Icon icon="solar:letter-opened-bold-duotone" className="text-blue-600 size-10" />
                </div>
              </div>
              <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
                {t('blog.newsletter.title')}
              </h3>
              <p className="text-default-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium mb-8">
                {t('blog.newsletter.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  placeholder={t('blog.newsletter.placeholder')}
                  type="email"
                  size="lg"
                  radius="full"
                  classNames={{
                    inputWrapper: "border-2 border-blue-300"
                  }}
                />
                <Button
                  color="primary"
                  size="lg"
                  radius="full"
                  className="font-semibold px-8"
                >
                  {t('blog.newsletter.button')}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
