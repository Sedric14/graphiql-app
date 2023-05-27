interface IDictionary {
  [index: string]: {
    [index: string]: string;
  };
}

const dictionary: IDictionary = {
  EN: {
    // Header
    menu: 'Menu',
    welcome: 'Welcome',
    signout: 'Sign out',

    // Footer
    authors: 'Authors',
    dark: 'Dark',
    light: 'Light',

    // graphQL Route section
    changeRoute: 'Change Route',
    placeholderRoute: 'Enter route graphQL',

    // graphQL Editor section
    btnGetResponse: 'Get Response',
    descriptionEditors: '# Auto Complete: Ctrl-Space or just start typing',

    // graphQL Query Variables section
    titleQueryVariables: 'Query Variables',

    // graphQL Headerssection
    titleHeaders: 'Headers',

    // graphQL Responsessection
    titleResponse: 'Response',

    // welcome page
    signin: 'SIGN IN',
    main: 'MAIN',
    developers: 'Developers',
    andriiholubkov: 'Andrii Holubkov',
    romanlysiuk: 'Roman Lysiuk',
    olehsadrytskyi: 'Oleh Sadrytskyi',
    playgroundText: 'Playground for graphQL requests',
    projectText: 'This project was created as the final task of the RSSchool React',

    // 404
    error404: 'page not found...',
    errorSys: 'System Error! Please contact with support...',

    // sign page
    signup: 'SIGN UP',
    signup2: 'Sign up',
    signin2: 'Sign in',
    email: 'Email',
    requiredField: 'This field is required',
    password: 'Password',
    repeatPassword: 'Repeat Password',
    send: 'SEND',
    successLogin: 'Successful login',
    successRegistration: 'Registration completed successfully',
    incorrectPassword: 'Your passwords do no match',
    enterEmail: 'Please enter your Email',
    correctEmail: 'Please enter correct Email',
    minLengthPassword: 'Password minimum 8 characters',
    maxLengthPassword: 'Password maximum 15 characters',
    minOneLetterPassword: 'Password must contain at least one letter',
    minOneNumberPassword: 'Password must contain at least one number',
    minOneSpecialCharPassword:
      'At least one special character from the list : - # ! $ @ % ^ & * _ + ~ = : ; ? / ',

    enterPassword: 'Please enter your Password',
    correctPassword: 'Please enter correct Password',

    // Doc GraphQL Section
    docs: 'Docs',
    docClosePanel: 'Close Panel',
    docTitle: 'Documentation Explorer',
    docDesc: 'A GraphQL schema provides a root type for each kind of operation.',
    docGetRootSchema: 'Get root schema',
    docNoData: 'No Data...',
    docFields: 'fields',
    docName: 'name',
    docModel: 'model',
    docDescription: 'description',
    docType: 'type',
    docArgs: 'Arguments',

    // Firebase Error
    emailAlreadyInUse: 'Email already in use',
    IncorrectPassword: 'Incorrect password',
    userNotFound: 'User is not found',
  },
  UA: {
    // header
    menu: 'Меню',
    welcome: 'Ласкаво просимо',
    signout: 'Вихід',

    // Footer
    authors: 'Автори',
    dark: 'Темна',
    light: 'Свiтла',

    // graphQL Route section
    changeRoute: 'Змінити адресу',
    placeholderRoute: 'Введіть адресу GraphQL',

    // graphQL Editor section
    btnGetResponse: 'Отримати відповідь',
    descriptionEditors: '# Автозаповнення: Ctrl-Пробіл або просто почніть вводити',

    // graphQL Query Variables section
    titleQueryVariables: 'Змінні запиту',

    // graphQL Headerssection
    titleHeaders: 'Заголовки',

    // graphQL Responsessection
    titleResponse: 'Відповідь',

    // welcome page
    signin: 'УВIЙТИ',
    main: 'ГОЛОВНА',
    developers: 'Розробники',
    andriiholubkov: 'Андрiй Голубков',
    romanlysiuk: 'Роман Лисюк',
    olehsadrytskyi: 'Oлeг Садрицький',
    playgroundText: 'Майданчик для запитів graphQL',
    projectText: 'Цей проект був створений як фінальне завдання RSSchool React',

    // 404
    error404: 'сторiнка не знайдена...',
    errorSys: 'Системна помилка! Зверніться до служби підтримки...',

    // sign page
    signup: 'ЗАРЕЄСТРУВАТИСЬ',
    signup2: 'Зареєструватися',
    signin2: 'Увiйти',
    email: 'Пошта',
    password: 'Пароль',
    repeatPassword: 'Повторiть пароль',
    requiredField: "Це поле є обов'язковим для заповнення",
    send: 'НАДIСЛАТИ',
    successLogin: 'Успішний вхід',
    successRegistration: 'Реєстрація пройшла успішно',
    incorrectPassword: 'Пароль не співпадає',
    enterEmail: 'Будь ласка, введіть Email',
    correctEmail: 'Будь ласка, введіть валiдний Email',
    minLengthPassword: 'Пароль щонайменше з 8 символів',
    maxLengthPassword: 'Максимальна довжина паролю 15 символів',
    minOneLetterPassword: 'Пароль повинен містити хоча б одну букву',
    minOneNumberPassword: 'Пароль повинен містити хоча б одну цифру',
    minOneSpecialCharPassword:
      'Принаймні один спеціальний символ зі списку : - # ! $ @ % ^ & * _ + ~ = : ; ? / ',
    enterPassword: 'Будь ласка, введіть свій пароль',
    correctPassword: 'Будь ласка, введіть валiдний пароль',

    // Doc GraphQL Section
    docs: 'Документ',
    docClosePanel: 'Закрити панель',
    docTitle: 'Провідник документації',
    docDesc: 'Схема GraphQL надає кореневий тип для кожного виду операції.',
    docGetRootSchema: 'Отримати кореневу схему',
    docNoData: 'Немає даних...',
    docFields: 'поля',
    docName: 'назва',
    docModel: 'модель',
    docDescription: 'опис',
    docType: 'тип',
    docArgs: 'Аргументи',

    // Firebase Error
    emailAlreadyInUse: 'Електронна пошта вже використовується',
    IncorrectPassword: 'Неправильний пароль',
    userNotFound: 'Користувач не знайдений',
  },
};

export default dictionary;
