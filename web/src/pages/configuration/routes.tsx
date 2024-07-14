import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AccountPage } from './account-page';

export const ConfigRoutes: React.FC = () => (
  <Routes>
    <Route path="/conta" element={<AccountPage />} />
  </Routes>
);
