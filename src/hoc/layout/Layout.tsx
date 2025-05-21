import { FC, PropsWithChildren } from 'react';
import { Header } from '../header/Header';
import Footer from '../footer/Footer';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="main-content-wrapper">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
