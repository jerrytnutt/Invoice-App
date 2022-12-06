import '../styles/dashboard.css';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { MdAccountBox } from 'react-icons/md';
import { MdSpaceDashboard } from 'react-icons/md';

function Dashboard() {
  return (
    <div className="dashboard">
      <div>
        <p>Dashboard</p>
        <MdSpaceDashboard fontSize="100px" />
      </div>
      <div>
        <p>Invoices</p>
        <FaFileInvoiceDollar fontSize="100px" />
      </div>
      <div>
        <p>Account</p>
        <MdAccountBox fontSize="100px" />
      </div>
    </div>
  );
}

export default Dashboard;
