// export interface PollOption {
//   pollId: string;  // Ensure pollId is included
//   label: string;
//   percentage: number;
//   votes: number;
// }

// export interface Poll {
//   id: string;
//   title: string;
//   question: string;
//   options: PollOption[];
//   totalVotes: number;
// }

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
  pollOption: PollOption[];
}

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


