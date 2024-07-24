export interface User {
    Id: string,
    Username: string,
    Email: string,
    Password: string,
    isDeleted: number,
    isEmailSent: number,
    RoleID: number,
    isApproved: number,
  }
  

// export interface User{
//     Id:string,
//     Username:string
//     Email:string   
//     Password:string
//     isDeleted:number
//     isEmailSent:number
//     RoleID: number;
//     // Role:string
// }


export interface Payload{
    Sub:string
    Username:string
    role:string
}
