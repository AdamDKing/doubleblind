import React, {useContext} from 'react';
import {phaseContext} from '../App';
import {BackButton} from '../shared-components/back-button';
import {PHASES} from '../enums';
import {ForwardButton} from '../shared-components/forward-button';
import {Dblnd} from '../interfaces';
import {getPhaseTsxContent} from '../phase-tsx-content';
import {DblndFlowPhaseHelperInstructions} from './dblnd-flow-phase-helper-instructions';

interface DblndFlowPhaseTransitionHelperProps {
  dblnd: Dblnd;
  pcSize: number;
}

/** TransitionHelper Phase Component, experimenter leave the room and helper continues
 *
 * @param props Dblnd experiment info, pill container size
 * @return TSX
 */
export function DblndFlowPhaseTransitionHelper(
    props: DblndFlowPhaseTransitionHelperProps): JSX.Element {
  const {next, back} = useContext(phaseContext);
  return (
    <>
      <BackButton onclick={back} styleclass='experimenterstyle' />
      <div className="frame experimenterhelper">
        {getPhaseTsxContent(PHASES.TRANSITION_HELPER)}
      </div>
      <ForwardButton styleclass='helperstyle' onclick={() =>
        next(<DblndFlowPhaseHelperInstructions {...props}/>)
      } />
    </>
  );
}
