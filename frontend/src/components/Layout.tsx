import { Outlet } from 'react-router-dom';

import { Header } from '.';

export const Layout = () => (
  <div className="flex h-screen flex-col">
    <Header />
    <section className="flex flex-1 overflow-hidden bg-background">
      <Outlet />
    </section>
  </div>
);
