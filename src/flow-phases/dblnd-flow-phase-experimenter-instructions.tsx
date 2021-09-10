import React, {useContext} from 'react';
import {phaseContext} from '../App';
import {BackButton} from '../shared-components/back-button';
import {PHASES} from '../enums';
import {ForwardButton} from '../shared-components/forward-button';
import {Dblnd} from '../interfaces';
import {getPhaseTsxContent} from '../phase-tsx-content';
import {DblndFlowPhaseTwoBlinding} from './dblnd-flow-phase-two-blinding';

interface DblndFlowPhaseExperimenterInstructionsProps {
  dblnd: Dblnd;
  pcSize: number;
}

/** ExperimenterInstructions Phase Component, explain process to helper
 *
 * @param props Dblnd experiment info, pill container size
 * @return TSX
 */
export function DblndFlowPhaseExperimenterInstructions(
    props: DblndFlowPhaseExperimenterInstructionsProps): JSX.Element {
  const {next, back} = useContext(phaseContext);
  return (
    <>
      <BackButton onclick={back} styleclass='experimenterstyle' />
      <div className="frame experimenterstyle">
        {getPhaseTsxContent(PHASES.EXPERIMENTER_INSTRUCTIONS)}
      </div>
      <ForwardButton styleclass='experimenterstyle' onclick={() =>
        next(<DblndFlowPhaseTwoBlinding {...props}/>)
      } />
    </>
  );
}
