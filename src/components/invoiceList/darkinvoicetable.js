import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';

function DarkInvoiceTable(props) {
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
      let name = element.billto.name;
      let data = JSON.stringify(element);
      // console.log(element);

      return (
        <tr key={index}>
          <td>1</td>
          <td>{name}</td>
          <td>Otto</td>
          <td data={data} onClick={handleClick}>
            @mdo
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
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <CreateInvoiceList />
    </Table>
  );
}

export default DarkInvoiceTable;
