import React from 'react';

import { Layout } from '@/components/layout';

export const Overview: React.FC = () => (
  <Layout
    alert={{
      message: 'Esta página está em desenvolvimento',
      type: 'warning',
    }}
  />
);