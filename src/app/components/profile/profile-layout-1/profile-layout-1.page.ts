import { Component, Output, EventEmitter, Input, OnChanges } from "@angular/core";

@Component({
  selector: "cs-profile-layout-1",
  templateUrl: "profile-layout-1.page.html",
  styleUrls: ["profile-layout-1.page.scss"],
})
export class ProfileLayout1Page implements OnChanges {
  @Input() data: any;

  @Output() onItemClick = new EventEmitter();
  @Output() onLike = new EventEmitter();
  @Output() onComment = new EventEmitter();

  constructor() {}

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes["data"].currentValue;
  }

  onItemClickFunc(params: any, event: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.onItemClick.emit(params);
  }

  onLikeFunc(params: any, event: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.onLike.emit(params);
  }

  onCommentFunc(params: any, event: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.onComment.emit(params);
  }
}
