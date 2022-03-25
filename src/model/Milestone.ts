import Task from './Task';

export default interface Milestone {
  description: string,
  endDate: string,
  id: string,
  name: string,
  roadmapID: number,
  startDate: string,
  type: 'date' | 'month' | 'year',
  userID: number,
  tasks: Task[],
}
