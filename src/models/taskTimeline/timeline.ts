import { IdeaFlowBand } from './ideaFlowBand';
import { Event } from './event';
import { ExecutionEvent } from './executionEvent';

export class Timeline {
    constructor(
        public start: Date,
        public end: Date,
        public durationInSeconds: number,
        public relativePositionInSeconds: number,
        public ideaFlowBands:Array<IdeaFlowBand>,
        public events:Array<Event>,
        public executionEvents:Array<ExecutionEvent>,
        position: Date
    ){}
}
