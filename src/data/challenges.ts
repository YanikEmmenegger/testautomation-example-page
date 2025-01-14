import {Challenge} from "../types.ts";

export const challenges: Challenge[] = [
    {
        id: "Challenge-1",
        title: "Challenge 1 - Todo App",
        description: "a simple todo app protected by authentication. The app has a login page and a todo page. Both have best testability practices by adding IDs, Classnames, Aria-Labels and so on. username and password are both 'test'. Create Modules, Library's and Testcases",
        tasks: [
            "create Modules to interact with the App",
            "Create a test case for the authentication. Is it possible to access the todo page (/challenge-1/todo) without logging in?, Is it possible to login with false credentials?, Is it possible to login with correct credentials?",
            "Create a test case for the todo page. Is it possible to add a new todo?, Is it possible to delete a todo?, Is it possible to edit a todo?",
            "Create a test case to check if Total, Completed and Incomplete todos are displayed correctly",
            "Create a test case for the logout. Is it possible to logout?",
            "Create a test case to check if the todos are stored in the local storage, logout and check if the todos are still there",
            "Create/Convert teststeps into reusable library's for example the authentication"
        ],
        link: "challenge-1/",
        difficulty: 1
    },
    {
        id: "Challenge-2",
        title: "Challenge 2 - Todo App (bad testability) - xPath",
        description: "same application as challenge 1, but the testability is not given. There are no IDs, Classnames, Aria-Labels and so on. username and password are both 'test'. Create Modules by using the xPath.",
        tasks: [
            "create Modules to interact with the App",
            "Create a test case for the authentication. Is it possible to access the todo page (/challenge-2/todo) without logging in?, Is it possible to login with false credentials?, Is it possible to login with correct credentials?",
            "Create a test case for the todo page. Is it possible to add a new todo?, Is it possible to delete a todo?, Is it possible to edit a todo?",
            "Create a test case to check if Total, Completed and Incomplete todos are displayed correctly",
            "Create a test case for the logout. Is it possible to logout?",
            "Create a test case to check if the todos are stored in the local storage, logout and check if the todos are still there",
            "Create/Convert teststeps into reusable library's for example the authentication"
        ],
        link: "challenge-2/",
        difficulty: 3
    },
    {
        id: "Challenge-3",
        title: "Challenge 3 - Todo App WaitOn & IsVisible - API Requests",
        description: "Still the Todo App, but now there will be Elements that need to be loaded, therefore need to be checked if element is visible or if it exists. " +
            "The Login simulates a API-Request that can take 0.1-10 seconds. Before using the todo functions, make sure to check if Login finished. Now before you can start create Todos, there will be a Cookie Banner that need to be accepted before you can go on. " +
            "When clicking Accept, it can take a few seconds (use the WaitOn). When Creating/Deleting/Editing Todos, it takes a few seconds to handle the request (API Simulation), make sure to use WaitOn here." +
            "Try to add an empty Todo or try to change the Todo to empty title and see what happens.  username and password are both 'test'.",
        tasks: [
            "create or update the Modules to interact with the App",
            "Create or update a test case by including the WaitOn and isVisible",
            "Create testcases to validate inputs, for example, try to add an empty Todo or try to change the Todo to empty title and see what happens",
        ],
        link: "challenge-3/",
        difficulty: 2
    },
];
