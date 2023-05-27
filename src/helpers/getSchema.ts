import { GraphQLSchema, buildClientSchema, getIntrospectionQuery } from 'graphql';

export default async function getSchema(url: string): Promise<GraphQLSchema | unknown> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });
    const graphqlSchemaObj = buildClientSchema((await response.json()).data);
    return graphqlSchemaObj;
  } catch (error) {
    return error;
  }
}
