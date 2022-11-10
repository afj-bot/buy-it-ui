import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants";
import apiInstance from "./axios";

const prefix = "/products";

class ProductService {
  async getProducts (page = DEFAULT_PAGE, size = DEFAULT_PAGE_SIZE, sort) {
    return await apiInstance.get(`${prefix}`,
      {
        params: {
          page, size, sort,
        },
      });
  };

  async getImage (id) {
    return await apiInstance.get(`${prefix}/${id}/image`, {
      responseType: "blob",
    });
  }

  async addRating (id, star) {
    return await apiInstance.patch(`${prefix}/${id}/rating`, {
      star: star
    });
  }
}

export default new ProductService();
