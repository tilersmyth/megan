import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';


@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {

  constructor(apollo: Apollo, httpLink: HttpLink) {

    const uri = 'http://localhost:4040/graphql';
    const http = httpLink.create({ uri });

    apollo.create({
      link: http,
      cache: new InMemoryCache()
    });
  }
}