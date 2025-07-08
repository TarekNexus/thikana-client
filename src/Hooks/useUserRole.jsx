import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios"; 

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();

  const {
    data: role = "user",
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:4000/users/${user.email}/role`
      );
      return res.data.role;
    },
  });

  return {
    role,
    roleLoading: authLoading || roleLoading,
    refetch,
  };
};

export default useUserRole;
