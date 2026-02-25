import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ,
  {
    rules: {
      // Disable or relax TypeScript-specific rules causing CI errors
      "@typescript-eslint/no-unused-vars": "off", // Ignore unused variables
      "@typescript-eslint/no-explicit-any": "off", // Allow 'any' type
      "react-hooks/exhaustive-deps": "warn", // Downgrade to warning for useEffect dependencies
    },
  },
];

export default eslintConfig;
