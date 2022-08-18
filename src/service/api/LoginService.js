
import apiInstance from "./axios";

const prefix = "/login";

class LoginService {
  async login (username, password) {
    return await apiInstance.post(prefix, {
      username,
      password
    });
  }
}

export default new LoginService();
