import React, { ReactNode } from 'react';
import cn from 'classnames';
import MoreIcons from '../../components/icons/more.svg';

const blocks: INavbarBlock[] = [
	{
		title: 'DASHBOARD',
		items: [
			{
				title: 'Cards',
				icon: <MoreIcons fill={'#FFFFFF'} />,
				selected: true,
			},
			{
				title: 'Analytics',
				icon: <MoreIcons fill={'#999999'} />,
				selected: false,
			},
			{
				title: 'Reports',
				icon: <MoreIcons fill={'#999999'} />,
				selected: false,
			},
		],
	},
	{
		title: 'SETTINGS',
		items: [
			{
				title: 'Users',
				icon: <MoreIcons fill={'#999999'} />,
				selected: false,
			},
		],
	},
];
function Navbar() {
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
	return (
		<div className="mb-4 last:mb-0">
			<span className="inline-block mb-2 text-neutral-400 text-sm font-semibold">
				{title}
			</span>
			{items.map((item, index) => (
				<NavbarBlockItem key={index} {...item} />
			))}
		</div>
	);
};

export interface INavbarBlockItem {
	title: string;
	icon: ReactNode;
	selected?: boolean;
}
const NavbarBlockItem = ({ title, selected, icon }: INavbarBlockItem) => (
	<div className="flex gap-2 mb-2 last:mb-0">
		{icon}
		<span
			className={cn(
				!selected &&
					'text-neutral-400 hover:text-neutral-300 hover:cursor-pointer',
				selected && 'text-neutral-100'
			)}
		>
			{title}
		</span>
	</div>
);

export default Navbar;
