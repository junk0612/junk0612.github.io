export type Article = {
  title: string;
  published: string;
  tags: string[];
  content: string;
  slug: string;
}
;export type ArticleWithoutContent = Omit<Article, 'content'>;
