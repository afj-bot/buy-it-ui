
import apiInstance from "./axios";

class LocalizeService {
    async localize(locale) {
        return await apiInstance.get("/localize", {
            headers: {
                "Accept-Language": locale,
            }
        });
    }
}

export default new LocalizeService();