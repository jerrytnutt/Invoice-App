import '../styles/header.css';
import SignInSheet from './signInSheet';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { sidebarVisibility } from '../features/sidebarvisibility';
import { useDispatch } from 'react-redux';
import { auth, signOutUser } from '../fireData/firebase-config';

function Header() {
  const [showSignIn, setshowSignIn] = useState(false);
  const userAge = useSelector((state) => state.cost.value.age);
  const dispatch = useDispatch();

  const handleClick = () => {
    setshowSignIn(true);
  };

  const signOut = () => {
    signOutUser(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const LogOutButton = () => {
    let content = (
      <button
        onClick={() => {
          signOut();
        }}
      >
        Log Out
      </button>
    );
    return <div>{content}</div>;
  };
  return (
    <header>
      <button
        onClick={() => {
          dispatch(sidebarVisibility.setsidebarData('sidebarVisible'));
        }}
      >
        side bar
      </button>
      <div className="buttonContainer">
        {userAge === 0 ? (
          <button onClick={handleClick}>Sign Up</button>
        ) : (
          <LogOutButton />
        )}
      </div>

      {showSignIn ? <SignInSheet setshowSignIn={setshowSignIn} /> : null}
    </header>
  );
}

export default Header;
