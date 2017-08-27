import {BaseIdentifiableAuditable} from './base-identifiable-auditable';
import {Developer} from './developer';
import {TeamLead} from './team-lead';

export class Team extends BaseIdentifiableAuditable {
  developers: Developer[];
  tealLead: TeamLead;

  constructor(readonly id: number,
              name: string) {
    super(id);
  }
}
