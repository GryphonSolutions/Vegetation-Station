import { signOut } from 'firebase/auth';
import { auth } from '../../../../server/database/firebase.js';

export const logout = async () => {
  await signOut(auth);
};
