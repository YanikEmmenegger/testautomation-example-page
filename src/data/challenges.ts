import {Challenge} from "../types.ts";

export const challenges: Challenge[] = [
    {
        id: "Challenge-1",
        userStories: [],
        title: "Challenge 1 - Todo App",
        description: "In this challenge you have a very simple todo app, protected by a user / password authentication. it is possible to add, edit complete and delete todos. the todos are stored in the localstorage and therefore are still there after a logout. the login is stored in the session, if you close the browser and reopen, you are logged out." +
            "the app works but has some flaws. username and password are both 'test'.",
        tasks: [
            "Create Modules to interact with the App",
            "Create one or more Testcases for the Authentication (login, logout, wrong credentials, session handling)",
            "Create one or more Testcases creating, editing, completing, undo and deleting todos",
            "Create one or more Testcases to check if the Total, Completed and Incomplete todos are displayed correctly",
            "Create one or more Testcases to check if the todos are stored in the local storage and are still there after a logout (should be the same when closing the browser, private browsing does not work)",
            "Try to find some bugs in the app by testing not allowed inputs or actions and by validation outputs",
        ],
        link: "challenge-1/",
        difficulty: 1
    },
    {
        id: "Challenge-2",
        userStories: [],
        title: "Challenge 2 - Todo App (bad testability) - xPath",
        description: "In this challenge you will have the same Todo app as before, most of the bugs are fixed, but there is still one (if more, its not intended, please report 😁) existing. As the bugs have been fixed, the developer removed the ids and classnames from most of the elements. This means the created modules from challenge 1 dont work for this challenge." +
            "Try to identify the elements again, you can use all the options learned in the course, but for training purposes, try using the xPath. DISCLAIMER: xPath should not be used if possible, but sometimes the developer can be lazy and not add ids, classes and then the xPath can Help. Use it for this challenge, but try to avoid it in the future." +
            "username and password are both 'test'.",
        tasks: [
            "Create Modules to interact with the App",
            "Create one or more Testcases for the Authentication (login, logout, wrong credentials, session handling)",
            "Create one or more Testcases creating, editing, completing, undo and deleting todos",
            "Create one or more Testcases to check if the Total, Completed and Incomplete todos are displayed correctly",
            "Create one or more Testcases to check if the todos are stored in the local storage and are still there after a logout (should be the same when closing the browser, private browsing does not work)",
            "Try to find some bugs in the app by testing not allowed inputs or actions and by validation outputs",
        ],
        link: "challenge-2/",
        difficulty: 3
    },
    {
        id: "Challenge-3",
        userStories: [],
        title: "Challenge 3 - Todo App WaitOn & IsVisible - API Requests",
        description: "For this challenge the Todo app has been fixed, there should be NO bugs (report to me if you find any 😁 I'll fix them). But now the login and todo actions are done via an API (only simulated, still working with session and localstorage), what this means is that the actions are not instant, they take some time to complete, this is where the WaitOn and isVisible ir exists come in. " +
            "The WaitOn waits for an element to be present and the isVisible checks for an element to be visible. You will need to use these to make sure the actions are completed before continuing with the test. The simulator takes 0.1-10 seconds, so just a 'Tbox Wait' is no option here, unless you want to have not needed delays.",
        tasks: [
            "Create Modules to interact with the App",
            "Create one or more Testcases for the Authentication (login, logout, wrong credentials, session handling)",
            "Create one or more Testcases creating, editing, completing, undo and deleting todos",
            "Create one or more Testcases to check if the Total, Completed and Incomplete todos are displayed correctly",
            "Create one or more Testcases to check if the todos are stored in the local storage and are still there after a logout (should be the same when closing the browser, private browsing does not work)",
            "Try to find some bugs in the app by testing not allowed inputs or actions and by validation outputs, there should be none left (report if you find any)",
            "You can build all the modules and testcases from scratch or use the ones from the previous challenges, they might work with some adjustments ",
        ],
        link: "challenge-3/",
        difficulty: 2
    },
    {
        id: "Challenge-4",
        userStories: [],
        title: "Challenge 4 - Kanban Board - Drag & Drop",
        description: "In this challenge you will be using the drag and drop functionality. The Kanban Board application allows users to manage tasks across different columns ('Backlog', 'In Progress', 'Done'). Your task is to create simple modules to interact with the Kanban Board application and try out the drag and drop functionality. " +
            "you dont have to create complex modules and testcases, just try out the drag and drop functionality, the next challenge will be more complex.",
        tasks: [
            "Create simple modules to interact with the Kanban Board application.",
            "Try out the drag and drop functionality and create simple testcases for it, as long as you understand the principle of drag and drop, its fine, more in the next challenge",
        ],
        link: "challenge-4/",
        difficulty: 1
    },
    {
        id: "Challenge-5",
        title: "Challenge 5 - Kanban Board - Full Functionality Including User Stories",
        description: "For this challenge, you will be testing a comprehensive Kanban Board application that allows users to manage tasks across different columns ('Backlog', 'In Progress', 'Done'). The application includes features such as user authentication, cookie consent management, a structured layout with three distinct columns and a header, task creation with validation, task management (drag and drop, edit, archive, delete, comment), and archive management. Your task is to create test cases for the user stories to ensure that the application functions correctly and meets the acceptance criteria.",
        tasks: [
            "Create the necessary modules to interact with the Kanban Board application.",
            "Create test cases that cover the user stories' acceptance criteria.",
            "Create reusable libraries to simplify test cases."
        ],
        userStories: [
            {
                id: "Challenge-5-US-1",
                title: "User Authentication - Login",
                description: "As a user, I want to login to the Kanban Board application, so that I can securely access and manage my tasks.",
                acceptanceCriteria: [
                    "A login page is presented when accessing the application.",
                    "I can enter my username and password into the respective fields.",
                    "Upon entering valid credentials, I am redirected to the Kanban Board dashboard.",
                    "If I enter invalid credentials, an error message 'Invalid username or password.' is displayed.",
                    "I cannot access the Kanban Board without logging in.",
                ]
            },
            {
                id: "Challenge-5-US-2",
                title: "Cookie Consent Management",
                description: "As a user, I want to accept cookie usage, so that I have control over my privacy and data preferences.",
                acceptanceCriteria: [
                    "Upon first visit, a cookie consent banner appears with 'Accept' and 'Decline' options.",
                    "Clicking 'Accept' enables cookies, hides the banner, and grants full access to all functionalities.",
                    "Clicking 'Decline' disables cookies, hides the banner, and restricts access to functionalities requiring cookies (e.g., logout, create/edit tasks).",
                    "My cookie preference is remembered across sessions, preventing the banner from reappearing.",
                    "All restricted functionalities are disabled or prompt to accept cookies if I declined.",

                ]
            },
            {
                id: "Challenge-5-US-3",
                title: "Application Layout and Structure",
                description: "As a user, I want a well-structured layout with three distinct columns and a header, so that I can easily navigate and manage my tasks.",
                acceptanceCriteria: [
                    "The application displays a header containing the application title and a 'Logout' button.",
                    "There are three main columns labeled 'Backlog', 'In Progress', and 'Done'.",
                    "Each column is clearly separated and visually distinct for easy differentiation.",
                    "Clicking the 'Logout' button logs the user out and redirects to the login page."
                ]
            },
            {
                id: "Challenge-5-US-4",
                title: "Create a New Task",
                description: "As a user, I want to create a new task with a title, description, status, and due date, so that I can organize and manage my work effectively.",
                acceptanceCriteria: [
                    "When I click the 'New Task' button, a modal titled 'Create a New Task' appears.",
                    "I can enter a title, description, select a status ('Backlog', 'In Progress', 'Done'), and choose a due date in supported formats.",
                    "If I attempt to save without a title, an error message 'Title cannot be empty!' is displayed.",
                    "If I attempt to save without a due date, an error message 'Please select a due date!' is displayed.",
                    "If I enter a past due date, an error message 'Due date cannot be in the past!' is displayed.",
                    "Upon successful creation, the task is added to the selected status column, a success message 'Task created successfully!' is shown, and the modal closes.",
                    "If I click 'Cancel', the modal closes without saving any changes.",
                    "All input fields and buttons are disabled if cookies are not accepted."
                ]
            },
            {
                id: "Challenge-5-US-5",
                title: "Manage Tasks - Drag & Drop, Edit, Archive, Delete, Comment",
                description: "As a user, I want to manage my tasks by dragging and dropping them between columns, editing their details, archiving completed tasks, deleting unnecessary tasks, and adding comments for additional context.",
                acceptanceCriteria: [
                    // **Drag and Drop**
                    "I can click and hold on a task to initiate dragging.",
                    "I can drag the task to another column, which highlights as a valid drop target.",
                    "Upon dropping, the task's status updates to the new column's status and appears immediately in the new column.",
                    "If an error occurs during the status update, the task reverts to its original column and an error message 'Failed to move task. Reverted changes.' is displayed.",
                    "Drag and drop functionality is disabled if cookies are not accepted.",

                    // **Edit Task**
                    "When I right-click on a task and select 'Edit', a modal titled 'Edit Task' appears with current task details pre-filled.",
                    "I can modify the title, description, status, and due date.",
                    "Validations are the same as in creating a task: title cannot be empty, due date must be selected and not in the past.",
                    "Upon successful editing, the task updates in the appropriate column, a success message 'Task updated successfully!' is shown, and the modal closes.",
                    "If I click 'Cancel', the modal closes without saving changes.",
                    "All input fields and buttons are disabled if cookies are not accepted.",

                    // **Archive Task**
                    "When I right-click on a task with status 'Done' and select 'Archive', a confirmation modal titled 'Archive Task?' appears.",
                    "If I confirm archival, the task's status changes to 'Archived', it moves to the Archived Tasks sidebar, a success message 'Task archived!' is displayed, and the modal closes.",
                    "If I cancel archival, the modal closes without archiving the task.",
                    "Archival options are disabled if cookies are not accepted.",

                    // **Delete Task**
                    "When I right-click on a task and select 'Delete', a confirmation modal titled 'Delete Task?' appears.",
                    "If I confirm deletion, the task is removed from the Kanban Board, a success message 'Task deleted!' is displayed, and the modal closes.",
                    "If I cancel deletion, the modal closes without deleting the task.",
                    "Deletion options are disabled if cookies are not accepted.",

                    // **Add Comment**
                    "When I right-click on a task and select 'Add Comment', a modal titled 'Add Comment' appears.",
                    "I can enter a non-empty comment in the textarea and click 'Save' to add the comment to the task's comment list.",
                    "If I attempt to save an empty comment, an error message 'Comment cannot be empty.' is displayed.",
                    "Upon successful addition, a success message 'Comment added successfully!' is shown and the modal closes.",
                    "If I click 'Cancel', the modal closes without adding a comment.",
                    "Comment addition options are disabled if cookies are not accepted."
                ]
            },
            {
                id: "Challenge-5-US-6",
                title: "Manage Archived Tasks",
                description: "As a user, I want to view and manage archived tasks in a dedicated sidebar, so that I can reference or restore historical tasks without cluttering the main board.",
                acceptanceCriteria: [
                    "Clicking the 'Archive' button in the header opens the Archived Tasks sidebar.",
                    "The sidebar displays all archived tasks, sorted by due date in ascending order.",
                    "If there are no archived tasks, a message 'No archived tasks.' is displayed.",
                    "I can close the Archived Tasks sidebar by clicking the 'Close' button.",
                    "Archived tasks retain their details and can be reopened from the sidebar by clicking the 'Reopen' button, which moves them back to the 'Backlog' column.",
                    "Reopen options are disabled if cookies are not accepted."
                ]
            }
        ],
        link: "challenge-5/",
        difficulty: 5
    }
];
