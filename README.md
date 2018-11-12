# Art swipe

## Local developement

### Authentication

The app uses authentication through Firebase. If you want to run a local version then either hack the Redux store or create a [Firebase project](https://console.firebase.google.com/).

Add the config objects which can be found in your projects settings. Add them as the following env variables (I would suggest to do it in `.env.development.local` file but to each his own):

```bash
REACT_APP_FIREBASE_API_KEY=$YOUR_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=$YOUR_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_DATABASE_URL=$YOUR_FIREBASE_DATABASE_URL
REACT_APP_FIREBASE_PROJECT_ID=$YOUR_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=$YOUR_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_ID=$YOUR_FIREBASE_MESSAGING_ID
```
