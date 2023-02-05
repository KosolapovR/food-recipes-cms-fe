import React, {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import MoleculeIcon from '../../components/icons/molecule.svg';
import BookIcon from '../../components/icons/book.svg';
import UsersIcon from '../../components/icons/users.svg';
import {
  Link,
  MatchRoute,
  useLoadRoute,
  useMatchRoute,
} from '@tanstack/react-location';
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
          value: 'recipes',
          title: 'Recipes',
          renderIcon: (selected, hovered) => (
            <BookIcon
              fill={selected ? '#FFFFFF' : hovered ? '#CCCCCC' : '#999999'}
            />
          ),
          selected: true,
          onMouseEnter: () => loadRoute({ to: 'recipes' }),
        },
        {
          value: '/',
          title: 'Dashboard',
          renderIcon: (selected, hovered) => (
            <MoleculeIcon
              fill={selected ? '#FFFFFF' : hovered ? '#CCCCCC' : '#999999'}
            />
          ),
          selected: false,
          onMouseEnter: () => loadRoute({ to: 'dashboard' }),
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
          selected: false,
          onMouseEnter: () => loadRoute({ to: 'users' }),
        },
      ],
    },
  ];

  return (
    <nav className="fixed z-10 w-52 h-full bg-zinc-700 p-6 mt-16 shadow-md">
      {blocks
        .filter((block) => !block.hidden)
        .map((block, index) => (
          <NavbarBlock key={index} {...block} />
        ))}
    </nav>
  );
}

export interface INavbarBlock {
  title: string;
  items: INavbarBlockItem[];
  hidden?: boolean;
}
const NavbarBlock = ({ title, items }: INavbarBlock) => {
  const matchRoute = useMatchRoute();
  return (
    <div className="mb-4 last:mb-0">
      <span className="inline-block mb-2 text-neutral-400 text-xs font-semibold">
        {title}
      </span>
      {items.map((item, index) => (
        <NavbarBlockItem
          key={index}
          {...item}
          selected={!!matchRoute({ to: item.value })}
        />
      ))}
    </div>
  );
};

export interface INavbarBlockItem {
  value: string;
  title: string;
  renderIcon: (selected?: boolean, hovered?: boolean) => ReactNode;
  selected?: boolean;
  onMouseEnter: MouseEventHandler;
}
const NavbarBlockItem = ({
  value,
  title,
  selected,
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
      getActiveProps={() => ({ className: 'text-neutral-100' })}
      getInactiveProps={() => ({
        className:
          'text-neutral-400 hover:text-neutral-300 hover:cursor-pointer',
      })}
    >
      <div className="flex gap-2 mb-2 last:mb-0">
        {renderIcon(selected, hovered)}
        <span>{title}</span>
        <MatchRoute to={value} pending>
          <Spinner />
        </MatchRoute>
      </div>
    </Link>
  );
};

export default Navbar;
