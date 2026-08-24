import { useQueryClient, useMutation } from "@tanstack/react-query"
import { registerUser, loginUser, logoutUser } from "../api/auth.api";
import type { LoginFormData, RegisterFormData } from "../features/auth/schemas/auth.schema"

export const useAuth = () => {

    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: (data: LoginFormData) => loginUser(data),
        onSuccess: (userData) => {
            queryClient.setQueryData(['auth', 'me'], userData),
            queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
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
            queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
        },
    });

    return {
        login: loginMutation,
        logout: logoutMutation,
        registerUser: registerMutation
    }

}
