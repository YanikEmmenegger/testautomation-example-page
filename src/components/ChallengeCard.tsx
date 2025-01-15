// src/components/ChallengeCard.tsx

import  {FC} from "react";
import {Challenge} from "../types";
import UserStoryCard from "./UserStoryCard";
import CollapsableSection from "./CollapsableSection";
import Button from "./ui/Button";
import {toast} from "react-hot-toast";
import BugCard from "./BugCard"; // Import BugCard component

interface ChallengeCardProps {
    challenge: Challenge;
}

const ChallengeCard: FC<ChallengeCardProps> = ({ challenge }) => {
    return (
        <div
            id={challenge.id}
            className="challenge-card bg-neutral-100 rounded-md shadow-md p-4 mb-6 flex flex-col justify-between"
            aria-label={`Challenge Card for ${challenge.title}`}
            data-testid={`challenge-card-${challenge.id}`}
        >
            {/* Collapsible Section: Title & Description */}
            <CollapsableSection title={challenge.title}>
                <p
                    className="challenge-description mb-4 text-gray-700"
                    id={`challenge-description-${challenge.id}`}
                    aria-label="Challenge Description"
                    data-testid={`challenge-description-${challenge.id}`}
                >
                    {challenge.description}
                </p>

                {/* Tasks List */}
                {challenge.tasks && challenge.tasks.length > 0 && (
                    <div
                        className="challenge-tasks-section mb-4"
                        id={`challenge-tasks-section-${challenge.id}`}
                        aria-label="Challenge Tasks Section"
                        data-testid={`challenge-tasks-section-${challenge.id}`}
                    >
                        <h4
                            className="challenge-tasks-title font-medium mb-2 text-gray-800"
                            id={`challenge-tasks-title-${challenge.id}`}
                            aria-label="Tasks Title"
                            data-testid={`challenge-tasks-title-${challenge.id}`}
                        >
                            Tasks
                        </h4>
                        <ul
                            className="list-disc list-inside ml-4 text-gray-600"
                            id={`challenge-tasks-list-${challenge.id}`}
                            aria-label="Tasks List"
                            data-testid={`challenge-tasks-list-${challenge.id}`}
                        >
                            {challenge.tasks.map((task, index) => (
                                <li
                                    key={index}
                                    id={`challenge-task-${challenge.id}-${index}`}
                                    aria-label={`Task ${index + 1}`}
                                    className="mb-1"
                                    data-testid={`challenge-task-${challenge.id}-${index}`}
                                >
                                    {task}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* User Stories List */}
                {challenge.userStories && challenge.userStories.length > 0 && (
                    <div
                        className="challenge-user-stories-section mb-4"
                        id={`challenge-user-stories-section-${challenge.id}`}
                        aria-label="Challenge User Stories Section"
                        data-testid={`challenge-user-stories-section-${challenge.id}`}
                    >
                        <h4
                            className="challenge-user-stories-title font-medium mb-2 text-gray-800"
                            id={`challenge-user-stories-title-${challenge.id}`}
                            aria-label="User Stories Title"
                            data-testid={`challenge-user-stories-title-${challenge.id}`}
                        >
                            User Stories
                        </h4>
                        <div
                            className="user-stories-list"
                            id={`user-stories-list-${challenge.id}`}
                            aria-label="User Stories List"
                            data-testid={`user-stories-list-${challenge.id}`}
                        >
                            {challenge.userStories.map((userStory) => (
                                <UserStoryCard
                                    key={userStory.id}
                                    userStory={userStory}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Bug List */}
                {challenge.bugs && challenge.bugs.length > 0 && (
                    <div
                        className="challenge-bugs-section mb-4"
                        id={`challenge-bugs-section-${challenge.id}`}
                        aria-label="Challenge Bugs Section"
                        data-testid={`challenge-bugs-section-${challenge.id}`}
                    >
                        <BugCard bugs={challenge.bugs}/>
                    </div>
                )}

                {/* Difficulty */}
                <div
                    className="challenge-difficulty-section mb-4"
                    id={`challenge-difficulty-section-${challenge.id}`}
                    aria-label="Challenge Difficulty Section"
                    data-testid={`challenge-difficulty-section-${challenge.id}`}
                >
                    <p
                        className="challenge-difficulty text-sm text-gray-800"
                        id={`challenge-difficulty-${challenge.id}`}
                        aria-label="Challenge Difficulty"
                        data-testid={`challenge-difficulty-${challenge.id}`}
                    >
                        <span className="font-medium">Difficulty:</span> {challenge.difficulty}
                    </p>
                </div>

                {/* Link */}
                <div
                    className="challenge-link-section flex flex-col gap-2"
                    id={`challenge-link-section-${challenge.id}`}
                    aria-label="Challenge Link Section"
                    data-testid={`challenge-link-section-${challenge.id}`}
                >
                    <div className={"flex items-center justify-start gap-2"}>
                        <p>{window.location.href + challenge.link}</p>
                        <Button
                            onClick={() => {
                                try {
                                    navigator.clipboard.writeText(window.location.href + challenge.link);
                                    toast.success("Link copied to clipboard");
                                } catch (e) {
                                    console.error(e);
                                    toast.error("Failed to copy link to clipboard");
                                }
                            }}
                            aria-label="Copy Challenge Link"
                            data-testid={`copy-link-button-${challenge.id}`}
                        >
                            Copy link
                        </Button>
                    </div>
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
                        aria-label={`Start Challenge Link for ${challenge.title}`}
                        data-testid={`start-challenge-link-${challenge.id}`}
                    >
                        Start Challenge
                    </a>
                </div>
            </CollapsableSection>
        </div>
    );

};

export default ChallengeCard;
