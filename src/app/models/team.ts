import {BaseIdentifiableAuditable} from './base-identifiable-auditable';
import {User} from './developer';
import {TeamLead} from './team-lead';

export class Team extends BaseIdentifiableAuditable {
  developers: User[];
  tealLead: TeamLead;

  constructor(readonly id: number,
              name: string) {
    super(id);
  }
}
