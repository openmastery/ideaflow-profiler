import {BaseIdentifiableAuditable} from './base-identifiable-auditable';

export class User extends BaseIdentifiableAuditable {
  apiKey: string;

  constructor(readonly id: number,
              name: string,
              email: string) {
    super(id);
  }
}
