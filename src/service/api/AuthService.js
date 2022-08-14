
import apiInstance from "./axios";

const prefix = "/auth/anonymous"

class AuthService {
    async getCookie() {
        return await apiInstance.get(prefix);
    }

    async authorize() {
        return await apiInstance.post(prefix);
    }
}

export default new AuthService();