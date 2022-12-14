import '../styles/sidebar.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';

import { sidebarVisibility } from '../features/sidebarvisibility';
import { mainPageContent } from '../features/mainpagecontent';

import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { MdAccountBox } from 'react-icons/md';

function Sidebar() {
  const visibility = useSelector((state) => state.sidebarvisibility.value);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    function updateSize() {
      if (visibility !== 'sidebarHidden') {
        // Giving the sidebar the mobileVisible class when screen size decreases allows
        // the sidebar to adjust properly flex wraps it to the top of the screen.
        if (window.innerWidth < 1000) {
          return dispatch(sidebarVisibility.setsidebarData('mobileVisible'));
        }

        return dispatch(sidebarVisibility.setsidebarData('sidebarVisible'));
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [visibility, dispatch]);

  return (
    <div className={visibility}>
      <div
        className="closeIcon"
        onClick={() => {
          dispatch(sidebarVisibility.setsidebarData('sidebarHidden'));
        }}
      >
        <BsFillArrowLeftSquareFill />
      </div>

      <div className="tabContainer">
        <div>
          <h3
            onClick={() => {
              dispatch(mainPageContent.setmainPageContent('invoice'));
            }}
          >
            Invoice
          </h3>
          <div className="tabIcon">
            <FaFileInvoiceDollar />
          </div>
        </div>
        <div>
          <h3
            onClick={() => {
              dispatch(mainPageContent.setmainPageContent('account'));
            }}
          >
            Account
          </h3>
          <div className="tabIcon">
            <MdAccountBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
