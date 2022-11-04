import React, { ReactNode } from 'react';
import Header from './header';
import Navbar from './navbar';
import { useLocation } from '@tanstack/react-location';

import ChevronLeft from '../components/icons/chevron-left.svg';
import ChevronRight from '../components/icons/chevron-right.svg';

export interface ILayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: ILayoutProps) => {
  const location = useLocation();

  const onBack = () => location.history.back();
  const onForward = () => location.history.forward();

  return (
    <div className="min-w-96">
      <Header />
      <div className="flex min-h-screen">
        <Navbar />
        <div
          onClick={onBack}
          className="fixed min-h-screen w-10 flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-50 mt-16 ml-40 md:ml-52"
        >
          <ChevronLeft fill={'#555555'} />
        </div>
        <main className="ml-60 md:ml-62 mt-16 bg-slate-50 p-6 w-full mr-10">
          {children}
        </main>
        <div
          onClick={onForward}
          className="fixed right-0 min-h-screen w-10 flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-50 mt-16"
        >
          <ChevronRight fill={'#555555'} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
