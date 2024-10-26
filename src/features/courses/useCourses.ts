import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../utils/apiCourses";
import { useAuth } from "../../contexts/AuthContext";

export default function useCourses() {
  const { user } = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
  return { data, isLoading, isError, error };
}
