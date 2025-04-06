import axios from "axios";

export const getCurrentUser = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const response = await axios.get("http://127.0.0.1:8000/api/user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Failed to fetch current user:", err);
    return null;
  }
};
