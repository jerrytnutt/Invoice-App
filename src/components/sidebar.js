import '../styles/sidebar.css';
import { useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sidebarVisibility } from '../features/sidebarvisibility';

function Sidebar() {
  //const [isMobile, setIsMobile] = useState(false);
  const visibility = useSelector((state) => state.sidebarvisibility.value);
  const dispatch = useDispatch();
  //console.log(visibility);
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

  ///
  return (
    <div className={visibility} id="change-class">
      <div className="logo">
        <h1>Logo</h1>
      </div>
      <div className="tabs">
        <h3 onClick={handleClick} href="#home">
          One
        </h3>
      </div>
    </div>
  );
}

export default Sidebar;
