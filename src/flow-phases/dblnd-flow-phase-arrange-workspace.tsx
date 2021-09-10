import React, {useContext} from 'react';
import {phaseContext} from '../App';
import {BackButton} from '../shared-components/back-button';
import {PHASES} from '../enums';
import {ForwardButton} from '../shared-components/forward-button';
import {Dblnd} from '../interfaces';
import {getPhaseTsxContent} from '../phase-tsx-content';
import {DblndFlowPhaseTransitionHelper} from './dblnd-flow-phase-transition-helper';
// import {PillContainers} from './pill-containers';

interface DblndFlowPhaseArrangeWorkspaceProps {
  dblnd: Dblnd;
  pcSize: number;
}

/** Arrange Workspace Phase Component, display arrangement of piles and containers
 *
 * @param props Dblnd experiment info, pill container size
 * @return TSX
 */
export function DblndFlowPhaseArrangeWorkspace(
    props: DblndFlowPhaseArrangeWorkspaceProps): JSX.Element {
  const {next, back} = useContext(phaseContext);
  return (
    <>
      <BackButton onclick={back} styleclass='experimenterstyle'
        backguard='Going back will lose form progress, are you sure?' />
      <div className="frame experimenterstyle">
        {getPhaseTsxContent(PHASES.PILE_INSTRUCTIONS)}
        <p>
          Place the control pile on the <em>{props.dblnd.controlPileRight ? 'right' : 'left'}</em>
        </p>
        {/* <h3>Example Diagram</h3>
        <PillContainers containerSize={props.pcSize} size={props.dblnd.helperSchedule.length} /> */}
      </div>

      <ForwardButton styleclass='experimenterstyle' onclick={() =>
        next(<DblndFlowPhaseTransitionHelper {...props}/>)
      } />
    </>
  );
}
