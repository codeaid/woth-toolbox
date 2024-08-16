import type { User } from 'firebase/auth';

export interface FirebaseContextValue {
  db: IDBDatabase;
  user: User;
  userId: string;
}
