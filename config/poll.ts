export interface Candidate {
  id?: number;
  name: string;
  party?: string;
  votes?: number;
}

export interface Question {
  id?: number;
  text: string;
  options?: string[];
}

export interface PollData {
  id: number;
  title: string;
  presidential: string;
  category: string;
  region: string;
  county: string;
  constituency?: string;
  ward?: string;
  total_votes: number;
  spoiled_votes?: number;
  published: boolean;
  voting_expires_at: string;
  created_at: string | Date;
  results?: Candidate[];
  competitors?: Candidate[];
  questions?: Question[];
}
