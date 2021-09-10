import React, {useContext, useEffect, useRef, useState} from 'react';
import {phaseContext} from '../App';
import {BackButton} from '../shared-components/back-button';
import {PHASES, PILL} from '../enums';
import {ForwardButton} from '../shared-components/forward-button';
import {Dblnd} from '../interfaces';
import {getPhaseTsxContent} from '../phase-tsx-content';
import {PillContainers} from '../shared-components/pill-containers';
import {DblndFlowPhaseTransitionExperimenter} from './dblnd-flow-phase-transition-experimenter';

interface DblndFlowPhaseOneBlindingProps {
  dblnd: Dblnd;
  pcSize: number;
}

/** Blinding Part One Phase Component, explain process to helper
 *
 * @param props Dblnd experiment info, pill container size
 * @return TSX
 */
export function DblndFlowPhaseOneBlinding(
    props: DblndFlowPhaseOneBlindingProps): JSX.Element {
  const {next, back} = useContext(phaseContext);
  const [pileRight, setPileRight] = useState(Math.random()>0.5);
  // required to make spacebar functionality work.  Needs rewrite + refactor
  const frameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.focus();
    }
  });

  const order: [PILL, PILL] = pileRight === props.dblnd.controlPileRight ?
    [PILL.CONTROL, PILL.TREATMENT] : [PILL.TREATMENT, PILL.CONTROL];
  const highlight =new Set(props.dblnd.helperSchedule
      .map((v, i) => v === order[0] ? i : -1)
      .filter((x) => x>=0),
  );
  return (
    <>
      <BackButton onclick={back} styleclass='helperstyle' />
      {/* focus behaviour is not good here.  Hacks on hacks */}
      <div className="frame helperstyle" style={{outline: 'none'}}
        tabIndex={-1} ref={frameRef} onKeyDown={(e) => {
          if (e.key === ' ') {
            setPileRight((b) => !b);
          }
        }}>
        {getPhaseTsxContent(PHASES.PHASE_ONE_BLINDING)}
        <h3>
          Place the pills from the <em>{pileRight ? 'right ' : 'left '}</em>
           pile in the highlighted cells.
        </h3>
        <p>
          Press the spacebar to toggle, or click:
          <button onClick={(e) => {
            setPileRight((b) => !b);
          }}>Toggle</button>
        </p>
        <PillContainers
          containerSize={props.pcSize}
          size={props.dblnd.helperSchedule.length}
          highlight={highlight} />
      </div>
      <ForwardButton styleclass='helperstyle' onclick={() =>
        next(<DblndFlowPhaseTransitionExperimenter {...props}/>)
      } />
    </>
  );
}
