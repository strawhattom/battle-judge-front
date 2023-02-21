export interface ChallengeProps {
  name: string;
  challenges: Array<{
    handleFile: any;
    name: string;
    points: number;
    isCompleted: boolean;
    title: string;
    category: string;
    description: string;
  }>;
}
