# FS-App-Template

## Setup

To use this as boilerplate, you'll need to take the following steps:

* Don't fork or clone this repo! Instead, create a new, empty
  directory on your machine and `git init` (or create an empty repo on
  Github and clone it to your local machine)

* Now you will have to add the fs-app-template as a remote and merge it into your own repository.

```
git remote add boilermaker git@github.com:FullstackAcademy/fs-app-template.git
git fetch boilermaker
git merge boilermaker/main
git branch -m master main
```

## Customize

Now that you've got the code, follow these steps to get acclimated:

* Update project name and description in `package.json`
* `npm install`
* Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):
* These commands will create both your **development** and **test** databases

```
createdb <YOUR APP NAME HERE FROM package.json>
createdb <YOUR APP NAME HERE FROM package.json>-test
```

* By default, running `npm test` will use your test database, while
  regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)


### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

* **If you are creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a
      name in mind.
  2.  `heroku config:set JWT=<your secret here!>` to set a secret for JWT signing

Database Setup

  3.  `heroku addons:create heroku-postgresql:hobby-dev` to add
      ("provision") a postgres database to your heroku dyno (This creates your production database)

  4.  `heroku config:set SEED=true` to get heroku to sync and seed your database

  5.   note everytime your app restarts, the database tables will be dropped and re-created. To avoid this you can `config:unset SEED`


* **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a
      collaborator on the app.


Now, you should be deployed!

## Future State Ideas:
* Reservations Model that connected to a calender functionality
* On SingleRoom or SingleExperience, review form
* Weather API
* pagination + more hotel rooms?

## Code Review
[x] A GitHub organization
[x] A Grace Shopper repository within that org
[x] A project board with tasks assigned
[x] A team contract / norms document
[] A schema design - Kelsey
[x] A working /products page - this means: 
  [x] the express route 
  [x] a working product sequelize model
  [x] a working redux store connected to a React component that you can reach using React router
### Also be ready to talk about:
[x] Team division of labor
[x] Your experience working together
[] Security
[] Overall tier 1 requirements

## Tier 1: MVP Shopping Experience

### As a customer/visitor, I want to be able to:
[] access a deployed version of the website so I can browse and purchase products.
[x] view all available products so I can pick from a variety.
[x] view a single product so I can see more details.
[] add a product to my cart so I can collect my desired products in one place.
[] edit my cart if I change my mind:
[] change the quantity of a product in my cart.
[] remove a product in my cart.
[] No one else should be able to edit my cart except me.
[] "checkout" the items in my cart so I can purchase my desired goods.
[] Think of a typical user experience on popular websites from a guest user and logged-in user perspective.
[] You can just start with by simulating the experience of checking out with a simple confirmation page.
[x] create an account so I can have a logged-in experience.

### As a logged-in customer, I want to be able to:
[] have a persistent cart so I can revisit and pick up where I left off.
[] Logged-in-user across multiple devices: I'm logged in on my mobile device and add some items to my cart. When I open the browser on my laptop and log in, I want to see those items in my cart.
[] No one else should be able to edit my cart except me.

### As an administrator, I want to be able to:
[x] have validated data to ensure reliability.
  * i.e. each customer that creates an account should only be able to do so once with a single email address.
[x] have full rights to make backend requests to add, edit, and remove products.
[] No one else should have access.
[] view user information.
[] No one else should have access.

### As an engineer, I want to:
[] have a well-seeded database so that I am able to simulate a number of different scenarios for the user stories below.
  * By doing this, you really set yourselves up to tackle many of the points throughout the tiers. In the long run, this will save you, potentially, tons of time.
[] For example, seed hundreds of products with dummy data so that when you get to the “pagination” user story, you won’t have to worry about adding more products.
[] Likewise, add a bunch of users with products in their carts so editing the cart can be worked on without already having the “add to cart” functionality built out.
[] user data to be secure so that no one can unrightfully manipulate information.

Things we need build out:
Edit experience page
edit room page
add buttons to single or all experience or room for add, edit, and delete that's only accessible by employee
Cart model
Cart API routes
Cart Component
Cart store
