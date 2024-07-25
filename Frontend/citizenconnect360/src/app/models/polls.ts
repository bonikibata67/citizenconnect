export interface PollOption {
  pollId: string;
  label: string;
  percentage: number;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  question: string;
  totalVotes: number;
  options: PollOption[];
  creationTime: string; // Add this line
}

// export interface PollOption {
//   pollId: string;
//   label: string;
//   percentage: number;
//   votes: number;
// }

// export interface Poll {
//   id: string;
//   title: string;
//   question: string;
//   totalVotes: number;
//   options: PollOption[]; // Ensure it matches the backend naming
// }

// export interface PollOption {
  
//   label: string;
//   percentage: number;
//   votes: number;
// }

// export interface Poll {  
//   id: string;
//   title: string;
//   question: string;
//   pollOption: PollOption[];
//   totalVotes: number;
// }


