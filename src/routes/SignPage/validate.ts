import useDict from '../../hooks/useDict';

const ValidateEmail = () => {
  const getDictVal = useDict();
  return {
    required: {
      value: true,
      message: getDictVal('requiredField'),
    },
    pattern: {
      value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: getDictVal('correctEmail'),
    },
  };
};

const ValidationPassword = () => {
  const getDictVal = useDict();
  return {
    required: {
      value: true,
      message: getDictVal('requiredField'),
    },
    minLength: {
      value: 8,
      message: getDictVal('minLengthPassword'),
    },
    maxLength: {
      value: 15,
      message: getDictVal('maxLengthPassword'),
    },
    validate: {
      hasNumber: (value: string) => /[0-9]+/gm.test(value) || getDictVal('minOneNumberPassword'),
      hasLetter: (value: string) => /[A-Z]+/gim.test(value) || getDictVal('minOneLetterPassword'),
      hasSpecialChar: (value: string) =>
        /[-#!$@%^&*_+~=:;?/]+/gm.test(value) || getDictVal('minOneSpecialCharPassword'),
    },
  };
};

export { ValidationPassword, ValidateEmail };
