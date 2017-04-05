import {CapacityEntry} from "./capacityEntry";
export class CapacityDistribution {
    constructor(
        public LEARNING: CapacityEntry,
        public PROGRESS: CapacityEntry,
        public TROUBLESHOOTING: CapacityEntry
    ){}
}
