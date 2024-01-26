import {AppDataSource} from "../data-source"
import {NextFunction, Request, Response} from "express"
import {User} from "../entity/User"

// JS Style
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        let users = await this.userRepository.find()
        return {message: users, statusCode: 200, defaultExecute: true}
    }

    // async one(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)
    //
    //
    //     const user = await this.userRepository.findOne({
    //         where: {id}
    //     })
    //
    //     if (!user) {
    //         return response.status(404).json({ message: "User not found" });
    //     }
    //     return response.json(user);
    // }


    // OG REGISTER METHOD !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



    async register(request: Request, response: Response, next: NextFunction) {
        const {firstName, lastName, username, password} = request.body;

        try {
            // Check if the username already exists in the database
            const existingUser = await this.userRepository.findOne({where: {username}});

            if (existingUser) {
                console.log(existingUser); // Log the existingUser object
                return {message: "Username already in use!", statusCode: 401, defaultExecute: true}
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
            return {message: token, statusCode: 201, defaultExecute: true}
        } catch (err) {
            console.log(err);
            return {message: "Error registering user!", statusCode: 500, defaultExecute: true}
        }

        // require login after registration
            // return this.userRepository.save(user)
            // handle no printing of information to client_old in other file

    }





    async login(request: Request, response: Response, next: NextFunction) {
        const {username, password} = request.body;

        try {
            // Check if the username already exists in the database
            const existingUser = await this.userRepository.findOne({where: {username}});

            if (!existingUser) {
                return {message: "Username does not Exist!", statusCode: 401, defaultExecute: true}
            }

            if (existingUser.password != password) {
                return {message: "Incorrect Password! Please try again!", statusCode: 401, defaultExecute: true}
            }

            // validation

            if (![username, password].every(Boolean)) {
                return {message: "one or more fields are empty!", statusCode: 401, defaultExecute: true}
            }

            if (existingUser.password == password && existingUser.username == username) {

                // login authentication stuff


                const token = jwtGenerator(existingUser.username, existingUser.firstName, existingUser.lastName)

                //response.json({token})
                return {message: token, statusCode: 200, defaultExecute: true}
            }
        } catch (err) {
            console.log(err.message);
            return {message: "Server Error", statusCode: 500, defaultExecute: true}
        }

    }

    // CHECK HOW TO RETURN MESSAGE (IT IS UNDEFINED APPARENTLY)

    // async verify(request: Request, response: Response, next: NextFunction) {
    //     authorization(request, response,  () => {
    //         try {
    //            // await response.json(true);
    //             response.json(true);
    //             return {message: true, statusCode: 200, defaultExecute: true}
    //         } catch (err) {
    //             return {message: false, statusCode: 200, defaultExecute: true}
    //         }
    //     });
    // }

    // async verify(request: Request, response: Response, next: NextFunction) {
    //
    //     // execute authorization function
    //
    //     // if authorization succeeds, return true using return {message: true, statusCode: 200, defaultExecute: true}
    //
    //     // else return {message: false, statusCode: 200, defaultExecute: true} (because authorization failed)
    //
    //
    //     });
    // }

    async verify(request: Request, response: Response, next: NextFunction) {
        // Call the authorization middleware

        try {
        // calling the middleware
        const authResult = authorization(request, () => {});
        const {message, statusCode, defaultExecute } = authResult;

        // const username = request.username;
        // const firstName = request.firstName;
        // const lastName = request.lastName;
        // console.log(username);
        // console.log(firstName);
        // console.log(lastName);
        // console.log(message);

        if (message == "Valid Token!") {
            return {message: true, statusCode: 200, defaultExecute: true}
        }
        else {
            return {message: false, statusCode: 401, defaultExecute: true}
        }
        } catch (error) {
            // If an error occurs during async logic, respond with an error
            return {message: "Internal Server Error", statusCode: 500, defaultExecute: true}
        }
    }

    // async verify(request: Request, response: Response, next: NextFunction) {
    //     try {
    //         await authorization(request, response, next);
    //         // If authorization succeeds, return true
    //         return {message: true, statusCode: 200, defaultExecute: true };
    //     } catch (err) {
    //         // If authorization fails, throw an error
    //         //next(err);
    //         return {message: false, statusCode: 403, defaultExecute: true };
    //     }
    // }


    async dashboard(request: Request, response: Response, next: NextFunction) {
        // Call the authorization middleware

        try {
            // calling the middleware
            const authResult = authorization(request, () => {});
            const {message, statusCode, defaultExecute } = authResult;

            // const username = request.username;
            // const firstName = request.firstName;
            // const lastName = request.lastName;
            // console.log(username);
            // console.log(firstName);
            // console.log(lastName);
            // console.log(message);

            if (message == "Valid Token!") {
                return {message: "username: " + request.username, statusCode: 200, defaultExecute: true}
            }
            else {
                return {message: false, statusCode: 401, defaultExecute: true}
            }
        } catch (error) {
            // If an error occurs during async logic, respond with an error
            return {message: "Internal Server Error", statusCode: 500, defaultExecute: true}
        }
    }

    // OLD

    // async home(request: Request, response: Response, next: NextFunction) {
    //     authorization(request, response, () => {
    //         try {
    //             console.log(request.user.firstName);
    //             response.json(true);
    //             return {message: true, statusCode: 200, defaultExecute: true}
    //         } catch (err) {
    //             return {message: false, statusCode: 200, defaultExecute: true}
    //         }
    //     });
    // }
}

// DEPRECATED METHODS

// async update(request: Request, response: Response, next: NextFunction) {
//     const {id, firstName, lastName, username, password} = request.body;
//
//     if (!id) {
//         return "Missing 'id' in the request body.";
//     }
//
//     let userToUpdate = await this.userRepository.findOne({
//         where: {id}
//     });
//
//     if (!userToUpdate) {
//         return "User not found";
//     }
//
//     // Update user properties
//     userToUpdate.firstName = firstName;
//     userToUpdate.lastName = lastName;
//     userToUpdate.username = username;
//     userToUpdate.password = password;
//
//     // Save the updated user
//     await this.userRepository.save(userToUpdate);
//
//     return "User has been updated";
// }
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


// async remove(request: Request, response: Response, next: NextFunction) {
//     const id = parseInt(request.params.id)
//
//     let userToRemove = await this.userRepository.findOneBy({id})
//
//     if (!userToRemove) {
//         return "this user not exist"
//     }
//
//     await this.userRepository.remove(userToRemove)
//
//     return "user has been removed"
// }

