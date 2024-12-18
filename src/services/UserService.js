import axios from "axios";

class UserService {
  static async list() {
    const token = localStorage.getItem("token");
    const users = await axios.get("http://localhost:4000/api/v1/user/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return users;
  }

  static async login(email, password) {
    const users = await axios.post("http://localhost:4000/api/v1/user/login", {
      email,
      password,
    });
    return users;
  }

  static async create(name, email, type, password) {
    const register = await axios.post(
      "http://localhost:4000/api/v1/user/register",
      {
        name: name,
        email: email,
        type: type,
        password: password,
      }
    );
    return register;
  }

  static async update(id, name, email, type, password) {
    const update = await axios.put("http://localhost:4000/api/v1/user/" + id, {
      name: name,
      email: email,
      type: type,
      password: password,
    });
    return update;
  }

  static async delete(id) {
    const update = await axios.delete(
      "http://localhost:4000/api/v1/user/" + id
    );
    return update;
  }
}

export default UserService;
