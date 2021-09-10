import React, {useContext} from 'react';
import {phaseContext} from '../App';
import {BackButton} from '../shared-components/back-button';
import {PHASES} from '../enums';
import {getPhaseTsxContent} from '../phase-tsx-content';

interface DblndFlowPhaseOutroProps {
}

/** Outro Phase Component, say goodbye, show feedback form
 *
 * @param props exmpty props
 * @return TSX
 */
export function DblndFlowPhaseOutro(
    props: DblndFlowPhaseOutroProps): JSX.Element {
  // eslint-disable-next-line no-unused-vars
  const {next, back} = useContext(phaseContext);
  return (
    <>
      <BackButton onclick={back} styleclass='experimenterstyle' />
      <div className="frame experimenterstyle">
        {getPhaseTsxContent(PHASES.OUTRO)}
      </div>
    </>
  );
}
