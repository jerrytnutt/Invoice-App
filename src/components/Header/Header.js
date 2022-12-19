import '../../styles/header.css';
import SignInInput from './signInInput';
import { sidebarVisibility } from '../../features/sidebarvisibility';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { RiAccountCircleLine } from 'react-icons/ri';
import { userDataActions } from '../../features/userDataReducer';
import { invoiceList } from '../../features/invoicelist';

import { auth, signOutUser } from '../../fireData/firebase-config';

function Header() {
  const [showSignInInput, setshowSignInInput] = useState(false);
  const visibility = useSelector((state) => state.sidebarvisibility.value);

  const userName = useSelector((state) => state.userData.value.userName);

  const dispatch = useDispatch();

  const HideSidebarButton = () => {
    if (visibility !== 'sidebarVisible') {
      return (
        <BsFillArrowRightSquareFill
          onClick={() => {
            dispatch(sidebarVisibility.setsidebarData('sidebarVisible'));
          }}
        />
      );
    }
  };

  const SignUpandLogOutButtons = () => {
    let content = (
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
    );
    if (userName) {
      content = (
        <button
          onClick={() => {
            signOutUser(auth)
              .then(() => {
                dispatch(invoiceList.resetData());
                dispatch(userDataActions.resetUserData());
              })
              .catch((error) => {
                // An error happened.
              });
          }}
        >
          <div>
            <BsFillArrowRightSquareFill />
          </div>
          <p>Log Out</p>
        </button>
      );
    }
    return <div>{content}</div>;
  };
  return (
    <header>
      <div className="signAndLogButtons">
        <SignUpandLogOutButtons />
      </div>
      <div className="sideBarCloseIcon">
        <HideSidebarButton />
      </div>

      {showSignInInput ? (
        <SignInInput setshowSignInInput={setshowSignInInput} />
      ) : null}
    </header>
  );
}

export default Header;
