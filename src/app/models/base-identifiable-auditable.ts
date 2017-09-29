export class BaseIdentifiableAuditable {
  readonly id?: number;
  readonly creationDate: Date;
  modificationDate: Date;

  constructor(id?: number) {
    this.creationDate = new Date();
  }
}
