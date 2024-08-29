import CotopiaButton from "@/components/shared-ui/c-button";

import { Clock } from "lucide-react";

import { _BUS } from "@/app/const/bus";
import useLoading from "@/hooks/use-loading";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import { useEffect, useState } from "react";
import { convertMinutesToHHMMSS, urlWithQueryParams } from "@/lib/utils";
import PopupBox from "@/components/shared/popup-box";
import TimeTrackingDetails from "./details";
import TimeTrackingButton from "./button";

export default function TimeTrackingButtonTool() {
  const [seconds, setSeconds] = useState<undefined | number>();

  const { startLoading, stopLoading, isLoading } = useLoading();
  const getActivityTime = () => {
    startLoading();
    axiosInstance
      .get(urlWithQueryParams(`/users/activities`, { period: "today" }))
      .then((res) => {
        const mins = res.data.data;
        setSeconds(mins * 60);
        stopLoading();
      })
      .catch((err) => {
        stopLoading();
      });
  };
  useEffect(() => {
    getActivityTime();
  }, []);

  return (
    <PopupBox
      trigger={(open) => (
        <TimeTrackingButton
          defaultSeconds={seconds ?? 0}
          onClick={open}
          isLoading={isLoading}
        />
      )}
    >
      {(style, open, close) => {
        return (
          <div
            className='bg-white rounded-lg fixed mt-4 py-2'
            style={{ top: style.top, zIndex: style.zIndex }}
          >
            <TimeTrackingDetails />
          </div>
        );
      }}
    </PopupBox>
  );
}
