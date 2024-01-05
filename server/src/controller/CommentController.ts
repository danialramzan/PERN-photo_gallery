// import { AppDataSource } from "../data-source";
// import { NextFunction, Request, Response } from "express";
// import { Comment } from "../entity/Comment";
//
// export class CommentController {
//
//     private commentRepository = AppDataSource.getRepository(Comment);
//
//     async all(request: Request, response: Response, next: NextFunction) {
//         return this.commentRepository.find();
//     }
//
//     async one(request: Request, response: Response, next: NextFunction) {
//         const id = parseInt(request.params.id);
//
//         const comment = await this.commentRepository.findOne({
//             where: { comment_id: id }
//         });
//
//         if (!comment) {
//             return "Comment not found";
//         }
//
//         return comment;
//     }
//
//     async save(request: Request, response: Response, next: NextFunction) {
//         const { id, photo_id, comment } = request.body;
//
//         const newComment = this.commentRepository.create({
//             user: { id }, // Assuming you provide the id in the request body
//             photo: { photo_id }, // Assuming you provide the photo_id in the request body
//             comment,
//         });
//
//         return this.commentRepository.save(newComment);
//     }
//
//     async remove(request: Request, response: Response, next: NextFunction) {
//         const id = parseInt(request.params.id);
//
//         const commentToRemove = await this.commentRepository.findOne({
//             where: { comment_id: id }
//         });
//
//         if (!commentToRemove) {
//             return "Comment not found";
//         }
//
//         await this.commentRepository.remove(commentToRemove);
//
//         return "Comment has been removed";
//     }
//
//
// }
