import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['src/use-cases/*.spec.ts'],
  },
  plugins: [tsconfigPaths()],
})
