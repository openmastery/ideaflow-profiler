import {User} from './user';

export class TeamLead extends User {
  teamId: number;

  constructor(readonly id: number,
              lastName: string,
              firstName: string) {
    super(id, lastName, firstName);
  }
}
