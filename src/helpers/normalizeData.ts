export default function normalizeData(data: JSON | string | null) {
  return JSON.stringify(data, null, '\t').replace('null', '');
}
