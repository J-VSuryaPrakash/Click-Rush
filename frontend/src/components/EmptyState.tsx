import { useNavigate } from "@tanstack/react-router";
import { MousePointer2 } from "lucide-react";
import { buttonPrimary, container } from "@/lib/ui";

interface EmptyStateProps {
    title: string;
    description: string;
    buttonText: string;
}

function EmptyState({
    title,
    description,
    buttonText,
}: EmptyStateProps) {

    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100dvh-4rem)] w-full bg-rush-paper">
            <div className={`${container} py-5 lg:py-8`}>
                <div className="mx-auto max-w-3xl border border-rush-rule px-6 py-12 sm:px-10 sm:py-16">

                    {/* Title */}
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-rush-ink">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 max-w-md text-base text-rush-muted">
                        {description}
                    </p>

                    {/* Action */}
                    <button
                        type="button"
                        onClick={() => navigate({ to: "/game" })}
                        className={`${buttonPrimary} mt-8 w-full sm:w-auto`}
                    >
                        <MousePointer2 aria-hidden="true" className="h-4 w-4" />
                        {buttonText}
                    </button>

                </div>
            </div>
        </div>
    );
}

export default EmptyState;
