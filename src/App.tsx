import React, {useState} from 'react';
import {DblndFlowPhaseIntro} from './flow-phases/dblnd-flow-phase-intro';

interface PhaseContext {
  next: (component: JSX.Element) => void;
  back: () => void;
}

export const phaseContext = React.createContext<PhaseContext>({next: (c) => {}, back: () => {}});

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

  // eslint-disable-next-line no-unused-vars
  const [priorPhaseComponents, setPriorPhaseComponents] = useState<JSX.Element[]>([]);
  const [activePhaseComponent, setActivePhaseComponent] =
    useState<JSX.Element>();


  // two functions to pass down to children, used for onClicks
  const provideNextPhaseComponent = (component: JSX.Element) => {
    setActivePhaseComponent((oldAPC) => {
      setPriorPhaseComponents((oldPPC) =>
        oldAPC ?
        oldPPC.concat([oldAPC]) :
        oldPPC.slice(),
      );
      return component;
    });
  };
  const goBackPhaseComponent = () => {
    setPriorPhaseComponents((oldPPC) => {
      const lastComponent = oldPPC[oldPPC.length-1];
      setActivePhaseComponent((oldAPS) =>
        lastComponent,
      );
      return oldPPC.slice(0, oldPPC.length-1);
    });
  };

  // can't put this as initial value in useState,
  // because func not yet declared
  if (!activePhaseComponent) {
    provideNextPhaseComponent(
        <DblndFlowPhaseIntro />,
    );
  }

  return (
    <>
      <header>
        <div className="logo unselectable">
          doubleblind.me
        </div>

      </header>
      <div className="dblndapp">
        <phaseContext.Provider
          value={{next: provideNextPhaseComponent, back: goBackPhaseComponent}}>
          {activePhaseComponent}
        </phaseContext.Provider>
      </div>
    </>
  );
}

export default App;
