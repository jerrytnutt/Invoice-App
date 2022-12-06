import '../styles/sidebar.css';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { MdDashboard } from 'react-icons/md';
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
      if (visibility === 'sidebarVisible' || visibility === 'mobileVisible') {
        if (window.innerWidth < 720) {
          return dispatch(sidebarVisibility.setsidebarData('mobileVisible'));
        }
        return dispatch(sidebarVisibility.setsidebarData('sidebarVisible'));
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
    <div className={visibility}>
      <div className="closeIcon" onClick={handleClick}>
        <BsFillArrowLeftSquareFill />
      </div>

      <div className="tabContainer">
        <div>
          <h3
            onClick={() => {
              dispatch(mainPageContent.setmainPageContent('dashboard'));
            }}
          >
            Dashboard <MdDashboard />
          </h3>
        </div>
        <div>
          <h3
            onClick={() => {
              dispatch(mainPageContent.setmainPageContent('invoice'));
            }}
          >
            Invoice <MdDashboard />
          </h3>
        </div>
        <div>
          <h3
            onClick={() => {
              dispatch(mainPageContent.setmainPageContent('account'));
            }}
            href="#home"
          >
            Account
            <MdDashboard />
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
