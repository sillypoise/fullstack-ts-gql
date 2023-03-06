import * as Types from "../../generated-types/generated-types/graphql";
import * as gm from "graphql-modules";
export namespace UserModule {
  interface DefinedFields {
    Query: 'user';
    User: 'id' | 'username' | 'email' | 'password' | 'created_at' | 'updated_at' | 'is_admin';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type User = Pick<Types.User, DefinedFields['User']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    User?: UserResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      user?: gm.Middleware[];
    };
    User?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      username?: gm.Middleware[];
      email?: gm.Middleware[];
      password?: gm.Middleware[];
      created_at?: gm.Middleware[];
      updated_at?: gm.Middleware[];
      is_admin?: gm.Middleware[];
    };
  };
}