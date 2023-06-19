import { DocumentType } from '@typegoose/typegoose';
import CreateCommentDto from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';

export interface CommentServiceInterface {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByCommentId(commentId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByCommentId(commentId: string): Promise<number | null>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
}
