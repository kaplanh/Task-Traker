# Task Traker

[:point_right: Click here to see on browser](https://task-traker-v1.netlify.app/)

![appointment]()

---

| **What's used in this app ?**                         | **How use third party libraries**          | **Author**                                                     |
| ----------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------- |
| [useEfect() Hook](https://react.dev/learn#using-hooks)|                                            | [Take a look at my portfolio](https://kaplanh.github.io/Portfolio_with_CssFlex/) |
| [useState() Hook](https://react.dev/learn#using-hooks)|                                            | [Visit me on Linkedin](https://www.linkedin.com/in/kaplan-h/)                    |
| [LocalStorage](https://www.w3schools.com/jsref/prop_win_localstorage.asp)|                         |                    |
| [react-events](https://react.dev/learn#responding-to-events)|                                      |                    |
| [React-Conditional rendering](https://react.dev/learn#conditional-rendering) |                     |                    |
| [React-icons](https://react-icons.github.io/react-icons/)| npm i / yarn add react-icons               |                 |
| [props-drilling](https://react.dev/learn#sharing-data-between-components)|                            |                 |
| [Semantic-Commits](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) |             |                 |
| Deploy with [Netlify](https://app.netlify.com/teams/kaplanh/sites) |                                 |                 |

---

## How To Run This Project 🚀

<br/>

### 💻 Install React 👇

```bash
yarn create react-app .  or npx create-react-app .
```

### 💻 Install Sass 👇

```bash
yarn add sass  or npm i sass
```

## 🔴 Delete these files and delete the imports👇

    - App.test.js
    - reportWebVitals.js
    - setupTests.js
    - favicon.ico
    - logo192.png
    - logo512.png
    - manifest.json
    - robots.txt

### 💻 Start the project 👇

```bash
yarn start or npm start
```

OR

-   <strong>Clone the Repo</strong>

    ```sh
    git clone
    ```

-   <strong>Install NPM packages</strong>

    ```sh
    npm install or yarn
    ```

-   <strong>Run the project</strong>

    ```sh
    npm start or yarn start
    ```

-   <strong>Open the project on your browser</strong>

    ```sh
    http://localhost:3000/
    ```

-   ### <strong>Enjoy! 🎉</strong>

---

## Project Skeleton

```
 Appointment App (folder)
|
|----public (folder)
│     └── index.html
|----src (folder)
|    |--- components (folder)
│    │       ├── AddTaskForm.jsx
│    │       ├── Header.jsx
│    │       ├── ShowTasks.jsx
│    │
|    |--- helpers (folder)
|    |       |── StartData.jsx
│    │
│    |--- pages (folder)
|    |      ├── Home.jsx
|    |
│    ├--- App.js
│    │--- App.css
│    |--- index.js
│
│
|-- .gitignore
|── package-lock.json
├── package.json
|── README.md
|── yarn.lock


```

---

### At the end of the project, the following topics are to be covered;

- useEffect() & useState() & LocalStorage & Conditional rendering 

 ```jsx
     import React from "react";
        import Header from "../components/Header";
        import ShowTasks from "../components/ShowTasks";
        import { useState, useEffect } from "react";
        // import data from '../helper/starterData';

        const Home = () => {
            const [tasks, setTasks] = useState(
                JSON.parse(localStorage.getItem("tasks")) || []
            );

            useEffect(() => {
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }, [tasks]);

            // console.log(tasks);
            return (
                <div className="container">
                    <Header tasks={tasks} setTasks={setTasks} />
                    {tasks.length > 0 ? (
                        <ShowTasks tasks={tasks} setTasks={setTasks} />
                    ) : (
                        <p className="text-center">NO TASK TO SHOW</p>
                    )}
                </div>
                
            );
        };

        export default Home;
 ```

- conditional rendering & toggle

    ```jsx
        import AddTaskForm from "./AddTaskForm";
        import { useState } from "react";

        const Header = ({ tasks, setTasks }) => {
            const [show, setShow] = useState(false);
            const [btnStyle, setBtnStyle] = useState({
                name: "SHOW ADD TASK BAR",
                bgColor: "purple",
            });

            //! React, default olarak state'leri hemen degistirmeyebilir.
            //! Ekstra render'lari azaltmak icin state'leri toplu (batch) bir sekilde gunceller.
            //! Bir event handler icerisindeki ardasik state'ler event bitiminde toplu bir
            //! sekilde guncellenmis olur.State'lerin guncelenmesi gelis sirasina gorere yapilir.
            //! Ayni event icerisinde birbirine bagli state'leri kullanirken buna dikkat etmek gerkir.

            //? https://stackoverflow.com/questions/48563650/does-react-keep-the-order-for-state-updates

            const handleShow = () => {
                if (show) {
                    setBtnStyle({
                        name: "SHOW ADD TASK BAR",
                        bgColor: "purple",
                    });
                } else {
                    setBtnStyle({
                        name: "CLOSE ADD TASK BAR",
                        bgColor: "red",
                    });
                }
                setShow(!show);
            };
            // console.log(show);

            return (
                <header className="header">
                    <h1>TASK TRACKER</h1>
                    <button
                        onClick={handleShow}
                        className="btn"
                        style={{ backgroundColor: btnStyle.bgColor }}
                    >
                        {btnStyle.name}
                    </button>
                    {show && <AddTaskForm tasks={tasks} setTasks={setTasks} />}
                </header>
            );
        };

        export default Header;
    ```

-  with filter deleting

    ```jsx
            import { FaTimesCircle } from "react-icons/fa";

            const ShowTasks = ({ tasks, setTasks }) => {
                console.log(tasks);
                const toggleDone = (id) => {
                    setTasks(
                        tasks.map((task) =>
                            task.id === id ? { ...task, isDone: !task.isDone } : task
                        )
                    );
                };

                const deleteTask = (id) => {
                    setTasks(tasks.filter((task) => task.id !== id));
                };
                return (
                    <div>
                        {tasks.map((task) => {
                            const { id, task: text, day, isDone } = task;
                            return (
                                <div
                                    key={id}
                                    className={`task ${isDone ? "done" : ""}`}
                                    onDoubleClick={() => toggleDone(id)}
                                >
                                    <h3>
                                        {text}
                                        <FaTimesCircle
                                            style={{ color: "red" }}
                                            onClick={() => deleteTask(id)}
                                        />
                                    </h3>
                                    <h6>{day}</h6>
                                </div>
                            );
                        })}
                    </div>
                );
            };

            export default ShowTasks;
    ```

-   Semantic Commit Messages
    See how a minor change to your commit message style can make you a better programmer.

    Format: <type>(<scope>): <subject>

    <scope> is optional

    -   Example

    ```
                feat: add hat wobble
        ^--^  ^------------^
        |     |
        |     +-> Summary in present tense.
        |
        +-------> Type: chore, docs, feat, fix, refactor, style, or test.
    ```

- More Examples:
    -   `feat`: (new feature for the user, not a new feature for build script)
    -   `fix`: (bug fix for the user, not a fix to a build script)
    -   `docs`: (changes to the documentation)
    -   `style`: (formatting, missing semi colons, etc; no production code change)
    -   `refactor`: (refactoring production code, eg. renaming a variable)
    -   `test`: (adding missing tests, refactoring tests; no production code change)
    -   `chore`: (updating grunt tasks etc; no production code change)

---

## Feedback and Collaboration

I value your feedback and suggestions. If you have any comments, questions, or ideas for improvement regarding this project or any of my other projects, please don't hesitate to reach out.
I'm always open to collaboration and welcome the opportunity to work on exciting projects together.
Thank you for visiting my project. I hope you have a wonderful experience exploring it, and I look forward to connecting with you soon!

<p align="center"> ⌛<strong> Happy Coding </strong> ✍ </p>
