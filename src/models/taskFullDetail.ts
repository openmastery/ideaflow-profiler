import { Task } from './task';
import { Timeline } from './taskDetail/timeline';
import { IdeaFlowStory } from './taskDetail/ideaFlowStory';
import {Haystack} from "./haystack/haystack";

export class TaskFullDetail {
    constructor(
        public task: Task,
        public timeline: Timeline,
        public subtaskTimelines: Array<Timeline>,
        public haystacks: Array<Haystack>,
        public ideaFlowStory: IdeaFlowStory
    ){}

}
