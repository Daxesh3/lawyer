import { FC, PropsWithChildren } from 'react';
import { Header } from '../header/Header';
import Footer from '../footer/Footer';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-[#000000] min-h-screen">
      <Header />
      <div className="main-content-wrapper flex-grow overflow-y-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
