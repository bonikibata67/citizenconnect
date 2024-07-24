export interface View {
    id: string;
    username: string;
    location: string;
    role: string;
    content: string;
    createdAt: string; // Ensure this matches the backend field
  }