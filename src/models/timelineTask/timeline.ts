import { IdeaFlowBand } from './ideaFlowBands';
import { Event } from './event';
import { executionEvent } from './executionEvent';

export class Timeline {
    constructor(
        public start: Date,
        public end: Date,
        public durationInSeconds: number,
        public relativePositionInSeconds: number,
        public ideaFlowBands:<IdeaFlowBand>[],
        public events:<event>[],
        public executionEvents:<executionEvent>[],
        position: Date
    ){}
}
