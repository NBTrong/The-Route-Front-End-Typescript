/* eslint-disable no-param-reassign */
// Hook
import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';

// Model
import Roadmap from '../model/Roadmap';
import Milestone from '../model/Milestone';
import Task from '../model/Task';

// Services
import RoadmapServices from '../services/RoadmapService';
import MilestoneServices from '../services/MilestoneServices';
import TaskServices from '../services/TaskServices';

interface ActionType {
  type: string,
  id?: string,
  options?: any,
}

const handleResponseTask = (param: any) => {
  const newTask: Task = {
    id: param.id,
    content: param.content,
    note: param.note,
    startDate: param.start_date,
    endDate: param.end_date,
    completed: param.completed,
    userID: param.user_id,
    milestoneID: param.milestone_id,
    roadmapID: param.roadmap_id,
  };
  return newTask;
};

const handleResponseMilestone = (param: any) => {
  const newMilestone: Milestone = {
    description: param.description,
    endDate: param.end_date,
    id: param.id,
    name: param.name,
    roadmapID: param.roadmap_id,
    startDate: param.start_date,
    type: param.type,
    userID: param.user_id,
    tasks: param?.tasks ? param.tasks.map((task: Task) => handleResponseTask(task)) : [],
  };
  return newMilestone;
};

const handleResponseRoadmap = (param: any) => {
  const newRoadmap: Roadmap = {
    id: param.roadmap.id,
    isRoadmapOwner: param.is_roadmap_owner,
    name: param.roadmap.name,
    description: param.roadmap.description,
    image: param.roadmap.image,
    slug: param.roadmap.slug,
    current: param.roadmap.current,
    followsCount: param.roadmap.follows_count,
    liked: param.roadmap.liked,
    likeCount: param.roadmap.likes_count,
    author: {
      avatar: param.roadmap.user.avatar,
      name: param.roadmap.user.name,
      userName: param.roadmap.user.username,
    },
    milestones: param.milestones.map((milestone: Milestone) => handleResponseMilestone(milestone)),
  };
  return newRoadmap;
};

const likeRoadmap = async (roadmap: Roadmap): Promise<Roadmap> => {
  const { slug } = roadmap;
  try {
    await RoadmapServices.likeRoadmap(slug);
    const newRoadmap: Roadmap = {
      ...roadmap,
      liked: true,
      likeCount: roadmap.likeCount + 1,
    };
    return newRoadmap;
  } catch {
    return roadmap;
  }
};

const unlikeRoadmap = async (roadmap: Roadmap): Promise<Roadmap> => {
  const { slug } = roadmap;
  try {
    await RoadmapServices.unlikeRoadmap(slug);
    const newRoadmap: Roadmap = {
      ...roadmap,
      liked: false,
      likeCount: roadmap.likeCount - 1,
    };
    return newRoadmap;
  } catch {
    return roadmap;
  }
};

const updateRoadmap = async (roadmap: Roadmap, options: any) => {
  const { slug } = roadmap;
  try {
    const response = await RoadmapServices.updateRoadmap(slug, options);
    if (response.data.status === 'success') {
      const newRoadmap = {
        ...roadmap,
        name: response.data.roadmap.name,
        description: response.data.roadmap.description,
        current: response.data.roadmap.current,
      };
      return newRoadmap;
    }
    return roadmap;
  } catch {
    return roadmap;
  }
};

const addMilestone = async (roadmap: Roadmap, options: any) => {
  try {
    options = {
      ...options,
      roadmapID: roadmap.id,
    };
    const response = await MilestoneServices.addMilestone(options);
    if (response.data.status === 'success') {
      const newMilestone = handleResponseMilestone(response.data.milestone);
      const newRoadmap = cloneDeep(roadmap);
      newRoadmap.milestones.push(newMilestone);
      newRoadmap.milestones.sort((a : Milestone, b : Milestone) => +a.startDate - +b.startDate);
      return newRoadmap;
    }
    return roadmap;
  } catch (error) {
    return roadmap;
  }
};

const updateMilestone = async (roadmap: Roadmap, id: string, options: any) => {
  try {
    const response = await MilestoneServices.updateMilestone(id, options);
    if (response.data.status === 'success') {
      const newMilestone = handleResponseMilestone(response.data.milestone);
      const newRoadmap = cloneDeep(roadmap);
      const index = newRoadmap.milestones.findIndex((milestone) => milestone.id === id);
      newRoadmap.milestones[index] = {
        ...newMilestone,
        tasks: newRoadmap.milestones[index].tasks,
      };
      newRoadmap.milestones.sort((a : any, b : any) => {
        if (a.start_date < b.start_date) {
          return -1;
        }
        if (a.start_date > b.start_date) {
          return 1;
        }
        return 0;
      });
      return newRoadmap;
    }
    return roadmap;
  } catch (error) {
    return roadmap;
  }
};

const deleteMilestone = async (roadmap: Roadmap, id: string) => {
  try {
    const response = await MilestoneServices.deleteMilestone(id);
    if (response.data.status === 'success') {
      const newRoadmap = cloneDeep(roadmap);
      newRoadmap.milestones = newRoadmap.milestones.filter((milestone) => milestone.id !== id);
      return newRoadmap;
    }
    return roadmap;
  } catch (error) {
    return roadmap;
  }
};

const addTask = async (roadmap: Roadmap, options: any) => {
  try {
    const response = await TaskServices.addTask(options);
    if (response.data.status === 'success') {
      const newTask = handleResponseTask(response.data.task);
      const newRoadmap = cloneDeep(roadmap);
      const index = newRoadmap.milestones.findIndex(
        (milestone) => milestone.id === options.milestoneID,
      );
      newRoadmap.milestones[index].tasks.push(newTask);
      return newRoadmap;
    }
    return roadmap;
  } catch (error) {
    return roadmap;
  }
};

const updateTask = async (roadmap: Roadmap, id: string, options: any) => {
  try {
    const response = await TaskServices.updateTask(id, options);
    if (response.data.status === 'success') {
      const newTask = handleResponseTask(response.data.task);
      const newRoadmap = cloneDeep(roadmap);
      newRoadmap.milestones.forEach((milestone) => {
        for (let i = 0; i < milestone.tasks.length; i += 1) {
          if (milestone.tasks[i].id === id) {
            milestone.tasks[i] = { ...newTask };
          }
        }
      });
      return newRoadmap;
    }
    return roadmap;
  } catch (error) {
    return roadmap;
  }
};

const removeTask = async (roadmap: Roadmap, id: string) => {
  try {
    const response = await TaskServices.removeTask(id);
    if (response.data.status === 'success') {
      const newRoadmap = cloneDeep(roadmap);
      newRoadmap.milestones.forEach((milestone) => {
        milestone.tasks = milestone.tasks.filter((task) => task.id !== id);
      });
      return newRoadmap;
    }
    return roadmap;
  } catch (error) {
    return roadmap;
  }
};

const useRoadmap = (slug: string) => {
  const [roadmap, setRoadmap] = useState<Roadmap>({} as Roadmap);
  const navigate = useNavigate();

  const dispatchRoadmap = useCallback(async (action: ActionType) => {
    switch (action.type) {
      case 'likeRoadmap': {
        const newRoadmap = await likeRoadmap(roadmap);
        return setRoadmap(newRoadmap);
      }

      case 'unlikeRoadmap': {
        const newRoadmap = await unlikeRoadmap(roadmap);
        return setRoadmap(newRoadmap);
      }
      case 'updateRoadmap': {
        const { options } = action;
        const newRoadmap = await updateRoadmap(roadmap, options);
        return setRoadmap(newRoadmap);
      }
      case 'addMilestone': {
        const { options } = action;
        const newRoadmap = await addMilestone(roadmap, options);
        return setRoadmap(newRoadmap);
      }

      case 'updateMilestone': {
        const { id, options } = action;
        if (!id) return roadmap;
        const newRoadmap = await updateMilestone(roadmap, id, options);
        return setRoadmap(newRoadmap);
      }

      case 'deleteMileStone': {
        const { id } = action;
        if (!id) return roadmap;
        const newRoadmap = await deleteMilestone(roadmap, id);
        return setRoadmap(newRoadmap);
      }

      case 'addTask': {
        const { options } = action;
        const newRoadmap = await addTask(roadmap, options);
        return setRoadmap(newRoadmap);
      }

      case 'updateTask': {
        const { id, options } = action;
        if (!id) return roadmap;
        const newRoadmap = await updateTask(roadmap, id, options);
        return setRoadmap(newRoadmap);
      }

      case 'removeTask': {
        const { id } = action;
        if (!id) return roadmap;
        const newRoadmap = await removeTask(roadmap, id);
        return setRoadmap(newRoadmap);
      }

      default:
        return roadmap;
    }
  }, [roadmap]);

  const duplicateRoadmap = async () => {
    try {
      const response = await RoadmapServices.duplicateRoadmap(slug);
      navigate(`/roadmap/${response.data.roadmap.slug}`);
      window.location.reload();
    } catch {
      // TODO
    }
  };

  const getRoadmap = useCallback(async () => {
    try {
      const response = await RoadmapServices.fullRoadmap(slug);
      const newRoadmap = handleResponseRoadmap(response.data);
      if (newRoadmap.milestones.length > 0) {
        newRoadmap.milestones.sort(
          (a: Milestone, b: Milestone) => +(a.startDate) - +(b.startDate),
        );
      }
      return setRoadmap(newRoadmap);
    } catch {
      return setRoadmap({} as Roadmap);
    }
  }, [slug]);

  useEffect(() => {
    getRoadmap();
  }, [getRoadmap]);

  return {
    roadmap,
    dispatchRoadmap,
    duplicateRoadmap,
  };
};

export default useRoadmap;
