import { CapacityDistribution } from './capacityDistribution';
import { Subtask } from './Subtask';
import { Metric } from './metric';

export class IdeaFlowStory {
    constructor(
        public relativePath: string,
        public description: string,
        public relativePositionInSeconds: number,
        public durationInSeconds: number,
        public position: Date,
        public contextTags: <any>[],
        public painTags: <any>[],
        public frequency: number,
        public capacityDistribution:<CapacityDistribution>,
        public subtasks: <Subtask>[],
        public metrics: <Metric>[]
    ){}
}
