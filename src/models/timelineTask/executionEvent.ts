export class ExecutionEvent {
    constructor(
        public position: Date,
        public relativePositionInSeconds: number,
        public fullPath: string,
        public processName: string,
        public executionTaskType: string,
        public debug: boolean,
        public failed: boolean,
        public durationInSeconds: number
    ){}
}
