import {ButtonHTMLAttributes, FC} from "react";

interface BaseProps {
    /** Optional id for test automation and accessibility */
    id?: string;
    /** Optional additional class names for styling */
    className?: string;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A reusable button component with Tailwind styling.
 */
const Button: FC<ButtonProps> = ({id, className, children, ...props}) => {
    return (
        <button
            id={id}
            className={`
        bg-blue-600
        text-white
        font-medium
        py-2
        px-4
        rounded
        hover:bg-blue-700
        transition-colors
        ${className ?? ""}
      `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
