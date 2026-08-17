import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'status'],
    defaultSort: '-publishedAt',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Automatically populate publishedAt on publish if not manually set
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly identifier for the post',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Publication timestamp (used for sorting and displaying newest posts first)',
      },
    },
    {
      name: 'date',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Custom display date override, e.g. "Aug 2026"',
      },
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'e.g. "Tinkering", "Architecture", "AI / Math"',
      },
    },
    {
      name: 'readingTime',
      type: 'text',
      defaultValue: '5 min read',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'published',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
