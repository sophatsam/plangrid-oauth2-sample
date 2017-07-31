This sample application shows how you use OAuth2.0 to authenticate with the PlanGrid API. More details about OAuth for PlanGrid can be found on the [developer site](https://developer.plangrid.com/docs/getting-started-with-oauth).

### To run locally:
1. Clone this repository using `git clone https://github.com/sophatsam/plangrid-oauth2-sample`.
2. Create a `.env` file in the root directory (copy/rename the existing `.env-sample` file).
3. Modify the contents of the `.env` file to include your client ID, client secret, redirect URI, and port number to use for the web server. (If running locally, ensure that you have supplied PlanGrid with a `http://localhost:PORT` address as a redirect URI)
4. Run `npm install` to install dependencies and start the application.
5. Access your application in the browser via `http://localhost:PORT`.