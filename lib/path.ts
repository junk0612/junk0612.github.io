export const articlePath = (article: { slug: string }): string => `/articles/${article.slug}`
export const articlesPagePath = (page: number): string => `/articles/pages/${page}`
export const postPath = (post: { slug: string }): string => `/posts/${post.slug}`
export const postsPagePath = (page: number): string => `/posts/pages/${page}`
export const tagPath = (tag: string) => `/tags/${tag}`
