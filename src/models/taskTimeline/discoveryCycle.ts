import {FormattableSnippet} from "./formattableSnippet";
import {Metric} from "./metric";
import {ExperimentCycle} from "./experimentCycle";
export class DiscoveryCycle {
    constructor(
        public relativePath: string,
        public description: string,
        public position: Date,
        public relativePositionInSeconds: number,
        public durationInSeconds: number,

        public contextTags: Array<string>,
        public painTags: Array<string>,

        public faqAnnotation: string,
        public formattableSnippet: FormattableSnippet,

        public experimentCycles: Array<ExperimentCycle>,

        public allMetrics: Array<Metric>,
        public dangerMetrics: Array<Metric>,
    ){}

}


