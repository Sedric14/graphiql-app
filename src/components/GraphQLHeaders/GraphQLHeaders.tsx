/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import useDict from '../../hooks/useDict';

const linterExtension = linter(jsonParseLinter());
export default function GraphQLHeaders() {
  const [hide, setHide] = useState(false);
  const fixedHeightEditor = EditorView.theme({
    '&': { height: '10vh' },
    '.cm-scroller': { overflow: 'auto' },
  });
  const { headers } = useAppSelector((state) => state.graphQL);
  const dispatch = useAppDispatch();
  const getDictVal = useDict();

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
      <div className={cl.headers__headWrap} onClick={click}>
        <h5 className={cl.headers__header}>{getDictVal('titleHeaders')}</h5>
        <button className={cl.headers__btn}>{hide ? '▲' : '▼'}</button>
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
