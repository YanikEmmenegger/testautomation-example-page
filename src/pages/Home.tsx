import ChallengeCard from "../components/ChallengeCard";
import {challenges} from "../data/challenges.ts";
import {useAuth} from "../context/AuthContext.tsx";
import {useEffect} from "react";

const Home = () => {

    const { logout } = useAuth();

    useEffect(() => {
        logout()
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Available Challenges</h1>
            <p className="text-left w-auto max-w-xl mb-10 mx-auto text-gray-600">
                You will find a list of challenges below. Click on a challenge to view more details. these challenges
                are designed to help you improve your skills in testautomation. the challenges and the code have been
                created by major assistance from chatGPT 😊 I've completed the challenges and its working as expected,
                but there can still be some bugs that are not intended, if you find any bugs or have any suggestions, let me know.
                <span className={"flex flex-col "}>
                     <a className={"text-blue-600 hover:underline"} href={"mailto:yanik.emmenegger@akros.ch"}>yanik.emmenegger@akros.ch</a>
                <a className={"text-blue-600 hover:underline"} href={"https://github.com/YanikEmmenegger/testautomation-example-page"}>Github Repo</a>
                </span>
            </p>
            <div
                className="
          grid
          grid-cols-1
          gap-1
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
