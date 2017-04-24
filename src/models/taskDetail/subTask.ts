import { CapacityDistribution } from './capacityDistribution';
import { Metric } from './metric';
import { TroubleShootingJourney } from './troubleshootingJourney';
import {Haystack} from "../haystack/haystack";

export class SubTask {
    constructor(
        public relativePath: string,
        public fullPath: string,
        public description: string,
        public relativePositionInSeconds: number,
        public durationInSeconds: number,
        public position: Date,
        public contextTags: Array<any>,
        public painTags: Array<any>,
        public frequency: number,
        public capacityDistribution:CapacityDistribution,
        public progressTicks: Array<any>,
        public troubleshootingJourneys: Array<TroubleShootingJourney>,

        public allMetrics: Array<Metric>,
        public dangerMetrics: Array<Metric>,

        public haystacks: Array<Haystack>,
        public flatHistory: Array<any>,
        public wtfsExpanded: boolean,
        public isExpanded: boolean

){}
}
