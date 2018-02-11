import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
  JwtService
} from '../app/shared';

@NgModule({
  exports: [
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {

  constructor(
    private _apollo: Apollo,
    private _httpLink: HttpLink,
    private _jwtService: JwtService,
  ) {

    const uri = 'http://localhost:4040/graphql';
    const http = _httpLink.create({ uri });

    const auth = setContext((_, { headers }) => {
    
      const token = _jwtService.getToken();

      let header = new HttpHeaders();
    
      if (!token) {
        return {};
      } else {
        return {
          headers: header.append('Authorization', `Bearer ${token}`)
        };
      }
    });

    _apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache()
    });
  }
}
