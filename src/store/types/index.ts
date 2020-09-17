export interface Reducer {
  loading: boolean;
  error: string | null;
}

export interface Action<T> {
  type: string;
  payload: T;
}
