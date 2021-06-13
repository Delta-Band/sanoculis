import React from 'react';

const ReadyStateContext = React.createContext();
const ReadyUpdaterContext = React.createContext();

function ReadyProvider(props) {
  const [ready, setReady] = React.useState(true);
  return (
    <ReadyStateContext.Provider value={ready}>
      <ReadyUpdaterContext.Provider value={setReady}>
        {props.children}
      </ReadyUpdaterContext.Provider>
    </ReadyStateContext.Provider>
  );
}

function useReadyState() {
  const readyState = React.useContext(ReadyStateContext);
  if (typeof readyState === 'undefined') {
    throw new Error('useReadyState must be used within a ReadyProvider');
  }
  return readyState;
}

function useReadyUpdater() {
  const setReady = React.useContext(ReadyUpdaterContext);
  if (typeof setReady === 'undefined') {
    throw new Error('useReadyUpdater must be used within a ReadyProvider');
  }
  const isReady = React.useCallback((bool) => {
    return setReady(
      (state) => {
        return bool;
      },
      [setReady]
    );
  });
  return isReady;
}

export { ReadyProvider, useReadyState, useReadyUpdater };
