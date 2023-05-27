import dictionary from '../data/dictionary';
import { useAppSelector } from './redux';

export default function useDict() {
  const { lang } = useAppSelector((state) => state.multiLang);
  const getDictVal = (val: string): string => {
    let res = '?????';
    if (dictionary[lang] && dictionary[lang][val]) res = dictionary[lang][val];
    return res;
  };

  return getDictVal;
}
