import ClickRush from "@/components/ClickRush"
import RegisterForm from "@/features/auth/components/RegisterForm"
import { container } from "@/lib/ui"

function RegisterPage() {
    return (
        <div className="min-h-dvh bg-rush-paper text-rush-ink">
            <div className={`${container} flex min-h-dvh flex-col justify-center py-6`}>
                <div className="grid grid-cols-1 border border-rush-rule md:grid-cols-5">
                    <div className="hidden border-r border-rush-rule md:col-span-3 md:block">
                        <ClickRush />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
