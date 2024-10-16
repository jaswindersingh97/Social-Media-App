import apiRequest from './apiRequest';
const fetchFeed = async ({page=1,limit=10} = {}) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("No token found");
  }

  const response = await apiRequest({
    endpoint: `/secure/feed?page=${page}&limit=${limit}`,
    method: "get",
    headers: { 
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response && response.data) {
    return response.data;  // Return user data
  }

  throw new Error("Failed to fetch user profile");
};

export default fetchFeed;
