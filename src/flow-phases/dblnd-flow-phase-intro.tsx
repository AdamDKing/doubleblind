import React, {useContext} from 'react';
import {phaseContext} from '../App';
import {DblndFlowPhaseGetDetails} from './dblnd-flow-phase-get-details';
import {PHASES} from '../enums';
import {ForwardButton} from '../shared-components/forward-button';
import {getPhaseTsxContent} from '../phase-tsx-content';

interface DblndFlowPhaseIntroProps {
}

/** First Phase Component, visible on opening site
 *
 * @param props empty props
 * @return TSX fragments
 */
export function DblndFlowPhaseIntro(props: DblndFlowPhaseIntroProps): JSX.Element {
  // eslint-disable-next-line no-unused-vars
  const {next, ...unused} = useContext(phaseContext);
  return (
    <>
      <div className="frame experimenterstyle">
        {getPhaseTsxContent(PHASES.INTRO)}
      </div>
      <ForwardButton styleclass='experimenterstyle' onclick={() => {
        next(<DblndFlowPhaseGetDetails />);
      }} />
    </>
  );
}
