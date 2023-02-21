export interface ChallengeLayoutProps {
  name: string;
  points: number;
  isCompleted: boolean;
  title: string;
  category: string;
  description: string;

  handleFile(fileUploaded: any): void;
}
