import { Component, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent {
  // posts = [
  //   { title: 'First post', content: 'content section' },
  //   { title: 'Second post', content: 'content section' },
  //   { title: 'Third post', content: 'content section' }
  // ];

  @Input() posts: Post[] = [];
}
