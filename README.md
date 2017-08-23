# zz-react
Lightweight Front-end Framework based on React, Redux, Saga and React-router.

## Getting Started

### Installation
```sh
npm install
```
**Notice: you’ll need to have Node >= 6 on your machine**.

### Startup

if you only want to run it on development environment, you can implement it as below:
```sh
npm run dev
```
Also, you can run it on production environment, just do it as this:
```sh
npm run build
```

## User Guide
The [Use Guide] includes information on different topics, such as:
- [Folder Structure]
```
my-app/
  .babelrc
  .editorconfig
  .eslintrc.js
  package.json
  README.md
  theme.js
  vendor.js
  webpack.config.js
  node_modules/
  public/
    js/
    css/
    index.html
  src/
    constants/
    containers/
    models/
    themes/
    utilities/
    views/
    app.js
    routes.js
```
* `public/` is generated by webpack compiling tool;
* `src/containers` is UI components you specified;
* `src/models` is middleware that defines redux and saga;
* `src/themes` is UI styling;
* `src/views` is the page template;
* `src/routes.js` is browser routing;
* `src/app.js` is the JavaScript entry point.
