import { Task } from './task';
import { Timeline } from './timelineTask/timeline';
import { IdeaFlowStory } from './timelineTask/ideaFlowStory';

export class TimelineTask {
    constructor(
        public task: <Task>,
        public timeline: <Timeline>,
        public ideaFlowStory: <IdeaFlowStory>
    ){}
}
