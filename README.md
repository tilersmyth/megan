<p align="center">
  <img  alt="Tipe" src="https://user-images.githubusercontent.com/8736328/35539944-993f103e-0521-11e8-9e89-59ecb2d677d1.jpg" class="img-responsive">
</p>

___

# MEGAN boilerplate


> Combining the awesome frontend repo, [Angular Starter](https://github.com/gdi2290/angular-starter), with the awesome backend repo, [express-mongoose-es6-rest-api](https://github.com/KunalKapadia/express-mongoose-es6-rest-api), and throwing in some [GraphQL](http://graphql.org/) magic to create a modern full-stack starter. 

This README will be updated soon, but here a few noteworthy points about this repo:
* [Docker](https://www.docker.com/) is used to run this project and keep everything working in harmony.  
* The frontend is served via [NGINX](https://www.nginx.com/) reverse proxy.
* [GraphQL](http://graphql.org/) is used as the API query language.
* Simple user authentication is included.
* More to come soon...


### Quick start
**Reminder: this project requires Docker to run properly. However, limited Docker knowledge should suffice.**


```bash
# clone our repo
git clone https://github.com/tilersmyth/megan.git

# move into project's client directory
cd megan/client

# install frontend dependencies
npm install

# move into project's server directory
cd ../server

# install backend dependencies
yarn

# set environment vars
cp .env.example .env

# back to root (megan directory)
cd ..

# start project with Docker
docker-compose up --build

```
go to [http://localhost](http://localhost) in your browser

### GraphiQL
Access the in-browser GraphQL IDE at [http://localhost:4040/graphiql](http://localhost:4040/graphiql)
___

Again, credit goes to [Angular Starter](https://github.com/gdi2290/angular-starter) and [express-mongoose-es6-rest-api](https://github.com/KunalKapadia/express-mongoose-es6-rest-api) for the great foundation that this project is built upon.

___

# License
 [MIT](/LICENSE)
