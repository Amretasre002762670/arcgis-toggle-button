import eslintConfig from "@arcgis/eslint-config";
import { gitIgnoreToGlob } from "@arcgis/components-build-utils";
import eslintConfigLumina from "@arcgis/eslint-config/lumina";
import { readGitignoreFiles } from "eslint-gitignore";

export default [
  {
    ignores: [
      // Find all .gitignore and .prettierignore files in any directory outside
      // of node_modules, and make ESLint use them as ignore files
      ...readGitignoreFiles({
        cwd: import.meta.dirname,
        patterns: ["**/.gitignore", "**/.prettierignore", "!**/node_modules/**"],
      }).map(gitIgnoreToGlob),
      // Because of typescript-eslint, files that are not in tsconfig.json can
      // not be in eslint.config.ts
      // See https://typescript-eslint.io/linting/troubleshooting/#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file
      "**/*.js",
    ],
  },
  ...eslintConfig,
  ...eslintConfigLumina,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },

  {
    files: ["packages/**/*.+(spec|test|e2e).+(ts|tsx)", "packages/**/test/**/*.+(ts|tsx)"],
    rules: {
      // Don't restrict imports in tests
      "@typescript-eslint/no-restricted-imports": ["off"],
      // Not useful in tests
      "require-atomic-updates": ["off"],
      // These allowances are useful in tests for checking the values of private properties
      "@typescript-eslint/dot-notation": [
        "error",
        {
          allowPrivateClassPropertyAccess: true,
          allowProtectedClassPropertyAccess: true,
          allowIndexSignaturePropertyAccess: true,
        },
      ],
    },
  },
];
