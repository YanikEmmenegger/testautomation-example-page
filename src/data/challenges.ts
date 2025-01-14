import {Challenge} from "../types.ts";

export const challenges: Challenge[] = [
    {
        id: "Challenge-1",
        title: "Challenge 1 - Todo App (good testability)",
        description: "a simple todo app protected by authentication. The app has a login page and a todo page. Both have best testability practices by adding IDs, Classnames, Aria-Labels and so on. username and password are both 'test'. Create Modules, Library's and Testcases",
        tasks: [
            "create Modules / Page Object Patters to interact with the App",
            "Create reusable library's for the authentication, Todo Page for the testcases",
            "Create a test case for the authentication. Is it possible to access the todo page (/challenge-1/todo) without logging in?, Is it possible to login with false credentials?, Is it possible to login with correct credentials?",
            "Create a test case for the todo page. Is it possible to add a new todo?, Is it possible to delete a todo?, Is it possible to edit a todo?",
            "Create a test case to check if Total, Completed and Incomplete todos are displayed correctly",
            "Create a test case for the logout. Is it possible to logout?",
            "Create a test case to check if the todos are stored in the local storage, logout and check if the todos are still there"
        ],
        link: "challenge-1/",
        difficulty: 1
    },
    {
        id: "Challenge-2",
        title: "Challenge 2 - Todo App (bad testability)",
        description: "same application as challenge 1, but the testability is not given. There are no IDs, Classnames, Aria-Labels and so on. username and password are both 'test'. Create Modules, Library's and Testcases (as soon as the Modules are created, you can copy and adjust the testcases from challenge 1)",
        tasks: [
            "create Modules / Page Object Patters to interact with the App",
            "Create reusable library's for the authentication, Todo Page for the testcases",
            "Create a test case for the authentication. Is it possible to access the todo page (/challenge-2/todo) without logging in?, Is it possible to login with false credentials?, Is it possible to login with correct credentials?",
            "Create a test case for the todo page. Is it possible to add a new todo?, Is it possible to delete a todo?, Is it possible to edit a todo?",
            "Create a test case to check if Total, Completed and Incomplete todos are displayed correctly",
            "Create a test case for the logout. Is it possible to logout?",
            "Create a test case to check if the todos are stored in the local storage, logout and check if the todos are still there"
        ],
        link: "challenge-2/",
        difficulty: 3
    },
];
