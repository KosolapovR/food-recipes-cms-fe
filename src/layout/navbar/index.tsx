import React, { MouseEventHandler, ReactNode } from 'react';
import MoreIcons from '../../components/icons/more.svg';
import {
  Link,
  MatchRoute,
  useLoadRoute,
  useMatchRoute,
} from '@tanstack/react-location';

function Navbar() {
  const loadRoute = useLoadRoute();

  const blocks: INavbarBlock[] = [
    {
      title: 'DASHBOARD',
      items: [
        {
          value: 'recipes',
          title: 'Recipes',
          renderIcon: (selected) => (
            <MoreIcons fill={selected ? '#FFFFFF' : '#999999'} />
          ),
          selected: true,
          onMouseEnter: () => loadRoute({ to: 'recipes' }),
        },
        {
          value: '/',
          title: 'Dashboard',
          renderIcon: (selected) => (
            <MoreIcons fill={selected ? '#FFFFFF' : '#999999'} />
          ),
          selected: false,
          onMouseEnter: () => loadRoute({ to: 'dashboard' }),
        },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        {
          value: 'users',
          title: 'Users',
          renderIcon: (selected) => (
            <MoreIcons fill={selected ? '#FFFFFF' : '#999999'} />
          ),
          selected: false,
          onMouseEnter: () => loadRoute({ to: 'users' }),
        },
      ],
    },
  ];

  return (
    <div className="fixed z-10 w-40 md:w-52 h-full bg-zinc-700 p-6 mt-16 shadow-md">
      {blocks.map((block, index) => (
        <NavbarBlock key={index} {...block} />
      ))}
    </div>
  );
}

export interface INavbarBlock {
  title: string;
  items: INavbarBlockItem[];
}
const NavbarBlock = ({ title, items }: INavbarBlock) => {
  const matchRoute = useMatchRoute();
  return (
    <div className="mb-4 last:mb-0">
      <span className="inline-block mb-2 text-neutral-400 text-sm font-semibold">
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
  renderIcon: (selected?: boolean) => ReactNode;
  selected?: boolean;
  onMouseEnter: MouseEventHandler;
}
const NavbarBlockItem = ({
  value,
  title,
  selected,
  renderIcon,
  onMouseEnter,
}: INavbarBlockItem) => (
  <Link
    to={`./${value}`}
    onMouseEnter={onMouseEnter}
    getActiveProps={() => ({ className: 'text-neutral-100' })}
    getInactiveProps={() => ({
      className: 'text-neutral-400 hover:text-neutral-300 hover:cursor-pointe',
    })}
  >
    <div className="flex gap-2 mb-2 last:mb-0">
      {renderIcon(selected)}
      <span>{title}</span>
      <MatchRoute to={value} pending>
        ...
      </MatchRoute>
    </div>
  </Link>
);

export default Navbar;
