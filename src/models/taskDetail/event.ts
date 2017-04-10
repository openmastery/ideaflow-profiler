export class Event {
    constructor(
        public id: number,
        public position: Date,
        public relativePositionInSeconds: number,
        public fullPath: string,
        public description: string,
        public type: string
    ){}
}
