import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CommentServiceInterface } from './comment-service.interface.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import CommentService from './comment.service.js';
import { Service } from '../../types/service.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentServiceInterface>(Service.CommentService)
    .to(CommentService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(Service.CommentModel)
    .toConstantValue(CommentModel);

  return commentContainer;
}
