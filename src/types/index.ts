export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface User {
  id: string;
  email: string;
}

export type TaskFilter = 'all' | 'pending' | 'completed' | 'today' | 'overdue';