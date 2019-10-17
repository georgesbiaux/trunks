# Trunks
Trunks is an load testing boilerplate destined to simulate the use of a web application by a important number of users. It is built on top of [puppeteer](https://github.com/GoogleChrome/puppeteer) and [serverless](https://serverless.com/), and is inspired by [vegeta](https://github.com/tsenart/vegeta).

![Trunks](https://i.pinimg.com/originals/57/7e/45/577e45e8d5425e03314438aa388f1661.png)

## Prerequisites

You will need to have an AWS account with a programmatic access configured on your machine (with the `.aws/credentials` file or `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables).

If you want to test your puppeteer script in local mode (useful for debugging), you will need the Chromium binary somewhere on your file system.

## Usage

Clone the repository with:

```
git clone git@github.com:georgesbiaux/trunks.git
```

Install the project dependencies with:


```
yarn install
```

Modify the `src/test-script.js` and the `invoke(browser)` function with your end to end puppeteer script.

Test the script in local mode to check if everything works with:

```
yarn invoke:local --chromium-path ~/Desktop/Chromium.app/Contents/MacOS/Chromium
```

If necessary, change the name of the services names by editing the `service` property into the `serverless.yml` file.

Deploy the Lambda and Step Function with:

```
yarn deploy
```

And finally, launch a cluster of Lambdas executing your load test with:

```
yarn invoke --cluster-size 5
```

You will get a result table like the following:

```
Launching load test cluster with 5 nodes
┌─────────┬──────────┐
│ (index) │ duration │
├─────────┼──────────┤
│    0    │   5801   │
│    1    │   5640   │
│    2    │   5579   │
│    3    │   5961   │
│    4    │   5679   │
└─────────┴──────────┘
DONE!
```
