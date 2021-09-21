import React, {useState} from 'react';
import {phaseContext} from '../App';
import {DblndFlowPhaseIntro} from '../flow-phases/dblnd-flow-phase-intro';

interface DblndFlowProps {
}

/** Dblnd flow that contains central app functionality
 *
 * Wrapper that contains all the parts of the app that walk
 * users through a double blinding process
 *
 * @param props empty props
 * @returns tsx
 */
export function DblndFlow(props: DblndFlowProps) {
  // eslint-disable-next-line no-unused-vars
  const [priorPhaseComponents, setPriorPhaseComponents] = useState<JSX.Element[]>([]);
  const [activePhaseComponent, setActivePhaseComponent] =
      useState<JSX.Element>();

  // two functions to pass down via context, used for onClicks
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
  return <div className="dblndapp">
    <phaseContext.Provider
      value={{next: provideNextPhaseComponent, back: goBackPhaseComponent}}>
      {activePhaseComponent}
    </phaseContext.Provider>
  </div>;
}
