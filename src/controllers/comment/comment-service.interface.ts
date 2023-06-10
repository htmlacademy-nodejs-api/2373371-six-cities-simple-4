import { DocumentType } from '@typegoose/typegoose';
import CreateCommentDto from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import UpdateCommentDto from './dto/update-comment.dto';

export interface CommentServiceInterface {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByCommentId(commentId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByCommentId(commentId: string): Promise<number | null>;
  updateById(commentId: string, dto: UpdateCommentDto): Promise<DocumentType<CommentEntity> | null>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
}
