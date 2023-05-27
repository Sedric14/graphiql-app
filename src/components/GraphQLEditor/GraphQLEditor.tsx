import React, { useEffect, useState } from 'react';
import { EditorView } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { darcula } from '@uiw/codemirror-theme-darcula';
import cl from './graphQLEditor.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import GraphQLVariables from '../GraphQLVariables/GraphQLVariables';
import sendQueryRequestGraphQL from '../../GraphQL/RequestGraphQL';
import GraphQLHeaders from '../GraphQLHeaders/GraphQLHeaders';
import Codemirror from '../CodeMirror/Codemirror';
import { changeErrors } from '../../store/graphQLSlice';
import { addMessage } from '../../store/sysMessengerSlice';
import useDict from '../../hooks/useDict';

export default function GraphQLEditor() {
  const getDictVal = useDict();
  const initialValueGraphQL = `${getDictVal('descriptionEditors')}
query($page:Int,$name:String) {
  characters(page: $page, filter: { name: $name}) {
    info {
      count
    }
    results {
      name
    }
  }
}`;
  const defaultInitialValueGraphQL = `${getDictVal('descriptionEditors')}
query{
  __schema {
    types {
      name
    }

  }
}
`;
  const fixedHeightEditor = EditorView.theme({
    '&': { height: '75vh' },
    '.cm-scroller': { overflow: 'auto' },
  });

  const { url: GraphQLRoute, variables, headers } = useAppSelector((state) => state.graphQL);
  const [valueMonaco, setValueMonaco] = useState<string>(initialValueGraphQL);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (GraphQLRoute !== import.meta.env.VITE_API_DEFAULT_GRAPHQL) {
      setValueMonaco(defaultInitialValueGraphQL);
    } else {
      setValueMonaco(initialValueGraphQL);
    }
  }, [GraphQLRoute, defaultInitialValueGraphQL, initialValueGraphQL]);

  const handlerChangeEditor = (value: string = '') => {
    setValueMonaco(value);
  };
  const handlerGetResponseBtn = () => {
    let variablesValid: { [key: string]: string } | undefined;
    let headersValid: { [key: string]: string } | undefined;

    try {
      variablesValid = JSON.parse(variables);
    } catch (error) {
      variablesValid = undefined;
      if (error instanceof Error) {
        dispatch(changeErrors(`${error.name} in Variables GraphQL:${error.message}`));
        dispatch(
          addMessage({ type: 'error', message: `Variables GraphQL ERROR: ${error.message}` }),
        );
      }
    }

    try {
      headersValid = JSON.parse(headers);
    } catch (error) {
      headersValid = undefined;
      if (error instanceof Error) {
        dispatch(changeErrors(`${error.name} in Headers GraphQL:${error.message}`));
        dispatch(addMessage({ type: 'error', message: `Headers GraphQL ERROR: ${error.message}` }));
      }
    }

    if (variablesValid && headersValid) {
      dispatch(
        sendQueryRequestGraphQL({
          url: GraphQLRoute,
          queryRequest: valueMonaco as string,
          variables: variablesValid,
          headers: headersValid,
        }),
      )
        .then((data) => {
          if (data.meta.requestStatus === 'rejected' && data.payload.message) {
            dispatch(addMessage({ type: 'error', message: data.payload.message }));
          } else if (data.meta.requestStatus === 'rejected' && data.payload.extensions.code) {
            dispatch(addMessage({ type: 'error', message: data.payload.extensions.code }));
          } else if (data.meta.requestStatus === 'fulfilled') {
            dispatch(addMessage({ type: 'success', message: 'Request fulfilled' }));
          }
        })
        .catch((err) => {
          dispatch(addMessage({ type: 'error', message: `Request ERROR: ${err.message}` }));
        });
    }
  };

  return (
    <section className={cl.editor} id="graphql-editor">
      <div className={cl.editor__editBlock}>
        <Codemirror
          value={valueMonaco}
          onChange={handlerChangeEditor}
          extensions={[fixedHeightEditor, javascript({ jsx: true }), darcula]}
        />
        <button className={cl.editor__button} onClick={handlerGetResponseBtn}>
          {getDictVal('btnGetResponse')}
        </button>
      </div>
      <div className={cl.editor__settingRow}>
        <GraphQLVariables />
        <GraphQLHeaders />
      </div>
    </section>
  );
}
