import { useContext } from 'react';
import { CheckedContext, ICheckedContext } from '@_context/CheckedStateContext';

function useCheckedContext(): ICheckedContext {
  const context = useContext(CheckedContext);
  if (!context) {
    throw new Error('useCheckedContext must be used within a CheckedProvider');
  }
  return context;
}

export default useCheckedContext;
