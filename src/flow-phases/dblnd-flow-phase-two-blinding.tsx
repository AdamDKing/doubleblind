import React, {useContext, useEffect, useRef, useState} from 'react';
import {phaseContext} from '../App';
import {BackButton} from '../shared-components/back-button';
import {PHASES} from '../enums';
import {ForwardButton} from '../shared-components/forward-button';
import {Dblnd} from '../interfaces';
import {getPhaseTsxContent} from '../phase-tsx-content';
import {PillContainers} from '../shared-components/pill-containers';
import {DblndFlowPhaseFileDownload} from './dblnd-flow-phase-file-download';

interface DblndFlowPhaseTwoBlindingProps {
  dblnd: Dblnd;
  pcSize: number;
}

/** Blinding Part Two Phase Component, explain and run process for experimenter
 *
 * @param props Dblnd experiment info, pill container size
 * @return TSX
 */
export function DblndFlowPhaseTwoBlinding(
    props: DblndFlowPhaseTwoBlindingProps): JSX.Element {
  const {next, back} = useContext(phaseContext);
  const [step, setStep] = useState(0);
  const filteredSteps = props.dblnd.experimenterSteps.filter((s) => s.from !== s.to);
  const arrow: [number, number] = [filteredSteps[step].from,
    filteredSteps[step].to];
  // required to make spacebar functionality work.  Needs rewrite + refactor
  const frameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.focus();
    }
  });

  return (
    <>
      <BackButton onclick={back} styleclass='experimenterstyle' />
      {/* focus behaviour is not good here.  Hacks on hacks */}
      <div className="frame experimenterstyle" style={{outline: 'none'}}
        tabIndex={-1} ref={frameRef} onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'ArrowRight') {
            setStep((prior) => prior < filteredSteps.length-1 ? prior+1 : prior);
          }
          if (e.key === 'ArrowLeft') {
            setStep((prior) => prior > 0 ? prior-1 : prior);
          }
        }}>
        {getPhaseTsxContent(PHASES.PHASE_TWO_BLINDING)}
        <p>
          Swap the pills between the two cells as directed by the arrow.
           Press space to see the next swap, or use the arrow keys to go forward or backward.
           Make sure to swap in order.
        </p>
        <h3>
          {step === filteredSteps.length-1 ? '(Last) ' : ''}Step {step+1} :
           swap {filteredSteps[step].from+1} and {filteredSteps[step].to+1}
        </h3>
        <PillContainers
          containerSize={props.pcSize}
          size={props.dblnd.helperSchedule.length}
          arrow={arrow} />
      </div>
      <ForwardButton styleclass='experimenterstyle' onclick={() =>
        next(<DblndFlowPhaseFileDownload {...props}/>)
      } />
    </>
  );
}
