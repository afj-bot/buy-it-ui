import apiInstance from "./axios";

const prefix = "/users";

class UserService {
  async register (username, email, password, privacyPolicy) {
    return await apiInstance.post(`${prefix}`, {
      username,
      email,
      password,
      privacyPolicy,
    });
  }
}

export default new UserService();
