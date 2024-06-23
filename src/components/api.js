import axios from "axios";

// api.js

export const fetchAdvertisements = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/v1/public/getAdds`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    throw error;
  }
};
export const fetchAdvertisementsWithSort = async (sortCriteria) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/v1/public/sort/${sortCriteria}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    throw error;
  }
};

export const fetchAddById = async (id) => {
  try {
    const result = await axios.get(
      "http://localhost:3001/api/v1/public/add/" + id
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAdvertisementsByCat = async (id) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/v1/public/cat/" + id
    );
    return response;
  } catch (error) {
    console.error("Error fetching advertisements:", error);
  }
};
export const searchAdvertisements = async (name) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/v1/public/search/" + name
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    throw error;
  }
};
export const fetchCategories = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/v1/public/getCats"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};
export const findSimilars = async (cat_id, price, id) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/v1/public/getSimilars?cat=${cat_id}&price=${price}&id=${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/user/get/getUser?email=${email}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateUser = async (
  userData,
  avatarDataUrl,
  avatarUpdated,
  token
) => {
  try {
    const formData = new FormData();
    const userDataBlob = new Blob([JSON.stringify(userData)], {
      type: "application/json",
    });

    formData.append("user", userDataBlob);

    if (avatarDataUrl && avatarUpdated) {
      const blob = await fetch(avatarDataUrl).then((res) => res.blob()); // Fetch avatar image and convert to blob
      formData.append("avatar", blob, "avatar.png");
    } else {
      formData.append("avatar", new Blob());
    }

    const response = await axios.put(
      "http://localhost:3001/user/update",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const subscribe = async (email, id, token) => {
  const formData = {
    id: id,
    email: email,
  };
  try {
    const response = await axios.post("http://localhost:3001/subs", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "SUCCESS";
  } catch (error) {
    return "ERROR";
  }
};
export const unsubscribe = async (email, id, token) => {
  const formData = {
    id: id,
    email: email,
  };
  console.log(token);
  try {
    const response = await axios.delete("http://localhost:3001/subs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData, // include the request body here
    });
    return "SUCCESS";
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
};
export const fetchNotifications = async (token) => {
  try {
    const response = await axios.get(`http://localhost:3001/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
};
export const seenNotifications = async (token, formData) => {
  try {
    const response = await axios.post(`http://localhost:3001/notes`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
};
