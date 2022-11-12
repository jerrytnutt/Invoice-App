import '../styles/sidebar.css';
import { useState } from 'react';

function Sidebar() {
  const [page, setPage] = useState('One');
  const handleClick = () => {
    if (page === 'one') {
      return setPage('two');
    }
    return setPage('one');
  };
  return (
    <div className="sidebar">
      <div className="logo">
        <h1>Logo</h1>
      </div>
      <div className="tabs">
        <h3 onClick={handleClick} href="#home">
          One
        </h3>
        <h3 onClick={handleClick} href="#features">
          Two
        </h3>
        <h3 href="#pricing">Three</h3>
        <h3 href="#pricing">{page}</h3>
      </div>
    </div>
  );
}

export default Sidebar;
