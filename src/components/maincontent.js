import '../styles/main.css';
import Header from './header';
import Invoices from './invoiceList/invoices';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userDataActions } from '../features/userDataReducer';
import { invoiceList } from '../features/invoicelist';

import { db, auth, onAuth } from '../fireData/firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function MainContent() {
  const dispatch = useDispatch();

  const mainContentComponent = useSelector(
    (state) => state.mainPageContent.value
  );

  const renderSwitch = (parm) => {
    switch (parm) {
      case 'invoice':
        return (
          <div>
            <Invoices />
          </div>
        );
      case 'other':
        return <div>other</div>;
      default:
        return <div>Dashboard</div>;
    }
  };

  useEffect(() => {
    onAuth(auth, (user) => {
      if (user) {
        const getDataForUser = async () => {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            dispatch(invoiceList.setinvoiceData(docSnap.data().Invoices));
            dispatch(userDataActions.setUserData(docSnap.data().userData));
          } else {
            await setDoc(doc(db, 'users', user.uid), {
              Invoices: [
                {
                  billto: { fullName: 'john', address: '12345northstreet' },
                  sellTo: { fullName: 'john', address: '12345northstreet' },

                  invoicenumber: 100,
                  dataCreated: 0,
                  dateDue: 0,
                  service: { description: '', quantity: 0, cost: 0 },
                },
              ],
              userData: {
                userName: 'Company Name',
                userID: user.uid,
                address: '',
              },
            });

            // can be changed to empty later
            dispatch(invoiceList.setinvoiceData([]));
          }
        };

        return getDataForUser();
      } else {
        dispatch(invoiceList.resetData());
        dispatch(userDataActions.resetUserData());
      }
    });
  }, [dispatch]);

  return (
    <div className="main">
      <Header />

      {renderSwitch(mainContentComponent)}
    </div>
  );
}

export default MainContent;
