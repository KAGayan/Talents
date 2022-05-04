export type UserType = 'Agency' | 'Applicant';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    userType: UserType;
}

export interface LoginReqest {
    username: string;
    password: string
}

export interface Auth {
    isAuthenticated: boolean,
    token: string,
  }
export interface UserRespons {
    user: User;
    auth: Auth
}
