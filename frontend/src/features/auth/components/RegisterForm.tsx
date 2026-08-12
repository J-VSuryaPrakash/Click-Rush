import { useForm } from "react-hook-form"
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerUser } from "@/api/auth.api";

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
        <div>
            <div>
                <form onSubmit={handleSubmit(registerFormSubmit)}>

                    <div>
                        <label>Name</label>
                        <input {...register('name')} type="text" placeholder="Jhon Doe"/>
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>
                    <div>
                        <label>Email</label>
                        <input {...register('email')} placeholder="you@example.com"/>
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div>
                        <label>Password</label>
                        <input {...register('password')} type="password" placeholder="password"/>
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <input type="submit" placeholder="Register" />
                    <p>Already a player ? Login</p>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm