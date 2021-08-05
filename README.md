REST API to display blocks from blockchain.info via React frontend component 
============================================================================

This is a REST API component with ES6 and Express in backend and react in the frontend using bootstrap 5.0.2.

- The API component fetches data from blochchain.info and displays it in 2 different React views:
    - the first view (Blocks.js reciving data via props from App.js) shows the latest blocks available (requests from previous day)
    - the second view (Details.js) shows details for a specific block(-hash) clicked on by the user in the first view


Getting Started
---------------

```sh
# Install dependencies for API
'npm install'

# Install dependencies for React
cd into /client
'npm install'

# Start development live-reload server
'PORT=8080 npm run dev'

# OR

# Start production server:
'PORT=8080 npm start'

# Start react in second terminal:
cd into /client
'npm start'

Runs the app in the development mode.\
Open [http://localhost:3000] to view it in the browser.



Suggestions
-----------

- Unit tests could be performed to test the expected outcome of the routes in the API

- Improvement could be done in the frontend by using Redux (reduce complexity of data flow) to be able to scale the application for future development

- Error responses from the server/API when failing to load data could be enhanced

- Caching could be used for the request results to improve performance and UX

- The app could be deployed on Heroku as an initial hosting option

- The App could be expanded by providing more details on the blocks, such as detailed transactions. Therefore, there would have to be more views to displays different aspects