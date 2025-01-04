# User repository search

Allow the user to browse through a list of a user's GitHub repositories.
The list will be filtered according to the given name and programming language.

You can see it in action [here](https://reposearch.carlosgiraldolozano.com).

## Setup

The project makes use of a `config.json` file, which is not incuded in the repository. 
This file contains the API token for the GitHub REST API. As this token is optional when making requests, so is the `config.json` file.

The token allows, among other things, for a higher rate of requests per hour to the GitHub API; if you'd like to set it up, you can learn more through the official [GitHub Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). You can use the provided `config.example.json` file as a guideline for your new configuration file; replace any instances of `GitHub_REST_API_Token` with your Personal Access Token.


## Running the project

Make sure to have [Node.js](https://nodejs.org) installed on your system.

Open a terminal window and navigate to the root of your project. Once there, execute:
```
npm run dev
``` 
to run your project on a development environment.

## Future improvements

- Additional filters for user search
- Additional filters for repository search
- Add GitHub login to allow authorised users to see private repositories
