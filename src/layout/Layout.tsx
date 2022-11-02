import React, { ReactNode } from 'react';
import Header from './header';
import Navbar from './navbar';

export interface ILayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="relative min-w-96 overflow-auto">
      <Header />
      <div className="flex min-h-screen">
        <Navbar />
        <main className="ml-40 md:ml-52 mt-16 bg-slate-50 p-6 w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
