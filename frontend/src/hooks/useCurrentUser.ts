import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "@/api/auth.api"

export const useCurrentUser = () => {

    const {
        data: user,
        isLoading,
        isFetching
    } = useQuery({
        queryKey: ['auth', 'me'],
        queryFn: getCurrentUser,
        retry: false,
        staleTime: 1000 * 60 * 2
    })

    return {
        user,
        isLoading: isLoading || isFetching
    }
}