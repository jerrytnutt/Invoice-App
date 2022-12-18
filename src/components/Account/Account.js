import '../../styles/account.css';
import { useState } from 'react';
import AccountPageInput from './AccountPageEditor';
import { useSelector, useDispatch } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../fireData/firebase-config';
import { userDataActions } from '../../features/userDataReducer';

function Account() {
  const [editUserInfo, seteditUserInfo] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userData.value);

  const updateUserInfo = async (data) => {
    const newUserData = {
      userName: user.userName,
      userID: user.userID,
      companyName: data.companyName,
      companyAddress: data.companyAddress,
      companyEmail: data.companyEmail,
    };

    const dataRef = doc(db, 'users', user.userID);
    await updateDoc(dataRef, {
      userData: newUserData,
    });
    dispatch(userDataActions.setUserData(newUserData));
    seteditUserInfo(false);
  };
  const handleClick = () => {
    return seteditUserInfo(!editUserInfo);
  };
  const UserInfoDisplay = () => {
    let content = (
      <div>
        <p>{user.companyName}</p>
        <p>{user.companyEmail}</p>
        <p>{user.companyAddress}</p>
      </div>
    );
    if (editUserInfo) {
      content = (
        <div>
          <AccountPageInput updateUserInfo={updateUserInfo} />
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
