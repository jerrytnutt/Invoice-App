import '../styles/main.css';
import Header from './header';
import Invoices from './invoices';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { userDataChange } from '../features/reducers';

import { db, auth, onAuth } from '../fireData/firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function MainContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuth(auth, (user) => {
      if (user) {
        // console.log('There is a user', user.uid);

        const setUpNewUser = async () => {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            dispatch(userDataChange.setUserData(userData));
          } else {
            // doc.data() will be undefined in this case
            console.log('new user being created');
            await setDoc(doc(db, 'users', user.uid), {
              name: 'Los Angeles',
              age: 55,
            });
            dispatch(userDataChange.setUserData({ name: 'tom', age: 89 }));
          }
        };

        return setUpNewUser();
      } else {
        dispatch(userDataChange.setUserData({ name: '', age: 0 }));
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
