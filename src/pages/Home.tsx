import ChallengeCard from "../components/ChallengeCard";
import { challenges } from "../data/challenges.ts";

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Available Challenges</h1>
            <div
                className="
          grid
          grid-cols-1
          gap-6
        "
            >
                {challenges.map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
            </div>
        </div>
    );
};

export default Home;
