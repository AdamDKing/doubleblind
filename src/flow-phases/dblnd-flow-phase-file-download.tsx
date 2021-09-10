import React, {useContext} from 'react';
import {phaseContext} from '../App';
import {BackButton} from '../shared-components/back-button';
import {PHASES} from '../enums';
import {ForwardButton} from '../shared-components/forward-button';
import {Dblnd} from '../interfaces';
import {getPhaseTsxContent} from '../phase-tsx-content';
import {FileDownloader} from '../shared-components/file-downloader';
import {DblndFlowPhaseOutro} from './dblnd-flow-phase-outro';

interface DblndFlowPhaseFileDownloadProps {
  dblnd: Dblnd;
  pcSize: number;
}

/** File Download Phase Component, allow key download
 *
 * @param props Dblnd experiment info, pill container size
 * @return TSX
 */
export function DblndFlowPhaseFileDownload(
    props: DblndFlowPhaseFileDownloadProps): JSX.Element {
  const {next, back} = useContext(phaseContext);
  return (
    <>
      <BackButton onclick={back} styleclass='experimenterstyle' />
      <div className="frame experimenterstyle">
        {getPhaseTsxContent(PHASES.FILE_DOWNLOAD)}
        <FileDownloader toDownload={props.dblnd.finalSchedule} />
      </div>
      <ForwardButton styleclass='experimenterstyle' onclick={() =>
        next(<DblndFlowPhaseOutro/>)
      } />
    </>
  );
}
