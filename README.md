# Prompt 1

Toggle between edit and view modes freely. Your edits are presevered between toggles, but only become part of the "view" mode when they are saved. Both saving and cancelling while in edit mode will take you back to the view mode. Obviously, it would be cooler if the saved edits were persisted in some database.

Some notes:

- I started out using a combination of useReducer/React context/custom hooks to create global state in the HoursOfOperation component. Part of the reason I did this was to show you I am comfortable with these concepts; also when I think of large state object, I lean toward useReducer over useState. That being said, simply using useState like I did in the Branding component is probably the much easier, understandable route.

- I tried to save the days of the week and times of the day in an object and just use e.g. `daysOfWeek.MONDAY` to cut down on typos misspelling 'monday' throughout the app. If I had time to refactor, I would probably just save the days of the week strings in a 7-item day-of-the-week array and access the days of the week via e.g.`daysOfWeek[0]` for sunday. I would do the same for the the hours in the day, so `hourOfTheDay[0]` would be '12:00 AM'. Seems like that could be less work.

- As for monitoring, one idea would be to use `react-error-boundary` which allows you to surround error-prone parts of your app (or the whole app) with error boundaries, so that when an JS error is thrown in that portion, a back-up UI can be shown and the error could be reported to some error monitoring service such as Sentry at the same time. [More on this.](https://kentcdodds.com/blog/use-react-error-boundary-to-handle-errors-in-react)

- The app obviously is not ready for production from a style standpoint.

- I would love to share my ideas about how we could improve this!

You can use the following scripts:

## `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.



# Prompt 2: how to make a production deployable version

There are myriad ways to deploy an app. I will describe how I deployed this app with Netlify:

- logged into my Netlify account
- clicked the 'create new site from Git' button
- choose the Git provider where the source code is hosted. In this case, I selected Github because this repo is hosted on Github.
- chose the this repo, the branch to deploy, the build command used to build, and the build directory where the optimized production-version of the files are placed
- press "deploy site"

Now every time I push to the 'main' branch, a new build and deploy will be triggered!

[https://wizardly-boyd-d8125f.netlify.app/](Here is where this app is located in production)
