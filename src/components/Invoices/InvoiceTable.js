import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

function InvoiceTable(props) {
  const invoiceList = useSelector((state) => state.invoiceList.value);
  //console.log(invoiceList);

  const handleClick = (event) => {
    event.preventDefault();
    let obj = event.target.getAttribute('data');
    obj = JSON.parse(obj);

    props.setinvoiceContent({ type: 'Complete', data: obj });
  };
  const CreateInvoiceList = () => {
    let content = invoiceList.map((element, index) => {
      let data = JSON.stringify(element);

      return (
        <tr key={index}>
          <td>#{element.invoicenumber}</td>
          <td>Due: {element.dates.due}</td>
          <td>{element.customer.name} Taylor</td>
          <td>${element.service.amount}</td>
          <td data={data} onClick={handleClick}>
            <BsFillArrowRightCircleFill id="set" />
          </td>
        </tr>
      );
    });
    return <tbody>{content}</tbody>;
  };
  return (
    <Table striped bordered hover variant="dark">
      <CreateInvoiceList />
    </Table>
  );
}

export default InvoiceTable;
