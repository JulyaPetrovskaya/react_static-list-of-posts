import React from 'react';

import './App.scss';
import './components/PostList/PostList.scss';
import './components/PostInfo/PostInfo.scss';
import './components/CommentList/CommentList.scss';
import './components/CommentInfo/CommentInfo.scss';
import './components/UserInfo/UserInfo.scss';

import postsFromServer from './api/posts';
import commentsFromServer from './api/comments';
import usersFromServer from './api/users';
import { PostList } from './components/PostList/PostList';
import { Post } from './api/types/posts';
import { User } from './api/types/user';
import { Comment } from './api/types/comments';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getComments(postId: number): Comment[] | [] {
  const foundComments = commentsFromServer.filter(
    comment => comment.postId === postId,
  );

  return foundComments || [];
}

export const posts: Post[] = postsFromServer.map(post => ({
  ...post,
  user: getUser(post.userId),
  comments: getComments(post.id),
}));

export const App: React.FC = () => (
  <section className="App">
    <h1 className="App__title">Static list of posts</h1>
    <PostList posts={posts} />
  </section>
);
