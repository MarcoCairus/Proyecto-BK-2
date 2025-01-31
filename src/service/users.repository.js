
export default class UserRepository {

    constructor(dao) {
        this.dao = dao
    }

    createUser = async (user) => {
        try {
            const result = await this.dao.registerUser(user)
            return result
        } catch (error) {
            
        }
    }

    loginUser = async (email, password) => {
        try {
            const user = await this.dao.findUserByEmail(email);
            if (!user) return { error: "User does not exist" };

            const isPasswordValid = isValidPassword(user, password);
            if (!isPasswordValid) return { error: "Invalid password" };

            return user;
        } catch (error) {
            console.log(error);
            return { error: "Login failed" };
        }
    };

}