'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody, Chip, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BlogPostPage() {
  const t = useTranslations();
  const params = useParams();
  const slug = params.slug as string;

  // Mock data - em produção viria de uma API ou CMS
  const post = {
    title: `blog.posts.${slug}.title`,
    author: 'Maria Silva',
    date: '2026-02-05',
    readTime: '5 min',
    category: 'blog.categories.tips',
    content: `blog.posts.${slug}.content`,
  };

  const relatedPosts = [
    {
      slug: 'dicas-divulgacao-campanha',
      title: 'blog.posts.post_6.title',
      category: 'blog.categories.tips',
    },
    {
      slug: 'historias-sucesso-2025',
      title: 'blog.posts.post_4.title',
      category: 'blog.categories.stories',
    },
    {
      slug: 'tecnologia-bem-social',
      title: 'blog.posts.post_5.title',
      category: 'blog.categories.technology',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-default-50/30 to-background">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />
        </div>

        <div className="container max-w-4xl mx-auto">
          <Link href="/blog">
            <Button
              variant="light"
              startContent={<Icon icon="solar:arrow-left-linear" className="size-5" />}
              className="mb-8 text-blue-600 hover:text-blue-700"
            >
              {t('blog.back_to_blog')}
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Chip
              size="lg"
              className="mb-6 bg-blue-100 text-blue-900 font-semibold border-2 border-blue-300"
            >
              {t(post.category)}
            </Chip>

            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              {t(post.title)}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-default-600 mb-8">
              <div className="flex items-center gap-2">
                <Icon icon="solar:user-bold-duotone" className="size-5 text-blue-600" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="solar:calendar-bold-duotone" className="size-5 text-blue-600" />
                <span>
                  {new Date(post.date).toLocaleDateString(t('common.locale'), {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="solar:clock-circle-bold-duotone" className="size-5 text-blue-600" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl overflow-hidden mb-12 border-2 border-blue-200"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon icon="solar:gallery-bold-duotone" className="size-32 text-blue-400 opacity-50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative px-6 pb-20">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="border-2 border-blue-200/40 bg-background shadow-none mb-12">
              <CardBody className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <div className="text-default-700 leading-relaxed space-y-6 text-lg">
                    {t(post.content).split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Share Section */}
            <Card className="border-2 border-blue-200/40 bg-gradient-to-br from-blue-50/40 to-background shadow-none mb-16">
              <CardBody className="p-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-foreground">
                    {t('blog.share_post')}
                  </h3>
                  <div className="flex gap-3">
                    <Button
                      isIconOnly
                      variant="flat"
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                    >
                      <Icon icon="mdi:twitter" className="size-5" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="flat"
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                    >
                      <Icon icon="mdi:facebook" className="size-5" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="flat"
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                    >
                      <Icon icon="mdi:linkedin" className="size-5" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="flat"
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                    >
                      <Icon icon="solar:link-bold" className="size-5" />
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Related Posts */}
            <div>
              <h2 className="text-3xl font-black text-foreground mb-8">
                {t('blog.related_posts')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  >
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <Card className="border-2 border-blue-200/40 transition-all duration-300 hover:scale-105 hover:border-blue-400/60 shadow-none h-full">
                        <div className="relative h-32 bg-gradient-to-br from-blue-100 to-blue-200">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon icon="solar:document-text-bold-duotone" className="size-12 text-blue-400 opacity-50" />
                          </div>
                        </div>
                        <CardBody className="p-4">
                          <Chip size="sm" className="mb-2 bg-blue-100 text-blue-900 font-semibold">
                            {t(relatedPost.category)}
                          </Chip>
                          <h3 className="text-base font-bold text-foreground line-clamp-2">
                            {t(relatedPost.title)}
                          </h3>
                        </CardBody>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
