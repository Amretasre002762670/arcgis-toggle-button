const autoFix = !process.env.ESRI_NO_AUTOFIX_LINT_ERRORS;

const prettierCommand = `prettier ${autoFix ? "--write" : "--check"}`;

export default {
  "*.{ts,tsx}": [`eslint --config eslint.config.js ${autoFix ? "--fix" : ""}`, prettierCommand],
  "*.{css,scss,js,md,mdx,json,yml,yaml,json,html}": prettierCommand,
};
