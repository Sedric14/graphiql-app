/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@mui/material';
import { Sign } from '../../interfaces';
import { useLogInWithEmailAndPassword, useRegisterWithEmailAndPassword } from '../../firebase';
import { ValidationPassword, ValidateEmail } from './validate';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useDict from '../../hooks/useDict';
import InputForm from '../../components/InputForm/InputForm';
import { setSignIn, setSignUp } from '../../store/signSlice';

const SignPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isSignIn } = useAppSelector((state) => state.sign);
  const theme = useAppSelector((state) => state.theme);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Sign>({ reValidateMode: 'onChange', mode: 'onChange' });

  const getDictVal = useDict();
  const { isProcess } = useAppSelector((state) => state.spinner);
  const [registration] = useRegisterWithEmailAndPassword();
  const [login] = useLogInWithEmailAndPassword();

  function onSubmit(data: Sign) {
    if (isSignIn) {
      login(data.email, data.password);
    } else {
      registration(data.email, data.password);
    }
    reset();
  }

  const toggleLink = () => (isSignIn ? dispatch(setSignUp()) : dispatch(setSignIn()));
  return (
    <div
      className="formPage"
      style={
        theme.isDarkMode
          ? {
              background:
                'url("https://raw.githubusercontent.com/Sedric14/assets/main/graphQL/back_GraphQL.jpg")',
            }
          : {
              background:
                'url("https://raw.githubusercontent.com/Sedric14/assets/main/graphQL/wall-light.jpeg")',
              backgroundSize: 'cover',
            }
      }
    >
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        hidden={isProcess}
        style={
          theme.isDarkMode
            ? {}
            : {
                border: '3px solid #1c1c1c',
                backgroundColor: '#0000004d',
                textShadow: '0 0 5px white',
                fontWeight: '800',
              }
        }
      >
        <h2 className="formHead" style={theme.isDarkMode ? {} : { fontWeight: 600 }}>
          {isSignIn ? getDictVal('signin') : getDictVal('signup')}
        </h2>

        <InputForm
          labelName={getDictVal('email')}
          type="email"
          register={register}
          errors={errors}
          name="email"
          validation={ValidateEmail()}
        />
        <InputForm
          labelName={getDictVal('password')}
          type="password"
          register={register}
          errors={errors}
          name="password"
          validation={ValidationPassword()}
        />
        {!isSignIn && (
          <InputForm
            labelName={getDictVal('repeatPassword')}
            type="password"
            register={register}
            errors={errors}
            name="repeatPassword"
            validation={{
              required: { value: true, message: getDictVal('requiredField') },
              validate: (value: string) =>
                watch('password') === value || getDictVal('incorrectPassword'),
            }}
          />
        )}

        <Input className="submit" type="submit" value={getDictVal('send')} />
        <p
          className={theme.isDarkMode ? 'upLink' : 'linkLight'}
          onClick={() => {
            toggleLink();
          }}
        >
          {isSignIn ? getDictVal('signup2') : getDictVal('signin2')}
        </p>
      </form>
    </div>
  );
};

export default SignPage;
