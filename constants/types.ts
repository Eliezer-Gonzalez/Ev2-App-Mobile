export interface Task {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  photoUri?: string;
}
