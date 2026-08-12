import { useForm } from 'react-hook-form';
import { loginSchema, type LoginFromData } from "../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";


function LoginForm() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<LoginFromData>({ resolver: zodResolver(loginSchema), mode: 'onSubmit' });



    const loginFormSubmit = (data : LoginFromData) => {
        console.log(data);
        reset()
    }

    return (

        <div>
            <div>
                <form onSubmit={handleSubmit(loginFormSubmit)}>

                    <div>
                        <label >Email</label>
                        <input {...register("email")} placeholder='you@example.com' />
                    </div>

                    <div>
                        <label >Password</label>
                        <input {...register("password")} placeholder='password' type='password' />
                    </div>

                    {(errors.email || errors.password) && <p>{"Invalid email or password"}</p>}

                    <input type="submit" placeholder='Login' />
                    <p> New Player ? Register </p>
                </form>
            </div>
        </div>

    )
}

export default LoginForm;