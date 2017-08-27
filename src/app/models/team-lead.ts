import {Developer} from './developer';

export class TeamLead extends Developer {
  teamId: number;

  constructor(readonly id: number,
              lastName: string,
              firstName: string) {
    super(id, lastName, firstName);
  }
}
