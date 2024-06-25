export interface Task {
  id: string;
  status: string;
  name: string;
  description: string;
}

export interface BoardTypes {
  id: string;
  name: string;
  tasks: Task[];
}
