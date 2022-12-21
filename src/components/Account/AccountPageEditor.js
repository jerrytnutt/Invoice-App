import '../../styles/account.css';
//import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AccountPageInput(props) {
  //const [editUserInfo, seteditUserInfo] = useState(false);
  console.log(props);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    props.updateUserInfo(formProps);
  };

  return (
    <div>
      {true ? (
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="companyName">
              <Form.Control required name="companyName" type="name" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="companyEmail">
              <Form.Control required name="companyEmail" type="email" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="companyAddress">
              <Form.Control required name="companyAddress" type="name" />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      ) : (
        <>
          <p>Company Name</p>
          <p>Company Address true</p>
        </>
      )}
    </div>
  );
}

export default AccountPageInput;
