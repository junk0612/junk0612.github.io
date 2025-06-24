import Link from 'next/link'
import { useRouter } from 'next/router'
import { SITENAME } from '../../lib/constant'

type MenuProps = {
  currentPath: string
}

type MenuItemProps = {
  title: string
  path: string
  showPage: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({ path, showPage, title }) => {
  return (
    <li
      className={`h-full flex items-end border-b-2 pb-3 ${
        showPage
          ? 'border-blue-600 text-blue-600 font-semibold'
          : 'border-transparent text-gray-600 hover:border-blue-600 hover:text-blue-600'
      }`}
    >
      <Link href={path}>{title}</Link>
    </li>
  )
}

const Menu: React.FC<MenuProps> = ({ currentPath }) => {

  return (
    <ul className="flex gap-3 h-full">
      <MenuItem title="Blog" path="/posts" showPage={currentPath === 'posts'} />
      <MenuItem title="Slide" path="/slides" showPage={currentPath === 'slides' } />
      <MenuItem title="About" path="/about" showPage={currentPath === 'about'} />
    </ul>
  )
}

export const Header: React.FC = () => {
  const router = useRouter()

  return (
    <div className="sticky top-0 w-full bg-white shadow h-16 flex items-center justify-between px-4 z-10">
      <Link
        href="/"
        className="flex items-center text-3xl font-bold gap-4 hover:text-blue-600"
      >
        <img
          className="rounded-full"
          src="/images/my_icon.jpg"
          width="48"
          height="48"
          alt="profile image"
        />
        {SITENAME}
      </Link>
      <Menu currentPath={router.asPath.split('/')[1]} />
    </div>
  )
}
