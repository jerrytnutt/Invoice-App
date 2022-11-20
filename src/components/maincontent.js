import '../styles/main.css';
import Header from './header';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { userDataChange } from '../features/reducers';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  db,
  auth,
  onAuth,
  //..firestoreCollection,
  //firestoreDocs,
} from '../fireData/firebase-config';

function MainContent() {
  const dispatch = useDispatch();

  const addData = () => {
    dispatch(userDataChange.setUserData({ cost: 20 }));
  };

  useEffect(() => {
    onAuth(auth, (user) => {
      if (user) {
        // console.log('There is a user', user.uid);

        const make = async () => {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log(7);
            const userData = docSnap.data();
            //  dispatch(userDataChange.setUserData(userData));
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
            await setDoc(doc(db, 'users', user.uid), {
              name: 'Los Angeles',
              age: 55,
            });
          }
        };
        // const getFirestoreData = async (id) => {
        // console.log(id);
        //  const querySnapshot = await firestoreDocs(
        //    firestoreCollection(db, 'users')
        //  );
        // console.log(querySnapshot);
        //  querySnapshot.forEach((doc) => {
        //   console.log(doc.id);
        // });
        //};
        return make();

        //dispatch(costChange.login({ cost: 20 }));
      } else {
        console.log('No user');
        // dispatch(costChange.login({ cost: 0 }));
      }
    });
  }, [dispatch]);

  return (
    <div className="main">
      <Header />

      <button
        onClick={() => {
          console.log(7);
        }}
      >
        sign
      </button>
      <button
        onClick={() => {
          addData();
        }}
      >
        data
      </button>
    </div>
  );
}

export default MainContent;
