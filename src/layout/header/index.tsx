import React from 'react';
import MoreIcon from '../../components/icons/more.svg';

function Header() {
	return (
		<div className="fixed z-20 top-0 left-0 right-0 px-6 bg-white h-16 gap-4 shadow-md flex items-center justify-end">
			<span className="text-sm font-semibold">Arthur Solo</span>
			<MoreIcon fill={'#666666'} />
		</div>
	);
}

export default Header;
