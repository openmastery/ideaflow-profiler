import {BaseIdentifiableAuditable} from './base-identifiable-auditable';
import {Team} from './team';

export class Account extends BaseIdentifiableAuditable {
  apiKey: string;
  team: Team;

  constructor(id: number,
              name: string,
              description: string,
              projectId: number) {
    super(id);
  }
}
