import '../../styles/SignUpForm.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userDataActions } from '../../features/userDataReducer';
import {
  auth,
  db,
  createUser,
  signInUser,
} from '../../fireData/firebase-config';

import { doc, setDoc } from 'firebase/firestore';

function SignInInput(props) {
  const [errorMessage, seterrorMessage] = useState(null);
  const [returningUser, setreturningUser] = useState(true);
  const dispatch = useDispatch();

  const createNewAccount = (username, email, password) => {
    createUser(auth, email, password)
      .then((userCredential) => {
        setDoc(doc(db, 'users', userCredential.user.uid), {
          Invoices: [],
          userData: {
            userName: username,
            userID: userCredential.user.uid,
            userImg: '',
            companyName: '',
            companyAddress: '',
            companyEmail: '',
          },
        });

        dispatch(
          userDataActions.setUserData({
            userName: username,
            userID: userCredential.user.uid,
            userImg: '',
            companyName: '',
            companyAddress: '',
            companyEmail: '',
          })
        );
        props.setshowSignInInput(false);
      })
      .catch((error) => {
        // error
        seterrorMessage(error.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (returningUser) {
      return signInUser(auth, event.target[1].value, event.target[2].value)
        .then((userCredential) => {
          props.setshowSignInInput(false);
          // ...
        })
        .catch((error) => {
          seterrorMessage(error.message);
        });
    }

    let username = event.target[2].value;
    let email = event.target[3].value;
    let password = event.target[4].value;
    return createNewAccount(username, email, password);
  };
  const runDemoMode = () => {
    console.log(6);
  };

  return (
    <>
      <div className="backgroundCover"></div>
      <Form className="SignUpform" onSubmit={handleSubmit}>
        <h3>Explore site's features in Demo mode</h3>
        <Button variant="success" onClick={runDemoMode}>
          Demo
        </Button>
        <br></br>
        <br></br>
        <button
          className="closeButton"
          onClick={() => {
            props.setshowSignInInput(false);
          }}
        >
          X
        </button>
        {errorMessage ? <p className="errorMessage">{errorMessage}</p> : null}
        {returningUser ? (
          <Form.Label className="topTitle">Sign In</Form.Label>
        ) : (
          <Form.Group className="mb-3" controlId="formBasicuserName">
            <Form.Label className="topTitle">Create Account</Form.Label>
            <br></br>
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="username"
              placeholder="Username"
              autoComplete="on"
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            autoComplete="on"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            autoComplete="on"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          {returningUser ? (
            <Button
              onClick={() => {
                return setreturningUser(false);
              }}
            >
              New User?
            </Button>
          ) : null}
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default SignInInput;
