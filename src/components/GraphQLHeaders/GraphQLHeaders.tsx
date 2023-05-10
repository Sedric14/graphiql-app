import React from 'react';
import { EditorView } from '@codemirror/view';
import { json, jsonLanguage, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import cl from './GraphQLHeaders.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeHeaders } from '../../store/graphQLSlice';
import Codemirror from '../CodeMirror/Codemirror';

const fixedHeightEditor = EditorView.theme({
  '&': { height: '10vh' },
  '.cm-scroller': { overflow: 'auto' },
});
const linterExtension = linter(jsonParseLinter());
export default function GraphQLHeaders() {
  const { headers } = useAppSelector((state) => state.graphQL);
  const dispatch = useAppDispatch();

  const handlerClick = (value: string | undefined) => {
    if (value) {
      dispatch(changeHeaders(value));
    }
  };

  return (
    <section className={cl.headers}>
      <h5 className={cl.headers__btn}>Headers</h5>
      <Codemirror
        editor={false}
        onChange={handlerClick}
        value={headers}
        extensions={[fixedHeightEditor, linterExtension, json(), jsonLanguage]}
      />
    </section>
  );
}
