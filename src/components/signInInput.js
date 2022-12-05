import '../styles/signInSheet.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { userDataActions } from '../features/userDataReducer';
import { useState } from 'react';
import { auth, createUser, signInUser } from '../fireData/firebase-config';

function SignInInput(props) {
  const [returningUser, setreturningUser] = useState(true);
  const dispatch = useDispatch();

  const createNewAccount = (username, email, password) => {
    console.log(email);
    createUser(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user.uid);
        dispatch(
          userDataActions.setUserData({
            userName: username,
            userID: userCredential.user.uid,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        // ..
      });
  };
  const signInExistingAccount = (email, password) => {
    console.log(email, password);
    signInUser(auth, email, password)
      .then((userCredential) => {
        // Signed in

        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let username = event.target[1].value;
    let email = event.target[2].value;
    let password = event.target[3].value;
    console.log(username, email, password);
    props.setshowSignInInput(false);
    if (returningUser) {
      return signInExistingAccount(
        event.target[0].value,
        event.target[1].value
      );
    }
    return createNewAccount(username, email, password);
  };
  const UsernameInput = () => {
    let content = (
      <Form.Group className="mb-3" controlId="formBasicuserName">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Username"
          autoComplete="on"
        />
      </Form.Group>
    );
    return <div>{content}</div>;
  };
  // Same user name is allowed but same email is not.
  return (
    <Form className="fourm" onSubmit={handleSubmit}>
      <button
        className="closeButton"
        onClick={() => {
          props.setshowSignInInput(false);
        }}
      >
        x
      </button>
      {returningUser ? null : <UsernameInput />}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          autoComplete="on"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          autoComplete="on"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Button
          onClick={() => {
            return setreturningUser(false);
          }}
        >
          New User ?
        </Button>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SignInInput;
