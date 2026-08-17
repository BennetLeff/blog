import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'date', 'status'],
  },
  access: {
    read: () => true,
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
      name: 'date',
      type: 'text',
      admin: {
        description: 'Display date, e.g. "Aug 2026"',
      },
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'e.g. "AI / Math", "Systems", "Design"',
      },
    },
    {
      name: 'readingTime',
      type: 'text',
      defaultValue: '5 min read',
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
