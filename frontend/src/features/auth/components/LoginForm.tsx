import { useForm } from 'react-hook-form';
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from '@tanstack/react-router';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/lib/queryClient';

function LoginForm() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema), mode: 'onSubmit' });

    const { login } = useAuth();
    const navigate = useNavigate();

    const loginFormSubmit = async (data: LoginFormData) => {
        login.mutate(
            { ...data },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["auth", "me"],
                    }).then(() => {
                        reset(),
                        navigate({
                            to: '/game',
                        })
                    })

                },
                onError: (err: any) => {
                    console.log("Login failed", err);
                }
            }
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Login to continue playing
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(loginFormSubmit)}
                    className="flex flex-col gap-5"
                >
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">
                            Email
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">
                            Password
                        </Label>

                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Error */}
                    {(errors.email || errors.password) && (
                        <p className="text-sm text-red-600">
                            Invalid email or password
                        </p>
                    )}

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="mt-2 w-full"
                    >
                        Login
                    </Button>

                    {/* Register */}
                    <p className="text-center text-sm text-gray-500">
                        New player?{" "}
                        <button
                            type="button"
                            className="font-medium text-gray-900 hover:underline hover:cursor-pointer"
                        >
                            <Link to='/register'>Register</Link>
                        </button>
                    </p>
                </form>
            </div>
        </div >
    )
}

export default LoginForm;