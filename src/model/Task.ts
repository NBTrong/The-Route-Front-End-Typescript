export default interface Task {
  id: string,
  content: string,
  note: string,
  startDate: string,
  endDate: string,
  completed: number,
  userID: number
  milestoneID: number,
  roadmapID: number,
}
