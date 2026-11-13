import { useForm } from "react-hook-form"
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { buttonPrimary, fieldError, fieldInput, fieldLabel, textLink } from "@/lib/ui";

function RegisterForm() {

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors }
    } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema), mode: 'onChange' });

    const navigate = useNavigate();
    const { registerUser } = useAuth();
    const registerFormSubmit = async (data: RegisterFormData) => {
        registerUser.mutate(
            { ...data },
            {
                onSuccess: () => {
                    reset(),
                        navigate({ to: '/game' })
                },
                onError: (err) => {
                    if(err instanceof AxiosError){
                        setError("root", {
                            type: "server",
                            message: err.response?.data.error.message
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
                    Create your account
                </h1>

                <p className="mt-2 text-base text-rush-muted">
                    Register to start playing ClickRush
                </p>
            </div>

            <form
                onSubmit={handleSubmit(registerFormSubmit)}
                className="flex flex-col gap-5"
            >
                {/* Name */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className={fieldLabel}>
                        Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        className={fieldInput}
                        aria-invalid={errors.name ? true : undefined}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        {...register("name")}
                        placeholder="John Doe"
                    />

                    {errors.name && (
                        <p id="name-error" className={fieldError}>
                            {errors.name.message}
                        </p>
                    )}
                </div>

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
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        {...register("email")}
                        placeholder="you@example.com"
                    />

                    {errors.email && (
                        <p id="email-error" className={fieldError}>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className={fieldLabel}>
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        className={fieldInput}
                        aria-invalid={errors.password ? true : undefined}
                        aria-describedby={errors.password ? "password-error" : undefined}
                        {...register("password")}
                        placeholder="Create a password"
                    />

                    {errors.password && (
                        <p id="password-error" className={fieldError}>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {errors.root && (
                    <p role="alert" className={`${fieldError} border border-rush-accent px-3.5 py-2.5`}>
                        {errors.root.message}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    aria-busy={registerUser.isPending || undefined}
                    className={`${buttonPrimary} mt-2 w-full`}
                >
                    {registerUser.isPending ? "Registering…" : "Register"}
                </button>

                {/* Login */}
                <p className="text-sm text-rush-muted">
                    Already a player?{" "}
                    <Link to='/login' className={textLink}>Login</Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterForm
