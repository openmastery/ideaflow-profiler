export class Task {
    constructor(
        public id: number,
        public creationDate: Date,
        public modifyDate: Date,
        public name:string,
        public description:string,
        public project:string
    ){}
}
