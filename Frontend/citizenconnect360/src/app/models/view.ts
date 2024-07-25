// export interface View {
//     id: string;
//     username: string;
//     location: string;
//     role: string;
//     content: string;
//     createdAt: string; // Ensure this matches the backend field
export interface View {
  Username: string;
  Location: string;
  Role: string;
  ViewText: string;
  CreatedAt?: string; // Assuming CreatedAt is optional and added by the backend
}