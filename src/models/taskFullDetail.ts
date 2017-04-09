import { Task } from './task';
import { Timeline } from './taskDetail/timeline';
import { IdeaFlowStory } from './taskDetail/ideaFlowStory';

export class TaskFullDetail {
    constructor(
        public task: Task,
        public timeline: Timeline,
        public subtaskTimelines: Array<Timeline>,
        public ideaFlowStory: IdeaFlowStory
    ){}

}
