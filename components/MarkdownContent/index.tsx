import { TagList } from '../TagList'

type Props = {
  title: string;
  published: string;
  tags?: string[];
  content: string;
};

export const MarkdownContent: React.FC<Props> = ({
  title,
  published,
  tags,
  content,
}) => {
  return (
    <article className="max-w-4xl w-full mx-auto">
      <header className="py-6">
        <time className="text-sm font-bold text-gray-500">{published}</time>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">{title}</h1>
        {tags && <TagList tags={tags} />}
      </header>

      <div
        className="prose prose-lg mt-6 max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}
