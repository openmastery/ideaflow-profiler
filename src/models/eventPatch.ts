import {FormattableSnippet} from "./taskDetail/formattableSnippet";
export class EventPatch {
  constructor(public description: string,
              public faq: string,
              public formattableSnippet: FormattableSnippet
  ){}
}
