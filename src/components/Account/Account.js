import '../../styles/account.css';
import { useState } from 'react';

import UserInfoDisplay from './UserInfoDisplay';
import Progress from './progress';
import { useSelector, useDispatch } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../fireData/firebase-config';
import { userDataActions } from '../../features/userDataReducer';

function Account() {
  const [editUserInfo, seteditUserInfo] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userData.value);
  const invoiceData = useSelector((state) => state);

  const updateUserInfo = async (data) => {
    const newUserData = {
      userName: user.userName,
      userID: user.userID,
      companyName: data.companyName,
      companyAddress: data.companyAddress,
      companyEmail: '',
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

  return (
    <div className="outerPage">
      <div className="accountTabs">
        <div className="accountLeft">
          <p>Company</p>
        </div>
        <div className="accountRight">
          <p>Name</p>

          <p>Address</p>
        </div>
        <UserInfoDisplay
          editUserInfo={editUserInfo}
          user={user}
          updateUserInfo={updateUserInfo}
        />
      </div>
      <div className="accountTabs">
        <div className="accountLeft">
          <Progress invoiceData={invoiceData} />
        </div>
        <div className="accountRight"></div>
      </div>
      <button onClick={handleClick}></button>
    </div>
  );
}

export default Account;
