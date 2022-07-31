import { reactive, computed, ComputedRef } from "vue";

type Timer = {
  startTime: number;
  interval: number;
};

type Time = {
  mins: ComputedRef<string>;
  secs: ComputedRef<string>;
};

type useTimerReturnType = {
  createInterval: () => void;
  removeInterval: () => void;
  time: Time;
  isTimerLeft: ComputedRef<boolean>;
};

export const useTimer = (timeToLeft: number): useTimerReturnType => {
  const from = new Date();
  const timer = reactive<Timer>({
    startTime: timeToLeft,
    interval: null,
  });
  const mins = computed<string>(() => {
    const value = Math.floor(timer.startTime / 60).toString();
    if (value.length === 1) return `0${value}`;
    return value;
  });
  const secs = computed<string>(() => {
    const value = (timer.startTime - parseInt(mins.value, 10) * 60).toString();
    if (value.length === 1) return `0${value}`;
    return value;
  });
  const isTimerLeft = computed<boolean>(
    () => from.getTime() < new Date().getTime() - timer.startTime,
  );

  const time: Time = {
    mins,
    secs,
  };

  const createInterval = () => {
    timer.startTime = timeToLeft;
    timer.interval = setInterval(() => {
      timer.startTime -= 1;
      if (!timer.startTime) removeInterval();
    }, 1000) as unknown as number;
  };

  const removeInterval = () => {
    clearInterval(timer.interval);
    timer.interval = null;
  };

  return { createInterval, removeInterval, time, isTimerLeft };
};
