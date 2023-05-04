import React, { Suspense } from 'react';
import GraphQLRoute from '../../components/GraphQLRoute/GraphQLRoute';
import GraphQLEditor from '../../components/GraphQLEditor/GraphQLEditor';
// import GraphQLDocs from '../../components/GraphQLDocs/GraphQLDocs';
import GraphQLResponse from '../../components/GraphQLResponse/GraphQLResponse';
import { useAppSelector } from '../../hooks/redux';

export default function Main() {
  const theme = useAppSelector((state) => state.theme);
  return (
    <main
      className="main"
      style={
        theme.isDarkMode
          ? {
              background:
                'url("https://raw.githubusercontent.com/Sedric14/assets/main/graphQL/back_GraphQL.jpg")',
            }
          : {
              background:
                'url("https://raw.githubusercontent.com/Sedric14/assets/main/graphQL/wall-light.jpg")',
            }
      }
    >
      <GraphQLRoute />
      <GraphQLEditor />
      <Suspense fallback={<p>Loading...</p>}>
        <GraphQLResponse />
      </Suspense>
      {/* <GraphQLDocs /> */}
    </main>
  );
}
