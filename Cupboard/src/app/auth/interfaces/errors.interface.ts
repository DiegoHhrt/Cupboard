export interface Errors {
  email?: ErrorInfo;
  password?: ErrorInfo;
  name?: ErrorInfo;
  userName?: ErrorInfo;
  msg?: string;
}

export interface ErrorInfo {
  type?: string;
  value?: string;
  msg?: string;
  path?: string;
  location?: string;
}
