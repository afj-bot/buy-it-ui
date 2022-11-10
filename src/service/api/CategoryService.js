import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants";
import apiInstance from "./axios";

const prefix = "/category";

class CategoryService {
  async getCategories (page = DEFAULT_PAGE, size = DEFAULT_PAGE_SIZE, sort) {
    return await apiInstance.get(`${prefix}`,
      {
        params: {
          page, size, sort,
        },
      });
  };

}

export default new CategoryService();
