import {FormattableSnippet} from "./formattableSnippet";
import {Metric} from "./metric";
export class ExperimentCycle {
    constructor(
        public relativePath: string,
        public position: Date,
        public relativePositionInSeconds: number,
        public durationInSeconds: number,

        public contextTags: Array<string>,
        public painTags: Array<string>,

        public executionDurationInSeconds: number,
        public processName: string,
        public executionTaskType: string,
        public failed: boolean,
        public debug: boolean
    ){}

}
