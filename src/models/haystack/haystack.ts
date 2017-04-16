
import {ActivitySummary} from "./activitySummary";

export class Haystack {
  constructor(
    public relativePath: string,

    public position: Date,
    public relativePositionInSeconds: number,

    public durationInSeconds: number,
    public executionDurationInSeconds: number,
    public processName: string,
    public executionTaskType: string,
    public failed: boolean,
    public debug: boolean,

    public activitySummaries: Array<ActivitySummary>,

    public isExpanded:boolean = false,

){}
}

