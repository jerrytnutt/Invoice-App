import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

function InvoiceTable(props) {
  const invoiceList = useSelector((state) => state.invoiceList.value);

  const handleClick = (data) => {
    const obj = JSON.parse(data);

    props.setinvoiceContent({ type: 'Complete', data: obj });
  };

  return (
    <Table striped bordered hover variant="dark">
      {invoiceList.map((element, index) => (
        <tbody key={index}>
          <tr>
            <td>#{element.invoicenumber}</td>
            <td>Due: {element.dates.due}</td>
            <td>{element.customer.name}</td>
            <td>q: {element.service.quantity}</td>
            <td>${element.service.amount}</td>
            <td data={JSON.stringify(element)} id="dataTd">
              <BsFillArrowRightCircleFill
                id="set"
                onClick={() => {
                  handleClick(JSON.stringify(element));
                }}
              />
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
}

export default InvoiceTable;
