
export class ActivitySummary {
  constructor(
    public activityType: string, //editor, external
    public activityName: string, //fileName or External
    public activityDetail: string, //filePath (tooltip contents, null for external)

    public modifiedDurationInSeconds: number,
    public totalDurationInSeconds: number,

){}
}
