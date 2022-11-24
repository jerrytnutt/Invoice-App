import '../styles/sidebar.css';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { sidebarVisibility } from '../features/sidebarvisibility';

function Sidebar() {
  const visibility = useSelector((state) => state.sidebarvisibility.value);
  const dispatch = useDispatch();
  console.log(visibility);
  const handleClick = () => {
    // if (sidebarb) {
    dispatch(sidebarVisibility.setsidebarData('sidebarHidden'));
    //  return document
    //   .querySelector('#change-class')
    //  .classList.add('sidebarHidden');
    //}
    // console.log('its false');
    // dispatch(sidebarVisibility.setsidebarData(true));
    // return document
    //  .querySelector('#change-class')
    //  .classList.remove('sidebarHidden');
  };

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
