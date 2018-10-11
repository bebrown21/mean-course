import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'First post', content: 'content section' },
  //   { title: 'Second post', content: 'content section' },
  //   { title: 'Third post', content: 'content section' }
  // ];

  posts: Post[] = [];
  private postSub: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => this.posts = posts);
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }
}
