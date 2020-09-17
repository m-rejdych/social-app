import { Reducer } from './index';

export interface Auth {
  email: string;
  firstName: string;
  lastName: string;
  userId: string;
}

export interface RequiredUserData {
  email: string;
  password: string;
}

export interface OptionalUserData extends RequiredUserData {
  firstName: string;
  lastName: string;
}

export interface AuthState extends Reducer, Auth {}
