import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';

const CaNavigator = React.lazy(() => import('ca/Navigator'));

const CaScreen = () => {
  return (
    <ErrorBoundary name="CaScreen">
      <React.Suspense
        fallback={<Placeholder label="CA" icon="account-balance" />}
      >
        <CaNavigator />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default CaScreen;
