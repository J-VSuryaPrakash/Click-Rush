import ClickRush from "@/components/ClickRush"
import LoginForm from "@/features/auth/components/LoginForm"

function LoginPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="hidden md:block md:col-span-3">
                <ClickRush />
            </div>

            <div className="col-span-1 md:col-span-2">
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage