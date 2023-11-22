export interface AuthErrors {
  email?: ErrorInfo;
  password?: ErrorInfo;
  name?: ErrorInfo;
  userName?: ErrorInfo;
  msg?: string;
}

export interface UpdateErrors extends AuthErrors {
  budget?: ErrorInfo;
}

export interface ErrorInfo {
  type?: string;
  value?: string;
  msg?: string;
  path?: string;
  location?: string;
}
