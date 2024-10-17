import apiRequest from './apiRequest';
const likePost = async ({postId}) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("No token found");
  }

  const response = await apiRequest({
    endpoint: `/secure/like/${postId}`,
    method: "patch",
    headers: { 
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response && response.data) {
    console.log(response);
    return response.data;  // Return user data
  }

  throw new Error("Failed to fetch user profile");
};

export default likePost;
