import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { LogOut, User } from "lucide-react";
import { memo } from "react";

function Navbar() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = () => {
        logout.mutate()
        navigate({ to: "/login" });
    };

    return (
        <nav className="
            w-full
            shrink-0
            border-b border-slate-800
            bg-slate-950
        ">
            <div className="
                relative
                mx-auto
                flex
                h-16
                w-full
                items-center
                justify-center
                px-4
                lg:w-[70%]
            ">

                {/* Logo */}
                <div className="flex items-center justify-center gap-2">
                    <span className="
                        text-2xl
                        font-black
                        tracking-tight
                        text-white
                    ">
                        Click
                    </span>

                    <span className="
                        text-2xl
                        font-black
                        tracking-tight
                        text-violet-400
                    ">
                        Rush
                    </span>
                </div>

                {/* Actions */}
                <div className="
                    absolute
                    right-4
                    flex
                    items-center
                    gap-2
                ">

                    {/* Profile */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="
                            rounded-full
                            border-slate-700
                            bg-slate-900
                            text-slate-300
                            transition-all
                            hover:border-violet-500/50
                            hover:bg-violet-500/10
                            hover:text-violet-300
                        "
                        onClick={() => navigate({ to: "/profile" })}
                    >
                        <User className="h-5 w-5" />
                    </Button>

                    {/* Logout */}
                    <Button
                        variant="outline"
                        className="
                            h-9
                            rounded-lg
                            border-slate-700
                            bg-slate-900
                            px-3
                            text-slate-400
                            transition-all
                            hover:border-rose-500/40
                            hover:bg-rose-500/10
                            hover:text-rose-400
                        "
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4 sm:mr-2" />

                        <span className="hidden sm:inline">
                            Logout
                        </span>
                    </Button>

                </div>

            </div>
        </nav>
    );
}

export default memo(Navbar);