import * as Types from "../../generated-types/generated-types/graphql";
import * as gm from "graphql-modules";
export namespace RecipeModule {
  interface DefinedFields {
    Query: 'recipe' | 'recipes';
    Recipe: 'id' | 'title' | 'description' | 'instructions' | 'ingredients' | 'image_url' | 'author' | 'created_at' | 'updated_at';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Recipe = Pick<Types.Recipe, DefinedFields['Recipe']>;
  export type User = Types.User;
  export type DateTime = Types.DateTime;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type RecipeResolvers = Pick<Types.RecipeResolvers, DefinedFields['Recipe'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Recipe?: RecipeResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      recipe?: gm.Middleware[];
      recipes?: gm.Middleware[];
    };
    Recipe?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      title?: gm.Middleware[];
      description?: gm.Middleware[];
      instructions?: gm.Middleware[];
      ingredients?: gm.Middleware[];
      image_url?: gm.Middleware[];
      author?: gm.Middleware[];
      created_at?: gm.Middleware[];
      updated_at?: gm.Middleware[];
    };
  };
}