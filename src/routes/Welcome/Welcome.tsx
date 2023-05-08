import Button from '@mui/material/Button';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import useDict from '../../hooks/useDict';

export default function WelcomePage() {
  const user = useAppSelector((state) => state.user);
  const signHandler = () => {};
  const { lang } = useAppSelector((state) => state.multiLang);
  const theme = useAppSelector((state) => state.theme);
  const getDictVal = useDict();

  return (
    <main
      className="welcomeWrapper"
      style={
        theme.isDarkMode
          ? {
              background:
                'url("https://raw.githubusercontent.com/Sedric14/assets/main/graphQL/back_GraphQL.jpg")',
            }
          : {
              background:
                'url("https://raw.githubusercontent.com/Sedric14/assets/main/graphQL/wall-light.jpeg")',
            }
      }
    >
      <NavLink to="/sign">
        <Button className="signButton" variant="contained" color="secondary" onClick={signHandler}>
          {user.id ? getDictVal('main') : getDictVal('signin')}
        </Button>
      </NavLink>
      <div className="welcome" style={theme.isDarkMode ? { textShadow: '0 0 5px black' } : {}}>
        <h1 className="welcomeHeadline">GraphiQL</h1>
        <h3>{getDictVal('playgroundText')}</h3>
        <p>{getDictVal('projectText')}</p>
        <p>{getDictVal('developers')}:</p>
        <div className="devs">
          <a
            className={theme.isDarkMode ? 'LinkDark' : 'GitLink'}
            href="https://github.com/Folganoid/"
          >
            {getDictVal('andriiholubkov')}
          </a>
          <a
            className={theme.isDarkMode ? 'LinkDark' : 'GitLink'}
            href="https://github.com/gekalo1025/"
          >
            {getDictVal('romanlysiuk')}
          </a>
          <a
            className={theme.isDarkMode ? 'LinkDark' : 'GitLink'}
            href="https://github.com/sedric14/"
          >
            {getDictVal('olehsadrytskyi')}
          </a>
        </div>
      </div>
    </main>
  );
}
