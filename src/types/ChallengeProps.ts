export interface ChallengeProps {
  name: string;
  challenges: Array<{ name: string; points: number; isCompleted: boolean }>;
}
