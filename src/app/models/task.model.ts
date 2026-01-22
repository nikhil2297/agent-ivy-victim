export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
  createdAt?: Date;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
}
