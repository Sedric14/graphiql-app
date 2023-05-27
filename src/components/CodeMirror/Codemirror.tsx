import React, { useEffect } from 'react';
import { Extension } from '@codemirror/state';
import { lintGutter } from '@codemirror/lint';
import useCodeMirror from '../../hooks/useCodeMirror';
import onUpdate from './on-update';

type CodeMirrorProps = {
  value: string | undefined;
  onChange: (value: string | undefined) => void | undefined;
  extensions: Extension[];
  editor?: boolean | undefined;
};

function CodeMirror({ value, onChange, extensions, editor }: CodeMirrorProps) {
  const { ref, view } = useCodeMirror(
    [onUpdate(onChange), lintGutter(), ...extensions],
    editor as boolean,
  );

  useEffect(() => {
    if (view) {
      const editorValue = view.state.doc.toString();

      if (value !== editorValue) {
        view.dispatch({
          changes: {
            from: 0,
            to: editorValue.length,
            insert: value || '',
          },
        });
      }
    }
  }, [value, view]);

  return <div ref={ref} />;
}
CodeMirror.defaultProps = {
  editor: true,
};
export default CodeMirror;
