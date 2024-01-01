import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"

import { User } from "./entity/User"
import { Photo } from "./entity/Photo"
import { Comment } from "./entity/Comment"

import { Index } from "typeorm"
import { ALL } from "dns"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3000)



    // reset database
    await AppDataSource.manager.query(`ALTER SEQUENCE user_id_seq RESTART WITH 1`)
    await AppDataSource.manager.delete(User, {})

    // insert new users for test
    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            firstName: "Timber",
            lastName: "Saw",
            username: "timbsaw",
            password: "password",
        })
    )


    // @PrimaryGeneratedColumn()
    // user_id: number;
  
    // @Column()
    // username: string;
  
    // @Column()
    // password: string;
  
    // @Column()
    // email: string;
  

    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            firstName: "Phantom",
            lastName: "Assassin",
            username: "phantomin",
            password: "phantomiscool",
        })
    )

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
