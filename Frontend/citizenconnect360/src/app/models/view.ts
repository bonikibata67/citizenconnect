// export interface View {
//     id: string;
//     username: string;
//     location: string;
//     role: string;
//     content: string;
//     createdAt: string; // Ensure this matches the backend field
//   }
  export  interface View {
    viewID?: number;
    username: string;
    location: string;
    role: string;
    viewText: string;
    createdAt?: Date;
  }