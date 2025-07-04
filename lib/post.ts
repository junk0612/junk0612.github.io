export interface Post {
  title: string
  published: string
  tags?: string[]
  body: string
  slug: string
}

export interface PostWithoutBody {
  title: string
  published: string
  tags?: string[]
  slug: string
}