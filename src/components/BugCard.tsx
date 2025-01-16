// src/components/BugCard.tsx

import { FC, useState } from "react";
import Button from "./ui/Button";

interface BugCardProps {
    bugs: string[];
}

const BugCard: FC<BugCardProps> = ({ bugs }) => {
    const [showBugs, setShowBugs] = useState(false);

    const toggleShowBugs = () => {
        setShowBugs((prev) => !prev);
    };

    return (
        <div
            className="bug-card bg-red-100 border border-red-300 rounded-md p-4 mb-4"
            aria-label="Bug Card"
            data-testid="bug-card"
        >
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg text-red-700">Intended Bugs, try to find by yourself first</h4>
                <Button
                    onClick={toggleShowBugs}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    aria-label={showBugs ? "Hide Bugs" : "Show Bugs"}
                    data-testid="toggle-bugs-button"
                >
                    {showBugs ? "Hide Bugs" : "Show Bugs"}
                </Button>
            </div>
            <ul
                className={`list-disc list-inside ml-4 text-red-700 transition-all duration-300 ${
                    showBugs ? "blur-none" : "blur-sm"
                }`}
                aria-label="List of Bugs"
                data-testid="bug-list"
            >
                {bugs.map((bug, index) => (
                    <li
                        key={index}
                        className="mb-1"
                        data-testid={`bug-item-${index}`}
                    >
                        {bug}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BugCard;
