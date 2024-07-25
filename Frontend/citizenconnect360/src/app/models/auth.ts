export interface User {
    id: number;
    Username: string;
    Email: string;
    Password: string;
    Role: string;
  }
  
  export interface adduser {
    Username: string;
    Email: string;
    Password: string;
    Role: string;
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
    Username:string,
    Password:string

}
  


