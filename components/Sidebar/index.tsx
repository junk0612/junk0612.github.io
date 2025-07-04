import Link from 'next/link'
import { useRouter } from 'next/router'
import { TagList } from '../TagList'
import { SITENAME } from '../../lib/constant'

type Props = {
  recentArticles?: Array<{
    slug: string
    title: string
  }>
  allTags?: string[]
  onClose?: () => void
}

export const Sidebar: React.FC<Props> = ({ recentArticles = [], allTags = [], onClose }) => {
  const router = useRouter()
  const currentPath = router.asPath.split('/')[1]

  return (
    <aside className="fixed lg:sticky lg:top-0 w-80 h-screen lg:h-auto lg:min-h-screen bg-white shadow-lg flex flex-col z-40 overflow-y-auto">
      <div className="p-6 border-b flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-xl font-bold hover:text-blue-600">
          <img
            className="rounded-full"
            src="/images/my_icon.jpg"
            width="40"
            height="40"
            alt="profile image"
          />
          {SITENAME}
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <nav className="p-6 border-b">
        <ul className="space-y-2">
          <li>
            <Link href="/articles" className={`block px-3 py-2 rounded-md transition-colors ${
              currentPath === 'articles' 
                ? 'bg-blue-50 text-blue-600 font-semibold' 
                : 'hover:bg-gray-100'
            }`}>
              Articles
            </Link>
          </li>
          <li>
            <Link href="/posts" className={`block px-3 py-2 rounded-md transition-colors ${
              currentPath === 'posts' 
                ? 'bg-blue-50 text-blue-600 font-semibold' 
                : 'hover:bg-gray-100'
            }`}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/slides" className={`block px-3 py-2 rounded-md transition-colors ${
              currentPath === 'slides' 
                ? 'bg-blue-50 text-blue-600 font-semibold' 
                : 'hover:bg-gray-100'
            }`}>
              Slides
            </Link>
          </li>
          <li>
            <Link href="/about" className={`block px-3 py-2 rounded-md transition-colors ${
              currentPath === 'about' 
                ? 'bg-blue-50 text-blue-600 font-semibold' 
                : 'hover:bg-gray-100'
            }`}>
              About
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <section>
          <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">About</h3>
          <p className="text-sm text-gray-600">
            Junichi Kobayashi(@junk0612)のサイトです。普段はRailsエンジニアをしています。LRパーサ・パーサジェネレータに強い興味があり、Ruby・Rails・パーサ関連を中心に興味のある内容を書いています。
          </p>
        </section>

        {recentArticles.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">Recent Articles</h3>
            <ul className="space-y-2">
              {recentArticles.map((article) => (
                <li key={article.slug}>
                  <Link href={`/articles/${article.slug}`} className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {allTags.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">Tags</h3>
            <TagList tags={allTags} />
          </section>
        )}

        <section>
          <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://twitter.com/junk0612"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://github.com/junk0612"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://speakerdeck.com/junk0612"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Speaker Deck
              </a>
            </li>
          </ul>
        </section>
      </div>
    </aside>
  )
}