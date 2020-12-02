# Prompt 1

Toggle between edit and view modes freely. Your edits are presevered between toggles, but only become part of the "view" mode when they are saved. Both saving and cancelling while in edit mode will take you back to the view mode. Obviously, it would be cooler if the saved edits were persisted in some database.

Some notes:

- I started out using a combination of useReducer and React context to create global state in the HoursOfOperation component. In the second component I just used useState which turned out to be way easier.

- The app obviously is not ready for production from a style standpoint.

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
