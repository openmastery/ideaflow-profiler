import {BaseIdentifiableAuditable} from './base-identifiable-auditable';

export class Developer extends BaseIdentifiableAuditable {
  apiKey: string;

  constructor(readonly id: number,
              name: string,
              email: string) {
    super(id);
  }
}
