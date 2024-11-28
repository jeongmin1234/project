module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'plugin:react/recommended',
      'airbnb',
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    globals: {
      kakao: 'readonly', // kakao 객체를 전역에서 사용할 수 있도록 설정
    },
    rules: {
      'no-undef': 'off', // no-undef 경고를 끄거나 필요한 규칙을 설정
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    },
  };
  