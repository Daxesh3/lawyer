import { FC, PropsWithChildren } from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-[#000000] min-h-screen">
      <Header />
      <div className="main-content-wrapper flex-grow overflow-y-auto min-h-[calc(100vh-220px)]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
