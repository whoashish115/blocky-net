const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const handleResponse = async (res) => {
  const contentType = res.headers.get("content-type");
  const data = contentType && contentType.includes("application/json")
    ? await res.json()
    : {};
  return data;
};

export const getData = async (url, token) => {
  try {
    const res = await fetch(`${baseUrl}/api/${url}`, {
      method: "GET",
      headers: { Authorization: token },
    });

    return await handleResponse(res);
  } catch (error) {
    console.error("GET Error:", error);
    return { error: true, message: error.message };
  }
};

export const postData = async (url, post, token) => {
  try {
    const res = await fetch(`${baseUrl}/api/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(post),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("POST Error:", error);
    return { error: true, message: error.message };
  }
};

export const putData = async (url, post, token) => {
  try {
    const res = await fetch(`${baseUrl}/api/${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(post),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("PUT Error:", error);
    return { error: true, message: error.message };
  }
};

export const patchData = async (url, post, token) => {
  try {
    const res = await fetch(`${baseUrl}/api/${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(post),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("PATCH Error:", error);
    return { error: true, message: error.message };
  }
};

export const deleteData = async (url, token) => {
  try {
    const res = await fetch(`${baseUrl}/api/${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("DELETE Error:", error);
    return { error: true, message: error.message };
  }
};
