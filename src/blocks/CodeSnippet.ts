import type { Block } from 'payload'

export const CodeSnippetBlock: Block = {
  slug: 'Code',
  labels: {
    singular: 'Code Snippet',
    plural: 'Code Snippets',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'language',
          type: 'select',
          defaultValue: 'typescript',
          options: [
            { label: 'TypeScript', value: 'typescript' },
            { label: 'JavaScript', value: 'javascript' },
            { label: 'Python', value: 'python' },
            { label: 'Rust', value: 'rust' },
            { label: 'Go', value: 'go' },
            { label: 'C / C++', value: 'cpp' },
            { label: 'Bash / Shell', value: 'bash' },
            { label: 'SQL', value: 'sql' },
            { label: 'JSON', value: 'json' },
            { label: 'YAML', value: 'yaml' },
            { label: 'TOML', value: 'toml' },
            { label: 'Markdown', value: 'markdown' },
            { label: 'HTML / XML', value: 'html' },
            { label: 'CSS', value: 'css' },
            { label: 'Diff / Patch', value: 'diff' },
            { label: 'Dockerfile', value: 'dockerfile' },
            { label: 'Plain Text', value: 'text' },
          ],
          admin: {
            width: '50%',
            description: 'Programming language for syntax highlighting',
          },
        },
        {
          name: 'filename',
          type: 'text',
          admin: {
            width: '50%',
            placeholder: 'e.g. src/utils.ts (optional)',
            description: 'Optional file path or name header',
          },
        },
      ],
    },
    {
      name: 'code',
      type: 'code',
      required: true,
      admin: {
        language: 'typescript',
        description: 'Directly paste or type multiline code snippet here',
      },
    },
  ],
}
