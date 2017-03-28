import { CapacityDistribution } from './capacityDistribution';
import { Metric } from './metric';
import { TroubleShootingJourney } from './troubleshootingJourney';

export class SubTask {
    constructor(
        public relativePath: string,
        public description: string,
        public relativePositionInSeconds: number,
        public durationInSeconds: number,
        public position: Date,
        public contextTags: Array<any>,
        public painTags: Array<any>,
        public frequency: number,
        public capacityDistribution:CapacityDistribution,
        public milestones: Array<any>,
        public troubleshootingJourneys: Array<TroubleShootingJourney>,
        public metrics: Array<Metric>
    ){}
}
