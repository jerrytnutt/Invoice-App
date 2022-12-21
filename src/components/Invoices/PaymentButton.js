import { BsCircleFill } from 'react-icons/bs';
function PaymentButton(props) {
  return (
    <div>
      {props.payment ? (
        <div className="paidTrue">
          <div className="ball">
            <BsCircleFill />
          </div>
          <p>Paid</p>
        </div>
      ) : (
        <div className="paidInfo">
          <div className="ball">
            <BsCircleFill />
          </div>
          <p>Pending</p>
        </div>
      )}
    </div>
  );
}

export default PaymentButton;
