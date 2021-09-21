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
  // lets put some functionality here before splitting it out
  // into a middle layer
  // maybe higher order?
  // I want (1) testable function components, determined by props
  // and (2) simple, straightforward, back + forward functionality
  // I *dont* want a bunch of useful mutable state packaged up for the entire
  // flow. Distinct steps (function calls), immutable data.
  // Some phases have mutable data internally though (the formik)

  // This whole approach may have been a mistake.  I think I'll leave it
  // and make progress elsewhere.  Will return when it causes bugs.


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

