// import { AppDataSource } from "../data-source";
// import { NextFunction, Request, Response } from "express";
// import { Photo } from "../entity/Photo";
//
// export class PhotoController {
//
//     private photoRepository = AppDataSource.getRepository(Photo);
//
//     async all(request: Request, response: Response, next: NextFunction) {
//         return this.photoRepository.find();
//     }
//
//     async one(request: Request, response: Response, next: NextFunction) {
//         const id = parseInt(request.params.id);
//
//         const photo = await this.photoRepository.findOne({
//             where: { photo_id: id }
//         });
//
//         if (!photo) {
//             return "Photo not found";
//         }
//
//         return photo;
//     }
//
//     async save(request: Request, response: Response, next: NextFunction) {
//         const { id, image_url, description } = request.body;
//
//         const user = await AppDataSource.getRepository(User).findOne(id);
//
//         if (!user) {
//             return "User not found";
//         }
//
//         const photo = this.photoRepository.create({
//             user,  // Assign the retrieved user object
//             image_url,
//             description,
//         });
//
//         return this.photoRepository.save(photo);
//     }
//
//
//     async remove(request: Request, response: Response, next: NextFunction) {
//         const id = parseInt(request.params.id);
//
//         const photoToRemove = await this.photoRepository.findOne({
//             where: { photo_id: id }
//         });
//
//         if (!photoToRemove) {
//             return "Photo not found";
//         }
//
//         await this.photoRepository.remove(photoToRemove);
//
//         return "Photo has been removed";
//     }
//
// }
