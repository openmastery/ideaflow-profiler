
export class ActivitySummary {
  constructor(
    public activityType: string, //editor, external
    public activityName: string, //fileName or External
    public activityDetail: string, //filePath (tooltip contents, null for external)

    public durationModifiedInSeconds: number,
    public durationInSeconds: number,

){}
}
