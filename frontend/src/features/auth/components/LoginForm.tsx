import { useForm } from 'react-hook-form';
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { buttonPrimary, fieldError, fieldInput, fieldLabel, textLink } from '@/lib/ui';

function LoginForm() {

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors }
    } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema), mode: 'onSubmit' });

    const { login } = useAuth();
    const navigate = useNavigate();

    const loginFormSubmit = async (data: LoginFormData) => {
        login.mutate(
            { ...data },
            {
                onSuccess: async () => {
                    reset(),
                        navigate({
                            to: '/game'
                        })
                },
                onError: (err: any) => {
                    if(err instanceof AxiosError){
                        setError("root", {
                            type: "server",
                            message: "Invalid email or password"
                        })
                    }
                }
            }
        )
    }

    return (
        <div className="flex h-full flex-col justify-center px-6 py-12 sm:px-10">

            {/* Header */}
            <div className="mb-10">
                <h1 className="text-2xl font-semibold tracking-[-0.02em] text-rush-ink">
                    Welcome back
                </h1>

                <p className="mt-2 text-base text-rush-muted">
                    Login to continue playing
                </p>
            </div>

            <form
                onSubmit={handleSubmit(loginFormSubmit)}
                className="flex flex-col gap-5"
            >
                {/* Email */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className={fieldLabel}>
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className={fieldInput}
                        {...register("email")}
                        placeholder="you@example.com"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className={fieldLabel}>
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        className={fieldInput}
                        {...register("password")}
                        placeholder="Enter your password"
                    />
                </div>

                {/* Error */}
                {(errors.root) && (
                    <p role="alert" className={`${fieldError} border border-rush-accent px-3.5 py-2.5`}>
                        {errors.root?.message}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    aria-busy={login.isPending || undefined}
                    className={`${buttonPrimary} mt-2 w-full`}
                >
                    {login.isPending ? "Logging in…" : "Login"}
                </button>

                {/* Register */}
                <p className="text-sm text-rush-muted">
                    New player?{" "}
                    <Link to='/register' className={textLink}>Register</Link>
                </p>
            </form>
        </div>
    )
}

export default LoginForm;
