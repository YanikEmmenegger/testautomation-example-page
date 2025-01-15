// src/components/UserStoryCard.tsx

import  { FC } from "react";
import { UserStory } from "../types";
import CollapsableSection from "./CollapsableSection.tsx";

interface UserStoryCardProps {
    userStory: UserStory;
}

const UserStoryCard: FC<UserStoryCardProps> = ({ userStory }) => {
    return (
        <div
            id={userStory.id}
            className="user-story-card bg-neutral-300 rounded-md"
            aria-label={`User Story Card for ${userStory.title}`}
            data-testid={`user-story-card-${userStory.id}`}
        >
            <CollapsableSection title={userStory.title}>
                <p
                    className="user-story-description mb-2"
                    id={`user-story-description-${userStory.id}`}
                    aria-label="User Story Description"
                    data-testid={`user-story-description-${userStory.id}`}
                >
                    {userStory.description}
                </p>
                <div
                    className="user-story-acceptance-criteria"
                    id={`user-story-acceptance-criteria-${userStory.id}`}
                    aria-label="Acceptance Criteria"
                    data-testid={`user-story-acceptance-criteria-${userStory.id}`}
                >
                    <h4 className="text-sm font-medium mb-1">Acceptance Criteria:</h4>
                    <ul className="list-disc list-inside text-sm ml-4">
                        {userStory.acceptanceCriteria.map((criterion, index) => (
                            <li
                                key={index}
                                id={`user-story-criterion-${userStory.id}-${index}`}
                                aria-label={`Acceptance Criterion ${index + 1}`}
                                className="mb-1"
                                data-testid={`user-story-criterion-${userStory.id}-${index}`}
                            >
                                {criterion}
                            </li>
                        ))}
                    </ul>
                </div>
            </CollapsableSection>
        </div>
    );
};

export default UserStoryCard;
