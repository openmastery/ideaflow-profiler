export class FaqSummary {
    constructor(
        public taskPath: string,
        public fullPath: string,

        public faqType: string,
        public eventDescription:string,
        public faqAnnotation:string,
        public taskName:string,

        public position: Date,
        public journeyPainInSeconds: number,
        public taskPainInSeconds: number,

        public contextTags: Array<string>,
        public painTags: Array<string>,

    ){}
}
