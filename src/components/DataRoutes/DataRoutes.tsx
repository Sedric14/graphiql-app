import React from 'react';
import { Paper, Typography } from '@mui/material';
import { IRootJson } from '../../hooks/useFetchDocRoot';
import useDict from '../../hooks/useDict';

interface IProps {
  data: {
    read(): IRootJson;
  };
}

interface IField {
  name: string;
  description: string;
  kind: string;
}

export default function DataRoutes(props: IProps) {
  const getDictVal = useDict();
  const { data } = props;
  const response = data.read();
  if (
    response &&
    response.data &&
    response.data.__schema &&
    (response.data.__schema.mutationType || response.data.__schema.queryType)
  ) {
    const querySchema = response.data.__schema.queryType || null;
    const mutationsSchema = response.data.__schema.mutationType || null;

    const queryFields: IField[] = [];
    const mutatuionsFields: IField[] = [];

    if (querySchema?.fields && querySchema.fields.length > 0) {
      for (let i = 0; i < querySchema.fields.length; i += 1) {
        const el: IField = { name: '', description: '', kind: '' };
        if (querySchema.fields[i].name) el.name = querySchema.fields[i].name;
        if (querySchema.fields[i].description)
          el.description = querySchema.fields[i].description || '';
        if (querySchema.fields[i].type.name) el.name += `(${querySchema.fields[i].type.name})`;
        if (querySchema.fields[i].type.kind) el.kind = querySchema.fields[i].type.kind || '';
        queryFields.push(el);
      }
    }

    if (mutationsSchema?.fields && mutationsSchema.fields.length > 0) {
      for (let i = 0; i < mutationsSchema.fields.length; i += 1) {
        const el: IField = { name: '', description: '', kind: '' };
        if (mutationsSchema.fields[i].name) el.name = mutationsSchema.fields[i].name;
        if (mutationsSchema.fields[i].description)
          el.description = mutationsSchema.fields[i].description || '';
        if (mutationsSchema.fields[i].type.name)
          el.name += `(${mutationsSchema.fields[i].type.name})`;
        if (mutationsSchema.fields[i].type.kind)
          el.kind = mutationsSchema.fields[i].type.kind || '';
        mutatuionsFields.push(el);
      }
    }

    return (
      <>
        {querySchema && <h5>query: {querySchema.name}</h5>}
        {querySchema?.description && <p>{querySchema?.description}</p>}
        {queryFields.map((el: IField) => (
          <Paper>
            <p>{el.name}</p>
            <p>{el.description}</p>
            <p>{el.kind}</p>
          </Paper>
        ))}

        {mutationsSchema && <h5>mutation: {mutationsSchema.name}</h5>}
        {mutationsSchema?.description && <p>{mutationsSchema?.description}</p>}
        {mutatuionsFields.map((el: IField) => (
          <Paper>
            <p>{el.name}</p>
            <p>{el.description}</p>
            <p>{el.kind}</p>
          </Paper>
        ))}
      </>
    );
  }
  return <Typography>{getDictVal('docNoData')}</Typography>;
}
