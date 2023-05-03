import { User } from './user.type.js';

export type Comment = {
  text: string;
  publishDate: string;
  rating: number;
  author: User;
}
