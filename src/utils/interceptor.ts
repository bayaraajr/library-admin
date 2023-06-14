import axios from "axios";

axios.interceptors.request.use((config: any) => {
    const temp = localStorage.getItem("data");
    if (temp) {
        const token = JSON.parse(temp).token;
        config = {
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            },
        };
    }
    return config;
});
