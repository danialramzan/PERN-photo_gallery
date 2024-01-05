import {AppDataSource} from "../data-source"
import {NextFunction, Request, Response} from "express"
import {User} from "../entity/User"

// JS Style
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: {id}
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async register(request: Request, response: Response, next: NextFunction) {
        const {firstName, lastName, username, password} = request.body;

        // Check if the username already exists in the database
        const existingUser = await this.userRepository.findOne({ where: { username } });

        if (existingUser) {
            console.log(existingUser); // Log the existingUser object
            return "Username already in use!"
        }


        // validation
        if (![firstName, lastName, username, password].every(Boolean)) {
            return "one or more fields are empty!";
        }

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            username,
            password
        })



        //
        const token = jwtGenerator(user.username, user.firstName, user.lastName)

        // token manipulation stuff

        //


        // decide whether to grant auth on registration or require login after registration

        //auth on registration

        await this.userRepository.save(user)
        return token

        // require login after registration
            // return this.userRepository.save(user)
            // handle no printing of information to client in other file




    }



    async login(request: Request, response: Response, next: NextFunction) {
        const {username, password} = request.body;

        // Check if the username already exists in the database
        const existingUser = await this.userRepository.findOne({ where: { username } });

        if (!existingUser) {
            return "Username does not exist."
        }

        if (existingUser.password != password) {
            return "Incorrect Password! Please try again!"
        }

        // validation

        if (![username, password].every(Boolean)) {
            return "one or more fields are empty!";
        }

        if (existingUser.password == password && existingUser.username == username) {

            // login authentication stuff


            const token = jwtGenerator(existingUser.username, existingUser.firstName, existingUser.lastName)

            // maybe ill need to figure out a way to make it stop echoing the return output to the client?

            //response.json({token})
            return token
        }



    }

    async verify(request: Request, response: Response, next: NextFunction) {
        authorization(request, response, () => {
            try {
                response.json(true);
            } catch (err) {
                response.json(false);
            }
        });
    }


    // async save(request: Request, response: Response, next: NextFunction) {
    //     const { firstName, lastName, username, password } = request.body;
    //
    //     try {
    //         // Check if email already exists
    //         const existingEmailUser = await this.userRepository.findOne({
    //             where: { email: request.body.email }
    //         });
    //
    //         if (existingEmailUser) {
    //             // Email already exists, throw an exception or handle it accordingly
    //             throw new Error('Email already in use');
    //         }
    //
    //         // Check if username already exists
    //         const existingUsernameUser = await this.userRepository.findOne({
    //             where: { username }
    //         });
    //
    //         if (existingUsernameUser) {
    //             // Username already exists, throw an exception or handle it accordingly
    //             throw new Error('Username already in use');
    //         }
    //
    //         // Create a new user
    //         const user = Object.assign(new User(), {
    //             firstName,
    //             lastName,
    //             username,
    //             password
    //         });
    //
    //         // Save the user
    //         await this.userRepository.save(user);
    //
    //         // Return success or any other response
    //         return response.status(201).json({ message: 'User created successfully' });
    //     } catch (error) {
    //         // Handle exceptions here
    //         return response.status(400).json({ error: error.message });
    //     }
    // }

    // ...


// async save(request: Request, response: Response, next: NextFunction) : Promise<User> | Error {
//
//         const { firstName, lastName, username, password } = request.body;
//
//         // else, if username found throw usernameexception
//
//         const user = Object.assign(new User(), {
//             firstName,
//             lastName,
//             username,
//             password
//         })
//
//         return this.userRepository.save(user)
//     }


    // async save(request: Request, response: Response, next: NextFunction) {
    //     const { firstName, lastName, username, password } = request.body;
    //
    //     let user;
    //
    //     while (true) {
    //         try {
    //             // Check if the username already exists
    //             const existingUsernameUser = await this.userRepository.findOne({
    //                 where: { username }
    //             });
    //
    //             if (existingUsernameUser) {
    //                 // Username already exists, continue the loop to try again
    //                 continue;
    //             }
    //
    //             // Create a new user
    //             user = Object.assign(new User(), {
    //                 firstName,
    //                 lastName,
    //                 username,
    //                 password
    //             });
    //
    //             // Save the user
    //             await this.userRepository.save(user);
    //
    //             // Break out of the loop if the user is successfully registered
    //             break;
    //         } catch (error) {
    //             // Handle any unexpected errors by logging or reporting them
    //             console.error("Unexpected error during user registration:", error);
    //             // Continue the loop to try again
    //         }
    //     }
    //
    //     // success statements?
    //
    // }


    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({id})

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const {id, firstName, lastName, username, password} = request.body;

        if (!id) {
            return "Missing 'id' in the request body.";
        }

        let userToUpdate = await this.userRepository.findOne({
            where: {id}
        });

        if (!userToUpdate) {
            return "User not found";
        }

        // Update user properties
        userToUpdate.firstName = firstName;
        userToUpdate.lastName = lastName;
        userToUpdate.username = username;
        userToUpdate.password = password;

        // Save the updated user
        await this.userRepository.save(userToUpdate);

        return "User has been updated";
    }

}