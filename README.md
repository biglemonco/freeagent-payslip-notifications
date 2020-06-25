# FreeAgent Payslip Notifications

Tired of running payroll in FreeAgent then manually emailing your employees their payslips? This package notifies your team via email when their payslips have been filed to HMRC. 

_The FreeAgent API doesn't yet offer a link to PDF payslips, so the email includes a link to their payslip area of the dashboard._

## Install
``` bash
$ git clone https://github.com/biglemonco/freeagent-payslip-notifications.git
```

## Environment Variables
The `.env.sample` file has a skeleton for all the variables you need in your application. 

**This package doesn't currently generate refresh tokens for you. You need to do that yourself.** Once you have your FreeAgent client ID and secret, you can use the [Google oAuth playground](https://developers.google.com/oauthplayground) to generate your refresh token.

The default CRON_SCHEDULE env variable configures the app to run every day at 5pm. [Crontab.guru](https://crontab.guru) is a good editor for cron expressions.

## Usage
Notifications can be triggered via the command line with:

```
$ yarn dev
```

_Please note: Running it in development mode will NOT send an email to the users - it will only output the contents of the emails._

## Deploy
Deploying this as a small Node.js app running on a schedule could not be easier. 

### [Heroku](https://dashboard.heroku.com/):

1. Create a new app in Heroku. Grab the Heroku git URL in the app's Settings.
2. Run `git remote add production <Heroku-git-url.git>`, replacing `<Heroku-git-url.git>` with your git URL.
3. Make sure you that all environment variables listed above (and in `.env.sample`) are configured in the Heroku app settings.
4. Add the environment variable `NPM_CONFIG_PRODUCTION=false` (dev dependencies are used to build the app)
5. Push your latest version to the new `production` remote.

## Security
If you discover any security related issues, please email owen@biglemon.co.uk instead of using the issue tracker.

## License
The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

