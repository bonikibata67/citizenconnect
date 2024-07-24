export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
  }
  
  export interface adduser {
    username: string;
    email: string;
    password: string;
    role: string;
  }
  
  export interface loginresponse {
    token: string;
    user: User | null;
    message?: string; // Optional message property
  }
  
  export interface registerresponse {
    token: string;
    user: User;
    message: string; // Required message property
  }
  export interface loginuser{
    username:string,
    password:string

}
  


