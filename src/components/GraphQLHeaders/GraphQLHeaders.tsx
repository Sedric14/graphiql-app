import React, { useState } from 'react';
import { EditorView } from '@codemirror/view';
import { json, jsonLanguage, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import { javascript } from '@codemirror/lang-javascript';
import { darcula } from '@uiw/codemirror-theme-darcula';
import cl from './GraphQLHeaders.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeHeaders } from '../../store/graphQLSlice';
import Codemirror from '../CodeMirror/Codemirror';

const linterExtension = linter(jsonParseLinter());
export default function GraphQLHeaders() {
  const [hide, setHide] = useState(false);
  const fixedHeightEditor = EditorView.theme({
    '&': { height: '10vh' },
    '.cm-scroller': { overflow: 'auto' },
  });
  const { headers } = useAppSelector((state) => state.graphQL);
  const dispatch = useAppDispatch();

  const handlerClick = (value: string | undefined) => {
    if (value) {
      dispatch(changeHeaders(value));
    }
  };

  function click() {
    setHide(!hide);
  }

  return (
    <section className={cl.headers}>
      <div className={cl.headers__headWrap}>
        <h5 className={cl.headers__header}>Headers</h5>
        <button className={cl.headers__btn} onClick={click}>
          {hide ? '▲' : '▼'}
        </button>
      </div>
      {!hide ? (
        <div />
      ) : (
        <Codemirror
          editor={false}
          onChange={handlerClick}
          value={headers}
          extensions={[
            fixedHeightEditor,
            linterExtension,
            json(),
            jsonLanguage,
            javascript({ jsx: true }),
            darcula,
          ]}
        />
      )}
    </section>
  );
}
