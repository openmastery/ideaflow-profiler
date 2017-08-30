import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {Subject} from 'rxjs/Subject';
import {User} from '../../app/models/user';
import {UserService} from '../../services';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  private user: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              public router: Router) {

  }

  ngOnInit() {
    let sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.initUserDetails(this.id);

  }

  initUserDetails(userId) {
    this.userService.getUserFullDetail(userId)
      .subscribe(
        userDetail => this.setUserFullDetail(userDetail),
        error => this.errorMessage = <any>error
      );
  }

  setUserFullDetail(userDetail) {
    this.userDetail = userDetail;
    this.activeTimeline = userDetail.timeline;
  }

  goToTopLevelUser() {
    this.activeTimeline = this.userDetail.timeline;
    this.activeSubuser = null;
  }

  goToSubuser(index, subuser) {
    this.activeTimeline = this.userDetail.subuserTimelines[index];
    this.activeSubuser = subuser;
  }

  goToGlossary(hashTag) {
    if (hashTag) {
      let hashTagWithoutPound = hashTag.substring(1, hashTag.length);
      this.router.navigate(['/glossary/user/' + this.id + '/tag/' + hashTagWithoutPound]);
    }
  }

  goToPanel(panelName) {
    this.activePanel = panelName;
    console.log('Nav to panel:' + panelName);
  }

  switchBreakdownType(event) {
    console.log("Switch!"+event)
  }

  handleCursorUpdated(currentPosition) {

    if (currentPosition.relativeTime != null) {
      this.activeCursor = currentPosition;
    } else {
      this.activeCursor = null;
    }

  }

  handleActiveSubuserUpdated(selectedSubuser) {
    console.log("Selection changed!" + selectedSubuser.index);
    this.activeSubuser = selectedSubuser.subuser;
    this.activeTimeline = this.userDetail.subuserTimelines[selectedSubuser.index];
  }

  formatRelative(time) {
    let d = Number(time);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);

    return ( h + ":" + (m < 10 ? "0" : "") + m );
  }


  formatDuration(duration) {
    let d = Number(duration);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(m % 3600 / 60);

    return ( (h > 0 ? h + "h " : "") + (m < 10 ? "0" : "") + m + "m "); //+ (s < 10 ? "0" : "") + s + "s")
  }

}
