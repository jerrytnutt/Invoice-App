import '../styles/sidebar.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';

import { sidebarVisibility } from '../features/sidebarvisibility';
import { mainPageContent } from '../features/mainpagecontent';

function Sidebar() {
  const visibility = useSelector((state) => state.sidebarvisibility.value);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (window.innerWidth < 720) {
      dispatch(sidebarVisibility.setsidebarData('mobileHidden'));
    } else {
      dispatch(sidebarVisibility.setsidebarData('sidebarHidden'));
    }
  };

  useLayoutEffect(() => {
    function updateSize() {
      if (visibility === 'sidebarVisible' || visibility === 'sidebarMobile') {
        if (window.innerWidth < 720) {
          dispatch(sidebarVisibility.setsidebarData('sidebarMobile'));
        } else {
          dispatch(sidebarVisibility.setsidebarData('sidebarVisible'));
        }
      } else if (
        visibility === 'sidebarHidden' ||
        visibility === 'mobileHidden'
      )
        if (window.innerWidth < 720) {
          dispatch(sidebarVisibility.setsidebarData('mobileHidden'));
        }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [visibility, dispatch]);

  return (
    <div className={visibility} id="change-class">
      <div className="logo">
        <h1>Logo</h1>
      </div>
      <div className="tabs">
        <h3 onClick={handleClick} href="#home">
          close
        </h3>
        <h3
          onClick={() => {
            dispatch(mainPageContent.setmainPageContent('one'));
          }}
          href="#home"
        >
          One
        </h3>
        <h3
          onClick={() => {
            dispatch(mainPageContent.setmainPageContent('two'));
          }}
          href="#home"
        >
          Two
        </h3>
      </div>
    </div>
  );
}

export default Sidebar;
