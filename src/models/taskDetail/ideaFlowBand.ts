export class IdeaFlowBand {
    constructor(
        public id: string,
        public fullPath: string,
        public start: Date,
        public end: Date,
        public durationInSeconds: number,
        public relativePositionInSeconds: number,
        public type: string
    ){}
}
