import '../styles/header.css';
import BasicExample from './signInSheet';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { auth, signOutUser } from '../fireData/firebase-config';

function Header() {
  const [showResults, setShowResults] = useState(false);
  const cost = useSelector((state) => state);
  console.log(cost.cost.value);
  const onClick = () => setShowResults(true);
  const signOut = () => {
    signOutUser(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <header>
      <div className="buttonContainer">
        <button onClick={onClick}>Log In</button>
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign Out ({cost.cost.value.name} **{cost.cost.value.age})
        </button>
      </div>

      {showResults ? <BasicExample setShowResults={setShowResults} /> : null}
    </header>
  );
}

export default Header;
