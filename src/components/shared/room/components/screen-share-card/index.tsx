import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import { _BUS } from "@/app/const/bus";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import DraggableComponent from "@/components/shared/draggable";
import { TrackReference, VideoTrack } from "@livekit/components-react";
import { Expand, Minimize, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { dispatch } from "use-bus";

type Props = {
  track: TrackReference;
};
export default function ScreenShareCard({ track }: Props) {
  const { user } = useProfile();

  const [isExpanded, setIsExpanded] = useState(false);

  let clss = "w-[400px] h-[160px] relative transition-all";
  if (isExpanded) clss += ` fixed !w-[1200px] !h-[480px]`;

  const myScreenShare = track?.participant?.identity === user?.username;

  return (
    <DraggableComponent x={200} y={200}>
      <div className={clss}>
        <div className='absolute top-4 left-4 flex flex-row items-center gap-x-2'>
          <CotopiaIconButton
            className='text-black/60 z-10'
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? <Minimize /> : <Expand />}
          </CotopiaIconButton>
          {!!myScreenShare && (
            <CotopiaIconButton
              className='text-black/60 z-10'
              onClick={() => dispatch(_BUS.stopMyScreenSharing)}
            >
              <X />
            </CotopiaIconButton>
          )}
        </div>
        <VideoTrack trackRef={track} />
      </div>
    </DraggableComponent>
  );
}
