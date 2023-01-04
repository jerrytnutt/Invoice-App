import '../styles/main.css';
import Header from './Header/Header';

import Invoices from './Invoices/invoices';
import Account from './Account/Account';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userDataActions } from '../features/userDataReducer';
import { invoiceList } from '../features/invoicelist';

import { db, auth, onAuth } from '../fireData/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

function MainContent() {
  const dispatch = useDispatch();

  const mainPageContent = useSelector((state) => state.mainPageContent.value);

  const renderSwitch = (parm) => {
    switch (parm) {
      case 'invoice':
        return (
          <div>
            <Invoices />
          </div>
        );
      case 'account':
        return (
          <div>
            <Account />
          </div>
        );
      default:
        return (
          <div>
            <Invoices />
          </div>
        );
    }
  };

  useEffect(() => {
    onAuth(auth, (user) => {
      // Triggers with 'Create Account, Sign Out, Log In'
      if (user) {
        const getDataForUser = async () => {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // If the user account already exist get the data from the firestore and
            // add to state.
            dispatch(invoiceList.setinvoiceData(docSnap.data().Invoices));
            dispatch(userDataActions.setUserData(docSnap.data().userData));
          }
        };

        return getDataForUser();
      }
    });
  }, [dispatch]);

  return (
    <div className="main">
      <Header />

      {renderSwitch(mainPageContent)}
    </div>
  );
}

export default MainContent;
