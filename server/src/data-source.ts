import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Photo} from "./entity/Photo";
import {Comment} from "./entity/Comment";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5430,
    username: "crown",
    password: "admin",
    database: "pern_photo_app",
    synchronize: true,
    logging: false,
    entities: [User, Photo, Comment],
    migrations: [],
    subscribers: [],
})
