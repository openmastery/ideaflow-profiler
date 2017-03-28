import { Task } from './task';
import { Timeline } from './taskTimeline/timeline';
import { IdeaFlowStory } from './taskTimeline/ideaFlowStory';

export class TaskTimeline {
    constructor(
        public task: Task,
        public timeline: Timeline,
        public subtaskTimelines: Array<Timeline>,
        public ideaFlowStory: IdeaFlowStory
    ){}

}
