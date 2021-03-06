# Change log

<a name=2.1.0"></a>
## [2.1.0](https://github.com/dunbarcyber/cyclops/compare/2.0.2...2.1.0) (2017-05-17)

### Added

- Better alert workflow. Status changing has been removed from the UI and is now changed based on assigned user and outcome. Outcomes must also now include an anaylsis before changing.
- Alert update errors. If there are any errors in changing alert fields, it shows them in the alert detail view.
- Alert sources sorted by warehouse name.
- More tests for the alert redux store.
- Link to the Cyphon Admin page. The environment variable ``CYPHON_EXTERNAL_URL`` must be set to activate this. This is because the value for ``CYPHON_URL``, which is what connects to the API, could possibly be for another network such as a Docker network, so an externally available URL that can be reached from a browser must be used instead.

### Fixed

- Infinite logout loop that occured when a user traveled from the logout page to the login page.
- Missing source maps from the production and development builds.
- Bug that didn't allow any changes to be made to the Alert object.
- Bug that didn't properly set the Authorization header for API requests.

### Changed

- Views folder to routes.
- ``index.ts`` for the root route and each route. This is explained more [here](http://cyphon-ui.readthedocs.io/en/latest/contributing.html).
- Names for route reducers and actions. They now correspond to the component they are used for.
- State shape of the redux store. It now corresponds to the folder structure for easier data retrieval.


### Removed

- ``api`` folder. All of these resources have been moved to ``services`` or ``types``.

<a name="2.0.2"></a>
## [2.0.2](https://github.com/dunbarcyber/cyclops/compare/2.0.1...2.0.2) (2017-04-28)
- Add endpoint tests for distilleries, users, contexts, and actions.
- Fix bug that caused alert id to be used when making Jira tickets instead of the action id.

<a name="2.0.1"></a>
## [2.0.1](https://github.com/dunbarcyber/cyclops/compare/2.0.0...2.0.1) (2017-04-28)

- Add push notification documentation.
- Open context search result JSON so nested structures don't have to be toggled.
- Simplify coverage generation so that it isn't necessary to run a seperate NPM task.

<a name="2.0.0"></a>
## [2.0.0](https://github.com/dunbarcyber/cyclops/compare/1.0.0...2.0.0) (2017-04-27)

### Added

- Client code coverage in HTML format by running `npm run coverage`.
- Client code coverage pushed to coveralls through travis ci.
- `nodemon.json` configuration file.
- npm coverage scripts outlined in the sphinx documentation.
- `CYPHON_API_VERSION` environment variable.
- Chrome push notifications. Configured by adding `GCM_SENDER_ID` to `cyclops.env` after registering an application on [Firebase](https://firebase.google.com/). More information can be found in the documentation.
- ES6 pollyfills to webpack entry points.
- Webpack entry point for tests.
- React application root file `src/app/index.tsx`.

### Changed

- Updated documentation to reflect new folder structure and npm scripts.
- Server source code is now compiled through ts-node and served in memory instead of outputing javascript source files into `build`.
- Webpack now outputs to `dist` instead of `build`.
- Server source files moved from `src/express` to `server`.
- React application source files moved from `src/react` to `src`.
- Scss source files moved from `src/scss` to `src/styles`.
- `constants.js` renamed to `cyclops.config.ts`.
- Environment configuration variables moved from `server/constants.ts` to `cyclops.config.ts`.
- npm scripts which are outlined in the documentation.
- Removed the build step from `Dockerfile`. It's now done automatically via `postinstall` in `package.json`.
- Webpack config rewritten in typescript.
- Karma config rewritten in typescript.
- Moved server `tsconfig.json` to root.
- Webpack entry point `src/main.ts`.
- Location of API docs moved to `api-docs`.

### Removed

- server code coverage removed in order to add coverage to coveralls and to possibly deprecate the express server and instead serve Cyclops through the Cyphon system to lessen code complexity.
- `CYPHON_API_PATH` environment variable.

<a name="1.0.0"></a>
## [1.0.0](https://github.com/dunbarcyber/cyclops/releases/tag/1.0.0) (2017-04-05)