import { useNavigate } from "@tanstack/react-router";
import { MousePointer2 } from "lucide-react";

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
        <div className="
            flex
            min-h-56
            w-full
            flex-col
            items-center
            justify-center
            border
            border-slate-800
            bg-slate-900
            px-5
            py-10
            text-center
            sm:min-h-screen
            sm:px-8
        ">

            {/* Icon */}
            <div className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-violet-500/10
                text-violet-400
                sm:h-14
                sm:w-14
            ">
                <MousePointer2 className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            {/* Title */}
            <h3 className="
                mt-4
                text-base
                font-black
                tracking-tight
                text-white
                sm:mt-5
                sm:text-lg
            ">
                {title}
            </h3>

            {/* Description */}
            <p className="
                mt-2
                max-w-xs
                text-xs
                leading-5
                text-slate-400
                sm:max-w-sm
                sm:text-sm
                sm:leading-6
            ">
                {description}
            </p>

            {/* Action */}
            <button
                type="button"
                onClick={() => navigate({ to: "/game" })}
                className="
                    mt-5
                    inline-flex
                    h-10
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    bg-violet-600
                    px-5
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-violet-900/20
                    transition-all
                    hover:bg-violet-500
                    active:scale-[0.98]
                    hover:cursor-pointer
                    sm:mt-6
                    sm:w-auto
                "
            >
                <MousePointer2 className="mr-2 h-4 w-4" />
                {buttonText}
            </button>

        </div>
    );
}

export default EmptyState;