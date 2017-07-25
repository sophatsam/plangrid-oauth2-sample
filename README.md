This sample application shows how you can authenticate with OAuth2.0 using the PlanGrid API. More details about OAuth for PlanGrid can be found on the [developer site](https://developer.plangrid.com/docs/getting-started-with-oauth).

#### To run locally:
1. Clone this repository
2. Create a `.env` file in the root directory (copy/rename the existing `.env-sample` file)
3. Modify the contents of the `.env` file to include your client ID, client secret, redirect URI, and port number to use for the web server. (If running locally, ensure that you have supplied a PlanGrid with a `http://localhost:PORT` address as a redirect URI)
4. Run `npm install`.
5. Access your application in the browser via `http://localhost:PORT`.