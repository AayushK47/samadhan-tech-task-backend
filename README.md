# Samadhan Tech Task Backend Project

## Start locally

- Step 1:- install the dependencies

```
yarn
```

- Step 2:- Create the .env file. (Use env.example for reference)

- Step 3:- Start the server

  - For development server run

  ```
  yarn run start:dev
  ```

- Step 4:- Star the queue worker to listen to queue events

```
node cli queue:work
```

  - For production server run

  ```
  yarn run start:prod
  ```
