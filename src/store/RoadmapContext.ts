/* Hook */
import { createContext } from 'react';

/* Model */
import Roadmap from '../model/Roadmap';

export interface Context {
  roadmap: Roadmap,
  dispatchRoadmap: (action: any) => Promise<void | Roadmap>,
  currentMilestoneID: string,
  setCurrentMilestoneID: React.Dispatch<React.SetStateAction<string>>
}

const RoadmapContext = createContext<Context>({} as Context);
export default RoadmapContext;
