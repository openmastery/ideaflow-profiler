export class TroubleShootingJourney {
    constructor(
        public position: Date,
        public relativePositionInSeconds: number,
        public fullPath: string,
        public comment: string,
        public type: string
    ){}
}
