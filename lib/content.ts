export type Content = {
  title: string;
  published: string;
  tags: string[];
  body: string;
  slug: string;
}
;export type ContentWithoutBody = Omit<Content, 'body'>;
