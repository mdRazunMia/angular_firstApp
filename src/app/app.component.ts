import { Component } from '@angular/core';
import { Post } from './posts/post.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'firstAngularApp';
  Storedposts: Post[] = [];

  onPostAdded(post){
    this.Storedposts.push(post);
  }


}
