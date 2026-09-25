import { defineConfig, globalIgnores } from "eslint/config"
import { FlatCompat } from "@eslint/eslintrc"
import { fileURLToPath } from "node:url"

const compat = new FlatCompat({
  baseDirectory: fileURLToPath(new URL(".", import.meta.url)),
})

const eslintConfig = defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
])

export default eslintConfig
