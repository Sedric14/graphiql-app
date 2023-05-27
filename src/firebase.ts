/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-alert */
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import { addMessage } from './store/sysMessengerSlice';
import useDict from './hooks/useDict';
import { useAppDispatch } from './hooks/redux';
import humanReadableErrorFirebase from './helpers/humanReadableErrorFirebase';
import { removeUser, setUser } from './store/userSlice';
import { setOff, setOn } from './store/spinnerSlice';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const { user } = res;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    const e = err as Error;
    alert(e.message as string);
  }
};
const useLogInWithEmailAndPassword = () => {
  const getDictVal = useDict();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetching = async (email: string, password: string) => {
    try {
      dispatch(setOn());
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      const usr = { id: user.uid, token: user.refreshToken, email: user.email as string };
      dispatch(setUser(usr));
      dispatch(addMessage({ type: 'success', message: getDictVal('successLogin') }));
      navigate('/main');
    } catch (err) {
      const errMessage =
        getDictVal(humanReadableErrorFirebase(err as Error)) === '?????'
          ? humanReadableErrorFirebase(err as Error)
          : getDictVal(humanReadableErrorFirebase(err as Error));
      dispatch(
        addMessage({
          type: 'error',
          message: errMessage,
        }),
      );
    } finally {
      dispatch(setOff());
    }
  };

  const login = (email: string, password: string) => {
    fetching(email, password);
  };

  return [login];
};

const useRegisterWithEmailAndPassword = () => {
  const getDictVal = useDict();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fetching = async (email: string, password: string) => {
    try {
      dispatch(setOn());
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      const newUser = { id: user.uid, token: user.refreshToken, email: user.email as string };
      dispatch(setUser(newUser));
      dispatch(addMessage({ type: 'success', message: getDictVal('successRegistration') }));
      navigate('/main');
    } catch (err) {
      const errMessage =
        getDictVal(humanReadableErrorFirebase(err as Error)) === '?????'
          ? humanReadableErrorFirebase(err as Error)
          : getDictVal(humanReadableErrorFirebase(err as Error));
      dispatch(
        addMessage({
          type: 'error',
          message: errMessage,
        }),
      );
    } finally {
      dispatch(setOff());
    }
  };

  const registration = (email: string, password: string) => {
    fetching(email, password);
  };

  return [registration];
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    const e = err as Error;
    alert(e.message as string);
  }
};

const useLogout = () => {
  const dispatch = useAppDispatch();
  const out = async () => {
    dispatch(setOn());
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .finally(() => {
        dispatch(setOff());
      });
  };

  const logout = () => {
    out();
  };

  return [logout];
};

export {
  auth,
  db,
  signInWithGoogle,
  useLogInWithEmailAndPassword,
  useRegisterWithEmailAndPassword,
  sendPasswordReset,
  useLogout,
};
