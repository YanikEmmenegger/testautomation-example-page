import {FC} from "react";
import {Challenge} from "../types.ts";

interface ChallengeCardProps {
    challenge: Challenge;
}

const ChallengeCard: FC<ChallengeCardProps> = ({challenge}) => {
    return (
        <div
            id={challenge.id}
            className="
        bg-neutral-100
        rounded-md
        shadow-md
        p-4
        flex
        flex-col
        justify-between
      "
            aria-label={`Challenge Card for ${challenge.title}`}
        >
            <div>
                {/* Title & Description */}
                <h3
                    className="text-xl font-semibold mb-2"
                    id={`challenge-title-${challenge.id}`}
                    aria-label="Challenge Title"
                >
                    {challenge.title}
                </h3>
                <p
                    className="mb-4"
                    id={`challenge-description-${challenge.id}`}
                    aria-label="Challenge Description"
                >
                    {challenge.description}
                </p>

                {/* Tasks List */}
                <div
                    className="mb-4"
                    id={`challenge-tasks-${challenge.id}`}
                    aria-label="Challenge Tasks Section"
                >
                    <h4
                        className="font-medium mb-2"
                        id={`challenge-tasks-title-${challenge.id}`}
                        aria-label="Tasks Title"
                    >
                        Tasks
                    </h4>
                    <ul
                        className="list-disc list-inside ml-4"
                        id={`challenge-tasks-list-${challenge.id}`}
                        aria-label="Tasks List"
                    >
                        {challenge.tasks.map((task, index) => (
                            <li
                                key={index}
                                id={`challenge-task-${challenge.id}-${index}`}
                                aria-label={`Task ${index + 1}`}
                                className="mb-1"
                            >
                                {task}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Footer: Difficulty + Link */}
            <div className="mt-auto">
                <p
                    className="text-sm mb-2"
                    id={`challenge-difficulty-${challenge.id}`}
                    aria-label="Challenge Difficulty"
                >
                    <span className="font-medium">Difficulty:</span> {challenge.difficulty}
                </p>
                <p id={`challenge-link-${challenge.id}`}
                   className={"mb-2"}>Link: {window.location.href + challenge.link}</p>
                <a
                    id={`challenge-link-${challenge.id}`}
                    href={challenge.link}
                    rel="noreferrer"
                    className="
            inline-block
            text-center
            w-full
            bg-blue-600
            text-white
            py-2
            rounded-md
            hover:bg-blue-700
            transition-colors
          "
                    aria-label="Start Challenge Link"
                >
                    Start Challenge ({challenge.title})
                </a>
            </div>
        </div>
    );
};

export default ChallengeCard;
