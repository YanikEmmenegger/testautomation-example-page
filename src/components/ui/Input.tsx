import { FC, InputHTMLAttributes } from "react";

interface BaseProps {
    /** Optional id for test automation and accessibility */
    id?: string;
    /** Optional additional class names for styling */
    className?: string;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>;

/**
 * A reusable input component with Tailwind styling.
 */
const Input: FC<InputProps> = ({ id, className, ...props }) => {
    return (
        <input
            id={id}
            className={`
        border border-gray-300
        rounded
        px-3 py-2
        focus:outline-none
        focus:ring
        focus:ring-blue-200
        ${className ?? ""}
      `}
            {...props}
        />
    );
};

export default Input;
