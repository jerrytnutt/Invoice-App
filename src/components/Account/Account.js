import '../../styles/account.css';
import { useState } from 'react';

function Account() {
  const [editUserInfo, seteditUserInfo] = useState(false);
  const handleClick = () => {
    console.log(editUserInfo);
    return seteditUserInfo(!editUserInfo);
  };
  const UserInfoDisplay = () => {
    let content = (
      <div>
        <p>Company Name</p>
        <p>Company Address false false false</p>
      </div>
    );
    if (editUserInfo) {
      content = (
        <div>
          <p>Company Name</p>
          <p>Company Address true</p>
        </div>
      );
    }
    return <div className="accountFinal">{content}</div>;
  };
  return (
    <div className="outerPage">
      <div className="accountTabs">
        <div className="accountLeft">
          <p>Company Name</p>
        </div>
        <div className="accountRight">
          <p>Company Name</p>
          <p>Company Address</p>
        </div>
        <UserInfoDisplay />
      </div>
      <div className="accountTabs">
        <div className="accountLeft"></div>
        <div className="accountRight"></div>
      </div>
      <button onClick={handleClick}></button>
    </div>
  );
}

export default Account;
