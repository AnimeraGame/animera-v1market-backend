module.exports = {
  plugins: ['prettier', 'import'],
  extends: [
    'eslint:recommended',
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'max-len': [
      1,
      {
        code: 110,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/require-await': 'off',
    'no-restricted-syntax': 'off',
    'max-classes-per-file': 'off',
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'import/no-cycle': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'function-paren-newline': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    'react/jsx-one-expression-per-line': 'off',
    '@typescript-eslint/indent': 'off',
    'react/jsx-filename-extension': 'off'
  }
};
