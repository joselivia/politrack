export interface Candidate {
  id?: number;
  name: string;
  party?: string;
  profile?: string | File | null;
  votes?: number;
}
export interface Question {
  id?: number;
  question_text: string;
  type: string;
  is_competitor_question?: boolean;
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
  voting_expires_at: string;
  spoiled_votes?: number;
  results?: Candidate[];
  competitors?: Candidate[];
  questions?: Question[];
  published: boolean;
  created_at: Date | string;
}
