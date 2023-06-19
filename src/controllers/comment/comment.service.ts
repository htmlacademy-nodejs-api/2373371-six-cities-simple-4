import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentServiceInterface } from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';
import { Service } from '../../types/service.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Service.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userId');
  }

  public async findByCommentId(commentId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ commentId })
      .populate('userId');
  }

  public async deleteByCommentId(commentId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({ commentId })
      .exec();

    return result.deletedCount;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .populate('userId');
  }
}
