import { getUserFromLocalStorage } from "./localStorage";
const authHeader = (thunkAPI) => {
  const user = getUserFromLocalStorage();

  return {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  };
};

export default authHeader;
