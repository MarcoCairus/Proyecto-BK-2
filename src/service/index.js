import UserRepository from "./users.repository.js";
import Users from "../daos/users.dao.js"


export const userService = new UserRepository(new Users())
