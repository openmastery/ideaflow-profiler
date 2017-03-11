import { CapacityDistribution } from './capacityDistribution';
import { Metric } from './metric';

export class SubTask {
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
        public milestones: <any>[],
        public troubleshootingJourneys: <any>[],
        public metrics: <Metric>[]
    ){}
}
