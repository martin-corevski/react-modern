# SEO PWA with React and Material-UI

Modern React 16 PWA (Workbox and Firebase) setup with Webpack 4, axios, React Router 4 and Redux Saga. Additionally installed [react-helmet], [react-ga], [material-ui] with [typeface-roboto] fonts and [icons]. More **information on the setup** [project](https://github.com/martin-corevski/react-basics) and [wiki](https://github.com/martin-corevski/react-basics/wiki/DIY-repository-setup). For the **http requests basics** [project](https://github.com/martin-corevski/react-basics-http) and [wiki](https://github.com/martin-corevski/react-basics-http/wiki/DIY-repository-setup). For **routing basics** [project](https://github.com/martin-corevski/react-basics-routing) and [wiki](https://github.com/martin-corevski/react-basics-routing/wiki/DIY-repository-setup). For **redux basics** [project](https://github.com/martin-corevski/react-basics-redux) and [wiki](https://github.com/martin-corevski/react-basics-redux/wiki/DIY-repository-setup)

You can also check this project's [wiki](https://github.com/martin-corevski/react-modern/wiki/DIY-repository-setup).
This project is a an upgrade of my [react-pwa](https://github.com/martin-corevski/react-pwa) repository with [wiki](https://github.com/martin-corevski/react-pwa/wiki/DIY-repository-setup).

---
## Install dependencies

```
cd path-to-your-project
yarn
```

- Feel free to use **npm** if you don't like using **yarn**.

### Additional install

```
npm i -g ntl
```

- By running **ntl** you can choose which script to run. For example **start**, **build**, **build:prod** and **watch** will be some of the choices. All of these scripts are in the `package.json` file in the scripts object.
- Command to start **ntl** and choose an option
```
ntl
```
### Before building/running the application

- Firebase should be set up

```
npm i -g firebase-tools
```
- This command will install the firebase cli tools. After this make sure you are inside the project directory (print working directory `pwd`).

```
firebase login
```
- You will be asked to access a link in order to authenticate with your google account.

- Before initializing the project you should create a [firebase project and database](https://firebase.google.com/docs/?authuser=0) (with public access).
```
firebase init
```
- Initialization options choices [example](http://prntscr.com/jnbli0). In this repository we already have the functions folder so choose not to overwrite existing files when asked to.
```
Do you want to use ESLint to catch probable bugs and enforce style? No
File functions/package.json already exists. Overwrite? No
  Skipping write of functions/package.json
File functions/index.js already exists. Overwrite? No
  Skipping write of functions/index.js
```
- I am declining the use of ESLint inside functions because I use Prettier with StandardJS updated ESLint rules (eslintrc config file), read more [here](https://medium.com/@MartinCorevski/why-not-have-them-all-together-standard-js-with-prettier-and-eslint-fix-9a4d96ca0030).

- Once the initialization is done you will need to set up the constants in the **.env** files and in **functions/index.js**.
- In order to generate vapid keys, inside `cd functions`, use `npm run web-push generate-vapid-keys`. Copy the keys and paste them inside the previously mentioned files. Remember not to place the private key on the client side, only server side code should know about it. One last thing to download and add to the functions folder is the service account key, make sure when you download it from your firebase Project Overview -> Settings -> Service Accounts screen to rename it into **serviceAccountKey** and make sure it's **.json** file type.
- When the functions/index.js file is properly set up you can `cd ..` (go to the project directory) and run `firebase deploy --only functions`. If everything goes well you will get a link that ends with **.cloudfunctions.net/storeData** copy that link and update the **.env** files and **sw.js** file (at the bottom, registerRoute function first argument).

- Now you should be able to run the dev-server, build the application and deploy it on firebase.

### Without ntl

If you don't want to use ntl you can use the `npm run` command with the chosen script, examples:
- For development bundle
```
yarn build
```
- For production ready bundle
```
yarn build:prod
```
- For development server
```
yarn start
```
- For Webpack watch
```
yarn watch
```
- For testing with jest
```
yarn test
```
---
License
---

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[react-helmet]: <https://github.com/nfl/react-helmet>
[react-ga]: <https://github.com/react-ga/react-ga>
[material-ui]: <https://material-ui.com/>
[typeface-roboto]: <https://github.com/KyleAMathews/typefaces/tree/master/packages/roboto>
[icons]: <hhttps://material-ui.com/style/icons/>
