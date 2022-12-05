import '../styles/header.css';
import SignInInput from './signInInput';
import { sidebarVisibility } from '../features/sidebarvisibility';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { auth, signOutUser } from '../fireData/firebase-config';

function Header() {
  const [showSignInInput, setshowSignInInput] = useState(false);
  const visibility = useSelector((state) => state.sidebarvisibility.value);

  const userName = useSelector((state) => state.userData.value.userName);

  const dispatch = useDispatch();

  const HideSidebarButton = () => {
    let content = null;
    if (visibility === 'sidebarHidden' || visibility === 'mobileHidden') {
      content = (
        <BsFillArrowRightSquareFill
          onClick={() => {
            dispatch(sidebarVisibility.setsidebarData('sidebarVisible'));
          }}
        />
      );
    }
    return <div>{content}</div>;
  };
  const SignUpandLogOutButtons = () => {
    let content = (
      <button
        onClick={() => {
          setshowSignInInput(true);
        }}
      >
        <div>
          <BsFillArrowRightSquareFill />
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
                // Sign-out successful.
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
      <div className="sideBarbutton">
        <HideSidebarButton />
      </div>

      {showSignInInput ? (
        <SignInInput setshowSignInInput={setshowSignInInput} />
      ) : null}
    </header>
  );
}

export default Header;
