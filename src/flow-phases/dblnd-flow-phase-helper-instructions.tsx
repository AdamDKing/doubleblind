import React, {useContext} from 'react';
import {phaseContext} from '../App';
import {BackButton} from '../shared-components/back-button';
import {PHASES} from '../enums';
import {ForwardButton} from '../shared-components/forward-button';
import {Dblnd} from '../interfaces';
import {getPhaseTsxContent} from '../phase-tsx-content';
import {DblndFlowPhaseOneBlinding} from './dblnd-flow-phase-one-blinding';

interface DblndFlowPhaseHelperInstructionsProps {
  dblnd: Dblnd;
  pcSize: number;
}

/** Helper Instructions Phase Component, explain process to helper
 *
 * @param props Dblnd experiment info, pill container size
 * @return TSX
 */
export function DblndFlowPhaseHelperInstructions(
    props: DblndFlowPhaseHelperInstructionsProps): JSX.Element {
  const {next, back} = useContext(phaseContext);
  return (
    <>
      <BackButton onclick={back} styleclass='helperstyle' />
      <div className="frame helperstyle">
        {getPhaseTsxContent(PHASES.HELPER_INSTRUCTIONS)}
      </div>
      <ForwardButton styleclass='helperstyle' onclick={() =>
        next(<DblndFlowPhaseOneBlinding {...props}/>)
      } />
    </>
  );
}
