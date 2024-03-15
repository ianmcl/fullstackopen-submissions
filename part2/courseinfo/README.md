# Part 2a Rendering a collection, modules

## Exercises 2.1.-2.5.

### 2.1: Course information step6

Let's finish the code for rendering course contents from exercises 1.1 - 1.5. You can start with the code from the model answers. The model answers for part 1 can be found by going to the [submission system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen), clicking on my submissions at the top, and in the row corresponding to part 1 under the _solutions_ column clicking on show. To see the solution to the course info exercise, click on index.js under _kurssitiedot_ ("kurssitiedot" means "course info").

**Note that if you copy a project from one place to another, you might have to delete the `node_modules` directory and install the dependencies again with the command npm install before you can start the application.**

Generally, it's not recommended that you copy a project's whole contents and/or add the `node_modules` directory to the version control system.

Let's change the `App` component like so:

```javascript
const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
```

Define a component responsible for formatting a single course called `Course`.

The component structure of the application can be, for example, the following:

```
App
  Course
    Header
    Content
      Part
      Part
      ...
```

Hence, the `Course` component contains the components defined in the previous part, which are responsible for rendering the course name and its parts.

The rendered page can, for example, look as follows:

![half stack application screenshot](https://fullstackopen.com/static/6e12df59c1c9e28c39ebdbe1b41ccf97/5a190/8e.png)

You don't need the sum of the exercises yet.

The application must work _regardless of the number of parts a course has_, so make sure the application works if you add or remove parts of a course.

Ensure that the console shows no errors!

### 2.2: Course information step7

Show also the sum of the exercises of the course.

![sum of exercises added feature](https://fullstackopen.com/static/2d8aa950189db6cf2eeb794181429ae9/5a190/9e.png)

### 2.3\*: Course information step8

If you haven't done so already, calculate the sum of exercises with the array method reduce.

**Pro tip:** when your code looks as follows:

```javascript
const total = parts.reduce((s, p) => someMagicHere);
```

and does not work, it's worth it to use `console.log`, which requires the arrow function to be written in its longer form:

```javascript
const total = parts.reduce((s, p) => {
  console.log("what is happening", s, p);
  return someMagicHere;
});
```

**Not working?** : Use your search engine to look up how `reduce` is used in an **Object Array**.

### 2.4: Course information step9

Let's extend our application to allow for an arbitrary number of courses:

```javascript
const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <div>// ...</div>;
};
```

The application can, for example, look like this:

![arbitrary number of courses feature add-on](https://fullstackopen.com/static/8c1ce3363ec056cd15c5edacbeec3370/5a190/10e.png)

### 2.5: Separate module step10

Declare the `Course` component as a separate module, which is imported by the `App` component. You can include all subcomponents of the course in the same module.

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
