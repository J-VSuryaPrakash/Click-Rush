import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { LogOut, User } from "lucide-react";
import { memo } from "react";
import { container, iconButton, focusRing } from "@/lib/ui";

function Navbar() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = () => {
        logout.mutate()
        navigate({ to: "/login" });
    };

    return (
        <nav className="w-full shrink-0 border-b border-rush-rule bg-rush-paper">
            <div className={`${container} flex h-16 items-center justify-between gap-4`}>

                {/* Logo */}
                <p className="text-xl font-semibold tracking-[-0.03em] text-rush-ink">
                    Click<span className="text-rush-accent">Rush</span>
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">

                    {/* Profile */}
                    <button
                        type="button"
                        aria-label="Profile"
                        className={iconButton}
                        onClick={() => navigate({ to: "/profile" })}
                    >
                        <User aria-hidden="true" className="h-4 w-4" />
                    </button>

                    {/* Logout */}
                    <button
                        type="button"
                        className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-[4px] border border-rush-rule px-3 text-sm font-medium text-rush-ink transition-transform duration-75 ease-out hover:border-rush-muted active:scale-[0.97] motion-reduce:transition-none ${focusRing}`}
                        onClick={handleLogout}
                    >
                        <LogOut aria-hidden="true" className="h-4 w-4" />

                        <span className="hidden sm:inline">
                            Logout
                        </span>
                        <span className="sr-only sm:hidden">
                            Logout
                        </span>
                    </button>

                </div>

            </div>
        </nav>
    );
}

export default memo(Navbar);
