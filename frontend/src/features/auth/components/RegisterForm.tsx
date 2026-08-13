import { useForm } from "react-hook-form"
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerUser } from "@/api/auth.api";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from "@tanstack/react-router";


function RegisterForm() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema), mode: 'onChange' });

    const registerFormSubmit = async (data: RegisterFormData) => {
        const res = await registerUser(data);
        console.log(res)
        reset();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Create your account
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Register to start playing ClickRush
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(registerFormSubmit)}
                    className="flex flex-col gap-5"
                >
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">
                            Name
                        </Label>

                        <Input
                            id="name"
                            type="text"
                            {...register("name")}
                            placeholder="John Doe"
                        />

                        {errors.name && (
                            <p className="text-xs text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

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

                        {errors.email && (
                            <p className="text-xs text-red-600">
                                {errors.email.message}
                            </p>
                        )}
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
                            placeholder="Create a password"
                        />

                        {errors.password && (
                            <p className="text-xs text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="mt-2 w-full"
                    >
                        Register
                    </Button>

                    {/* Login */}
                    <p className="text-center text-sm text-gray-500">
                        Already a player?{" "}
                        <button
                            type="button"
                            className="font-medium text-gray-900 hover:underline hover:cursor-pointer"
                        >
                            <Link to='/login'>Login</Link>
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm