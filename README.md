This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Description
Demonstates a mock-up health care logging system, allowing creation and management of patients with associated encounters and management of those encounters

### Usage
Start by booting the backend AppRunner.java in ransom-final-backend, then navigate to ransom-final-frontend after installing dependencies and run "npm start"

### Testing

Import the testing library: "npm install @testing-library/react"

To run testing with coverage, run 'npm test a -- --coverage"

### Dependencies
react, to isntall run "npm i react" in the root directory ransom-final-frontend

react-with-bootstrap, to install run "npm i react-with-bootstrap" in the root directory ransom-final-frontend

### Linting

Currently the project is unlinted, to install linting, run "npm install eslint-config-airbnb eslint-plugin-jsx-a11y typescript @typescript-eslint/parser", 

THEN, create a .eslintrc file, and add:
{

  "extends": [

	"react-app",

	"airbnb",

	"airbnb/hooks",

	"plugin:jsx-a11y/recommended"

  ],

  "plugins": ["jsx-a11y"],

  "rules": {

	"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],

	"linebreak-style": 0,

    "comma-dangle": ["error", "never"],

    "react/prop-types": 0

  }

}

THEN, add "lint": "eslint . --fix" to line 22 of package.json, and "run npm run lint" in the root directory


