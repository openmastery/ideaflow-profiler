import {BaseIdentifiableAuditable} from './base-identifiable-auditable';

export class User extends BaseIdentifiableAuditable {
  apiKey: string;

  constructor(public readonly id?: number,
              public name?: string,
              public email?: string) {
    super(id);
  }
}
