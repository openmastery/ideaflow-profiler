export class Metric {
    constructor(
        public value: number,
        public type: string,
        public valueType: string,
        public danger: boolean
    ){}
}
