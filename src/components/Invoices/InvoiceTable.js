import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';

function InvoiceTable(props) {
  const invoiceList = useSelector((state) => state.invoiceList.value);
  //console.log(invoiceList);
  const handleClick = (event) => {
    event.preventDefault();
    let obj = event.target.getAttribute('data');
    obj = JSON.parse(obj);
    props.setinvoicePageType({ type: 'Complete', data: obj });
  };
  const CreateInvoiceList = () => {
    let content = invoiceList.map((element, index) => {
      let data = JSON.stringify(element);

      return (
        <tr key={index}>
          <td>{element.invoicenumber}</td>
          <td>{element.dates.invoice}</td>
          <td>{element.customer.name}</td>
          <td data={data} onClick={handleClick}>
            {element.service.amount}
          </td>
        </tr>
      );
    });
    return <tbody>{content}</tbody>;
  };
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Full Name</th>
          <th>Amount</th>
        </tr>
      </thead>
      <CreateInvoiceList />
    </Table>
  );
}

export default InvoiceTable;
