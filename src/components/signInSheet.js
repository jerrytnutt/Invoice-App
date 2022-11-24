import '../styles/signInSheet.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { auth, createUser, signInUser } from '../fireData/firebase-config';

function SignInSheet(props) {
  const [logIn, setlogIn] = useState(true);

  const createNewAccount = (email, password) => {
    createUser(auth, email, password)
      .then((userCredential) => {
        // Signed in

        console.log(userCredential.user);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ..
      });
  };
  const signInExistingAccount = (email, password) => {
    signInUser(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.setshowSignIn(false);
    if (logIn) {
      return signInExistingAccount(
        event.target[0].value,
        event.target[1].value
      );
    }
    return createNewAccount(event.target[0].value, event.target[2].value);
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

  return (
    <Form className="fourm" onSubmit={handleSubmit}>
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

      {logIn ? null : <UsernameInput />}

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          autoComplete="on"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label
          onClick={() => {
            return setlogIn(false);
          }}
        >
          New User?
        </Form.Label>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button
        onClick={() => {
          props.setshowSignIn(false);
        }}
      >
        x
      </Button>
    </Form>
  );
}

export default SignInSheet;
