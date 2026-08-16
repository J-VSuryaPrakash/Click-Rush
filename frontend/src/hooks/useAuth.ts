import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../api/auth.api";
import type { LoginFormData, RegisterFormData } from "../features/auth/schemas/auth.schema"

export const useAuth = () => {

    const queryClient = useQueryClient();

    const {
        data: user,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ['auth'],
        queryFn: getCurrentUser,
        retry: false,
        staleTime: 1000 * 60 * 2
    })

    const loginMutation = useMutation({
        mutationFn: (data: LoginFormData) => loginUser(data),
        onSuccess: (userData) => {
            queryClient.setQueryData(['auth'], userData),
                queryClient.invalidateQueries({ queryKey: ['auth'] })
        }
    })

    const logoutMutation = useMutation({
        mutationFn: () => logoutUser(),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['auth', 'me'] })
        },
    });

    const registerMutation = useMutation({
        mutationFn: (data: RegisterFormData) => registerUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });

    return {
        user,
        isAuthenticated: !!user,
        isLoading: isLoading || isFetching,
        login: loginMutation,
        logout: logoutMutation,
        registerUser: registerMutation
    }

}


// Devlabs