import React from 'react';
import {DblndFlow} from './layout-components/dblnd-flow';
import {Header} from './layout-components/header';

/** Doubleblind.me react application
 *
 * App is the root.  It should contain very little, but at the moment it contains
 * all the phase machinery, which should live elsewhere.  Still thinking about the
 * organization.
 *
 * @returns React App
 */
function App() {
  // const leavePageWarning = (e: BeforeUnloadEvent) => {
  //   e.preventDefault();
  //   e.returnValue = 'Are you sure you want to leave? All progress will be lost.';
  //   return e.returnValue;
  // };
  // useEffect(() => {
  //   window.addEventListener('beforeunload', leavePageWarning);
  //   return () => {
  //     window.removeEventListener('beforeunload', leavePageWarning);
  //   };
  // });

  return (
    <>
      <Header />
      <DblndFlow />
    </>
  );
}

export default App;

interface PhaseContext {
  next: (component: JSX.Element) => void;
  back: () => void;
}
export const phaseContext = React.createContext<PhaseContext>({next: (c) => {}, back: () => {}});
