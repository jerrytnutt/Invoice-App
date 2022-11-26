import '../styles/header.css';
import SignInInput from './signInInput';
import { sidebarVisibility } from '../features/sidebarvisibility';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth, signOutUser } from '../fireData/firebase-config';

function Header() {
  const [showSignInInput, setshowSignInInput] = useState(false);
  // come back to this
  const userName = useSelector((state) => state.userData.value.name);
  console.log(userName);
  //////////////////////////////////
  const dispatch = useDispatch();

  const LogOutButton = () => {
    let content = (
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
        Log Out
      </button>
    );
    return <div>{content}</div>;
  };
  return (
    <header>
      <div className="headerButtons">
        {!userName ? (
          <button
            onClick={() => {
              setshowSignInInput(true);
            }}
          >
            Sign Up
          </button>
        ) : (
          <LogOutButton />
        )}
      </div>
      <button
        className="sideBarButton"
        onClick={() => {
          dispatch(sidebarVisibility.setsidebarData('sidebarVisible'));
        }}
      >
        {'>'}
      </button>

      {showSignInInput ? (
        <SignInInput setshowSignInInput={setshowSignInInput} />
      ) : null}
    </header>
  );
}

export default Header;
