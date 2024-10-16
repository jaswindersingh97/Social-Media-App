import apiRequest from './apiRequest';
const createPost = async (data) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("No token found");
  }

  const response = await apiRequest({
    endpoint: "/secure/posts",
    method: "post",
    headers: { 
      'Authorization': `Bearer ${token}`,
    },
    data:{content:data}

  });

  if (response && response.data) {
    return response.data;  // Return user data
  }

  throw new Error("Failed to fetch user profile");
};

export default createPost;
