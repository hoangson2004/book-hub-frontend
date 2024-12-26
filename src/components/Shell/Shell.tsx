import React from 'react';
import './Shell.css';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

interface ShellProps {
  children: React.ReactNode;
}

const Shell: React.FC<ShellProps> = ({ children }) => {
  return (
    <div className="shell">
      <Header />

      <div className='shell-body'>
        <Nav />
        <main className="shell-content">
          {children}
        </main>
        <Footer />
        </div>
    </div>
  );
};

export default Shell;
