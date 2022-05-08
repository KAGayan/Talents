export type UserType = 'Agency' | 'Applicant';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    userType: UserType;
}

export interface LoginReqest {
    username: string;
    password: string;
}
export interface RegisterReqest {
    accountType: string;
    confirmPassword:string;
    email: string;
    newPassword: string;
}

export interface Auth {
    isAuthenticated: boolean,
    token: string,
  }
export interface UserRespons {
    user: User;
    auth: Auth
}
