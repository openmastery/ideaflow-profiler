import {DiscoveryCycle} from "./discoveryCycle";
import {Metric} from "./metric";
export class TroubleShootingJourney {
    constructor(
        public relativePath: string,
        public description: string,
        public position: Date,
        public relativePositionInSeconds: number,
        public durationInSeconds: number,

        public contextTags: Array<string>,
        public painTags: Array<string>,

        public discoveryCycles: Array<DiscoveryCycle>,
        public allMetrics: Array<Metric>,
        public dangerMetrics: Array<Metric>,
    ){}
}


