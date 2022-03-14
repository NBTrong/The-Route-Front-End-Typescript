import Milestone from './Milestone';

export default interface Roadmap{
  id: string,
  isRoadmapOwner: boolean,
  name: string,
  description: string,
  image: string,
  slug: string,
  current: number,
  followsCount: number,
  liked: boolean,
  likeCount: number,
  author: {
    avatar: string,
    name: string,
    userName: string,
  }
  milestones: Milestone[],
}
