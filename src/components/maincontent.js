import '../styles/main.css';
import Header from './header';
import Invoices from './invoices';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userDataChange } from '../features/userDataReducer';
import { invoiceList } from '../features/invoicelist';

import { db, auth, onAuth } from '../fireData/firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function MainContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuth(auth, (user) => {
      if (user) {
        const getDataForUser = async () => {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            dispatch(
              invoiceList.setinvoiceData({
                Invoices: [
                  {
                    billto: { name: 'john', address: '12345northstreet' },
                    invoicenumber: 100,
                  },
                  {
                    billto: { name: 'mike', address: '12345northstreet' },
                    invoicenumber: 200,
                  },
                ],
              })
            );

            dispatch(userDataChange.setUserData({ name: 'john' }));
          } else {
            console.log('new user being created');
            await setDoc(doc(db, 'users', user.uid), {
              Invoices: [
                {
                  billto: { name: 'john', address: '12345northstreet' },
                  invoicenumber: 100,
                },
                {
                  billto: { name: 'mike', address: '12345northstreet' },
                  invoicenumber: 200,
                },
              ],
              userInformation: { name: 'jake', age: 50 },
            });
            //

            dispatch(
              invoiceList.setinvoiceData({
                Invoices: [
                  {
                    billto: { name: 'john', address: '12345northstreet' },
                    invoicenumber: 100,
                  },
                  {
                    billto: { name: 'mike', address: '12345northstreet' },
                    invoicenumber: 200,
                  },
                ],
              })
            );
          }
        };

        return getDataForUser();
      } else {
        dispatch(userDataChange.setUserData({ name: false, age: 50 }));
      }
    });
  }, [dispatch]);

  return (
    <div className="main">
      <Header />
      <Invoices />
    </div>
  );
}

export default MainContent;
