import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';

const TransferNavigator = React.lazy(() => import('transfer/Navigator'));

const TransferScreen = () => {
  return (
    <ErrorBoundary name="TransferScreen">
      <React.Suspense
        fallback={<Placeholder label="Transfer" icon="swap-horiz" />}
      >
        <TransferNavigator />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default TransferScreen;
