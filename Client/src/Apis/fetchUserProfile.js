import apiRequest from './apiRequest';
const fetchUserProfile = async () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("No token found");
  }

  const response = await apiRequest({
    endpoint: "/secure/users/profile",
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

export default fetchUserProfile;
