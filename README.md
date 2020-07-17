# eWardrobe API

This is an AdonisJS API for digital wardrobe application

## Setup

After cloning this repo, run one of the followings commands


```
npm install
```

```
yarn 
```


### Migrations

To run the migrations, you need to create 2 databases with the following names: **ewardrobe** and **ewardrobe-test**

Run the following command to run startup migrations.

```
adonis migration:run
```

### Environment Variables

To configure .env variables, you need to create **.env** file on the root of the project, copy **.env.example** and configure your database and SMTP settings.

### Run

To run the API, run the following command

``` 
adonis serve --dev
```
