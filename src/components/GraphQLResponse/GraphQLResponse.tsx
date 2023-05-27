import React from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { useAppSelector } from '../../hooks/redux';
import normalizeData from '../../helpers/normalizeData';
import Codemirror from '../CodeMirror/Codemirror';
import Spinner from '../Spinner/Spinner';
import useDict from '../../hooks/useDict';

export default function GraphQLResponse() {
  const { error, data, isLoading } = useAppSelector((state) => state.graphQL);
  const getDictVal = useDict();

  return (
    <>
      {isLoading && <Spinner />}
      <section className="response">
        <h5 className="respHeader">{getDictVal('titleResponse')}</h5>
        <Codemirror
          editor
          onChange={() => {}}
          value={error ? normalizeData(error) : normalizeData(data)}
          extensions={[
            EditorState.readOnly.of(true),
            EditorView.theme({
              '&': { height: '78vh' },
              '.cm-scroller': { overflow: 'auto' },
              '.cm-gutters': { display: 'none' },
            }),
            javascript({ jsx: true }),
            darcula,
          ]}
        />
      </section>
    </>
  );
}
