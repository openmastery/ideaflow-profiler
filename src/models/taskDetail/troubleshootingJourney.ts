import {PainCycle} from "./painCycle";
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

        public allMetrics: Array<Metric>,
        public dangerMetrics: Array<Metric>,

        public painCycles: Array<PainCycle>,

        public isExpanded: boolean,
        public showFaqs: boolean,
        public showSnippets: boolean,
    ){}
}


