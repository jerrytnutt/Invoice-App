import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { invoiceList } from '../../features/invoicelist';

function FilterDropDown() {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoiceList.value);
  // Numeric sorted values can have greatest values at top or bottom
  const [greatestValueTop, setgreatestValueTop] = useState(false);

  const filterList = () => {
    let newInvoice = invoice.slice();

    newInvoice = newInvoice.filter((item) => {
      return item.paidStatus === false;
    });
    dispatch(invoiceList.setinvoiceData(newInvoice));
  };

  const sortNumeric = (arg) => {
    let newInvoice = invoice.slice();
    newInvoice = newInvoice.sort(
      (a, b) => parseFloat(a.service[arg]) - parseFloat(b.service[arg])
    );
    if (greatestValueTop) {
      newInvoice.reverse();
    }

    dispatch(invoiceList.setinvoiceData(newInvoice));
  };

  return (
    <Navbar variant="dark" bg="dark">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Sort By"
              menuVariant="dark"
            >
              <NavDropdown.Item
                onClick={() => {
                  sortNumeric('amount');
                }}
              >
                Amount
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  sortNumeric('quantity');
                }}
              >
                Quantity
              </NavDropdown.Item>

              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>

          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Direction"
              menuVariant="dark"
            >
              <NavDropdown.Item
                onClick={() => {
                  setgreatestValueTop(true);
                }}
              >
                Greatest
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setgreatestValueTop(false);
                }}
              >
                Lowest
              </NavDropdown.Item>

              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Filter"
              menuVariant="dark"
            >
              <NavDropdown.Item onClick={filterList}>Not Paid</NavDropdown.Item>

              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FilterDropDown;
