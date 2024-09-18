# Telegram Auto-Login Bot

This repository contains the code for the Telegram Auto-Login feature specific bot. The bot provides seamless login functionality for users via Telegram, integrated into your app.

📚 Link to [Telegram Auto-Login feature documentation](https://www.notion.so/dynamic-labs/Telegram-Auto-Login-feature-c15518c0f3c74e418693edf54a8d6386?pvs=4)

Useful link to Heroku [Deploy the App](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app) documentation 

## Live Deployment

The bot is hosted live on Heroku. You can access the app [here](https://dashboard.heroku.com/apps/dynamic-telegram-bot/).

## Heroku Deployment Instructions

To commit and push changes live to Heroku, follow these steps:

1. Log in to Heroku:
    ```bash
    heroku login
    ```

2. Commit your changes:
    ```bash
    git commit -am '<COMMIT>'
    ```

3. Push to the Heroku main branch. This re-deploys and updates the live Bot:
    ```bash
    git push heroku main
    ```

To update the code in this repo
 ```bash
git push origin <branch>
```

### Scaling the Worker

You can scale the worker process from 0 to 1 (or back to 0) using the following command:
```bash
heroku ps:scale worker=1
