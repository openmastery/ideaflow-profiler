import {PropertySortOrder} from "./propertySortOrders";
export class Pageable {
    constructor(
        public contents: Array<any>,
        public totalPages: number,
        public totalElements: Date,
        public pageNumber: Date,
        public elementsPerPage:string,
        public hasNext:string,
        public hasPrevious:string,
        public propertySortOrders: Array<PropertySortOrder>,
    ){}
}
