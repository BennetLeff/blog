import type { CollectionConfig } from 'payload'

export const PageViews: CollectionConfig = {
  slug: 'page_views',
  labels: {
    singular: 'Page View',
    plural: 'Visitor Analytics',
  },
  defaultSort: '-createdAt',
  admin: {
    useAsTitle: 'path',
    defaultColumns: ['path', 'ip', 'city', 'country', 'referrer', 'createdAt'],
    description: '📊 Visual Traffic Dashboard available at /analytics',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'path',
      type: 'text',
      required: true,
      admin: {
        description: 'Page or essay path visited (e.g. /posts/hurdy-gurdy-simulator)',
      },
    },
    {
      name: 'ip',
      type: 'text',
      admin: {
        description: 'Visitor IP address',
      },
    },
    {
      name: 'city',
      type: 'text',
      admin: {
        description: 'City detected from IP geolocation',
      },
    },
    {
      name: 'country',
      type: 'text',
      admin: {
        description: 'Country code (e.g. US, DE, GB)',
      },
    },
    {
      name: 'region',
      type: 'text',
      admin: {
        description: 'State / Region code (e.g. CA, NY)',
      },
    },
    {
      name: 'referrer',
      type: 'text',
      admin: {
        description: 'Referring website (e.g. twitter.com, news.ycombinator.com, github.com)',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: {
        description: 'Browser and operating system user agent',
      },
    },
    {
      name: 'ipHash',
      type: 'text',
      admin: {
        description: 'Anonymized visitor identifier for counting unique visitors',
      },
    },
    {
      name: 'latitude',
      type: 'number',
    },
    {
      name: 'longitude',
      type: 'number',
    },
  ],
}
