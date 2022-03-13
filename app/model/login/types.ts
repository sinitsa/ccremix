export interface LoginForm extends LoginFields {
  pendingLogin?: boolean;
  error?: boolean;
  message?: string;
}
export interface LoginFields extends LoginField{
  password?: string;
}
export interface LoginField {
  login?: string;
}