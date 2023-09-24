import React, {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import MoleculeIcon from '../../components/icons/molecule.svg';
import BookIcon from '../../components/icons/book.svg';
import UsersIcon from '../../components/icons/users.svg';
import CommentIcon from '../../components/icons/comment.svg';
import { Link, MatchRoute, useLoadRoute } from '@tanstack/react-location';
import Spinner from '../../components/spinner';
import { useAuth } from '../../query-hooks';

function Navbar() {
  const loadRoute = useLoadRoute();
  const authData = useAuth();
  const blocks: INavbarBlock[] = [
    {
      title: 'DASHBOARD',
      items: [
        {
          value: '/',
          title: 'Dashboard',
          renderIcon: (selected, hovered) => (
            <MoleculeIcon
              fill={selected ? '#FFFFFF' : hovered ? '#CCCCCC' : '#999999'}
            />
          ),
          onMouseEnter: () => loadRoute({ to: 'dashboard' }),
        },
        {
          value: 'recipes',
          title: 'Recipes',
          renderIcon: (selected, hovered) => (
            <BookIcon
              fill={selected ? '#FFFFFF' : hovered ? '#CCCCCC' : '#999999'}
            />
          ),
          onMouseEnter: () => loadRoute({ to: 'recipes' }),
        },
        {
          value: 'comments',
          title: 'Comments',
          renderIcon: (selected, hovered) => (
            <CommentIcon
              fill={selected ? '#FFFFFF' : hovered ? '#CCCCCC' : '#999999'}
            />
          ),
          onMouseEnter: () => loadRoute({ to: 'comments' }),
        },
      ],
    },
    {
      title: 'SETTINGS',
      hidden: !authData?.isAdmin,
      items: [
        {
          value: 'users',
          title: 'Users',
          renderIcon: (selected, hovered) => (
            <UsersIcon
              fill={selected ? '#FFFFFF' : hovered ? '#CCCCCC' : '#999999'}
            />
          ),
          onMouseEnter: () => loadRoute({ to: 'users' }),
        },
      ],
    },
  ];

  return (
    <nav className="fixed z-10 w-52 h-full bg-zinc-700 p-6 mt-16 shadow-md">
      {blocks
        .filter((block) => !block.hidden)
        .map((block) => (
          <NavbarBlock {...block} key={block.title} />
        ))}
    </nav>
  );
}

export interface INavbarBlock {
  title: string;
  items: INavbarBlockItem[];
  hidden?: boolean;
}
const NavbarBlock = ({ title, items }: INavbarBlock) => (
  <div className="mb-4 last:mb-0">
    <span className="inline-block mb-2 text-neutral-400 text-xs font-semibold">
      {title}
    </span>
    {items.map((item) => (
      <NavbarBlockItem {...item} key={item.value} />
    ))}
  </div>
);

export interface INavbarBlockItem {
  value: string;
  title: string;
  renderIcon: (selected?: boolean, hovered?: boolean) => ReactNode;
  onMouseEnter: MouseEventHandler;
}
const NavbarBlockItem = ({
  value,
  title,
  renderIcon,
  onMouseEnter,
}: INavbarBlockItem) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    onMouseEnter(e);
    setHovered(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);
  return (
    <Link
      to={`./${value}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex gap-2 mb-2 last:mb-0 items-center"
      getActiveProps={() => ({ className: 'text-neutral-100' })}
      getInactiveProps={() => ({
        className:
          'text-neutral-400 hover:text-neutral-300 hover:cursor-pointer',
      })}
    >
      {({ isActive }) => (
        <>
          {renderIcon(isActive, hovered)}
          {title}
          <MatchRoute to={value} pending>
            <Spinner />
          </MatchRoute>
        </>
      )}
    </Link>
  );
};

export default Navbar;
