import * as Types from "../../generated-types/generated-types/graphql";
import * as gm from "graphql-modules";
export namespace BaseModule {
  interface DefinedFields {
    Query: ;
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
    };
  };
}