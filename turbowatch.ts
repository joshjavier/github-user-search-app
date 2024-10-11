import { defineConfig } from 'turbowatch'

export default defineConfig({
  project: __dirname,
  triggers: [
    {
      expression: ['match', '*.css', 'basename'],
      name: 'build',
      onChange: async ({ spawn }) => {
        await spawn`npx lightningcss --bundle --browserslist css/main.css -o public/style.css`;
      },
    },
  ],
})
