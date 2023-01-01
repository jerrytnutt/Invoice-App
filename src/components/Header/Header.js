import '../../styles/header.css';
import SignUpForm from './SignUpForm';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { RiAccountCircleLine } from 'react-icons/ri';
import { sidebarVisibility } from '../../features/sidebarvisibility';
import { userDataActions } from '../../features/userDataReducer';
import { invoiceList } from '../../features/invoicelist';

import { auth, signOutUser } from '../../fireData/firebase-config';

function Header() {
  const [showSignInInput, setshowSignInInput] = useState(true);
  const visibility = useSelector((state) => state.sidebarvisibility.value);

  const userName = useSelector((state) => state.userData.value.userName);
  const userImg = useSelector((state) => state.userData.value.userImg);

  const dispatch = useDispatch();
  const signOut = () => {
    signOutUser(auth)
      .then(() => {
        dispatch(invoiceList.resetData());
        dispatch(userDataActions.resetUserData());
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <header>
      <div className="signInAndLogButtons">
        {userName ? (
          <div className="imgContainer">
            <img src={userImg} alt="" className="profilePicture"></img>
            <button onClick={signOut}>
              <div>
                <BsFillArrowRightSquareFill />
              </div>
              <p>Log Out</p>
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setshowSignInInput(true);
            }}
          >
            <div>
              <RiAccountCircleLine />
            </div>
            <p>Sign Up</p>
          </button>
        )}
      </div>
      <div className="sideBarCloseIcon">
        {visibility === 'sidebarHidden' ? (
          <BsFillArrowRightSquareFill
            onClick={() => {
              dispatch(sidebarVisibility.setsidebarData('sidebarVisible'));
            }}
          />
        ) : null}
      </div>

      {showSignInInput && !userName ? (
        <SignUpForm setshowSignInInput={setshowSignInInput} />
      ) : null}
    </header>
  );
}

export default Header;
