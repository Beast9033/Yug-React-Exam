const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

async function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`Request failed ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export const getBlogs = async () => {
  const res = await fetch(`${BASE_URL}/blogs`);
  return handleResponse(res);
};

export const getBlogById = async (id) => {
  const res = await fetch(`${BASE_URL}/blogs/${id}`);
  const data = await res.json();
  return data;
};

// add edit delete

export const createBlog = async (data) => {
  const res = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  return result;
};

export const updateBlog = async (id, data) => {
  const res = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  return result;
};


export const deleteBlog = async (id) => {

  const res = await fetch(`${BASE_URL}/blogs/${id}`, {

    method: "DELETE"

  });

  return res;
};


// User APIs

export const getUsers = async () => {

  const res = await fetch(`${BASE_URL}/users`);

  const data = await res.json();

  return data;
};

export const createUser = async (data) => {

  const res = await fetch(`${BASE_URL}/users`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(data)

  });

  const result = await res.json();

  return result;
};