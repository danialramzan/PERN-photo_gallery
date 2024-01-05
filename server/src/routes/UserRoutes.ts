import { UserController } from "../controller/UserController"

export const UserRoutes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/auth/register",
    controller: UserController,
    action: "register"
}, {
    method: "post",
        route: "/auth/login",
        controller: UserController,
        action: "login"
},
    {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "put",  // Use "put" for update functionality
    route: "/users",
    controller: UserController,
    action: "update",
}]