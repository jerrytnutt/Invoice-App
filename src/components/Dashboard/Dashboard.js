import '../../styles/dashboard.css';
import Progress from './progress';
import { MdAccountBox } from 'react-icons/md';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashTab">
        <p>Invoices</p>
        <p>Paid vs Pending</p>
        <Progress />
      </div>
      <div className="dashTab">
        <p>Account</p>

        <MdAccountBox fontSize="100px" />
      </div>
    </div>
  );
}

export default Dashboard;
