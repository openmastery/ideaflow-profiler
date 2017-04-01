export class Event {
    constructor(
        public position: Date,
        public relativePositionInSeconds: number,
        public fullPath: string,
        public description: string,
        public type: string
    ){}
}
