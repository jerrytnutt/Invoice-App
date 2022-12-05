import '../../styles/completedinvoice.css';

function CompletedInvoice(props) {
  console.log(props);
  return (
    <div className="outer">
      <header>
        <div></div>
        <div></div>
      </header>
      <div className="completedInvoiceContainer">
        <h1>Company Name</h1>
        <p>Company Address 123 northstreet</p>
        <div className="upperDiv">
          <div className="upperOne">
            <h1>Invoice Date</h1>
            <p>123 northstreet</p>
            <h1>Payment Date</h1>
            <p> 123 northstreet</p>
          </div>
          <div className="upperTwo">
            <h1>Bill To</h1>
            <p>Name</p>
            <p>123 northstreet</p>
          </div>
          <div className="upperThree">
            <h1>Sent to</h1>
            <p>Email</p>
          </div>
        </div>
        <div className="lowerDiv">lower</div>
        Edit
        <button
          onClick={() => {
            props.setinvoicePageType(false);
          }}
        ></button>
      </div>
    </div>
  );
}

export default CompletedInvoice;
