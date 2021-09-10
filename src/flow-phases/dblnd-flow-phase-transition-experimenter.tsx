import React, {useContext} from 'react';
import {phaseContext} from '../App';
import {BackButton} from '../shared-components/back-button';
import {PHASES} from '../enums';
import {ForwardButton} from '../shared-components/forward-button';
import {Dblnd} from '../interfaces';
import {getPhaseTsxContent} from '../phase-tsx-content';
import {DblndFlowPhaseExperimenterInstructions} from './dblnd-flow-phase-experimenter-instructions';

interface DblndFlowPhaseTransitionExperimenterProps {
  dblnd: Dblnd;
  pcSize: number;
}

/** TransitionExperimenter Phase Component, helper leave the room and experimenter continues
 *
 * @param props Dblnd experiment info, pill container size
 * @return TSX
 */
export function DblndFlowPhaseTransitionExperimenter(
    props: DblndFlowPhaseTransitionExperimenterProps): JSX.Element {
  const {next, back} = useContext(phaseContext);
  return (
    <>
      <BackButton onclick={back} styleclass='helperstyle' />
      <div className="frame helperexperimenter">
        {getPhaseTsxContent(PHASES.TRANSITION_EXPERIMENTER)}
      </div>
      <ForwardButton styleclass='experimenterstyle' onclick={() =>
        next(<DblndFlowPhaseExperimenterInstructions {...props}/>)
      } />
    </>
  );
}
