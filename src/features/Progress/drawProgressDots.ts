import {
  fibNumToStyleSheetVarMap,
  fibonacciMinsToSeconds,
  FIB_NUMS_FOR_TIMER,
} from "shared/constants";
import { Coords } from "shared/types";
import { drawCircle } from "./drawCircle";
import { CANVAS_SIZE, CENTER_POINT } from "./progress.constants";
import { getStyleSheetColor } from "./utils";

const getFibColor = (progress: number, styleSheetVarName: string) =>
  progress < fibonacciMinsToSeconds[0]
    ? getStyleSheetColor("--c-gray")
    : getStyleSheetColor(styleSheetVarName);

const getCenterPoint = (index: number, bgSpiralPath: Coords[]) =>
  bgSpiralPath[200 + 40 * index];

const getPointWithOffset = (spiralPoint: { x: number; y: number }) => {
  return {
    x: CENTER_POINT.x + spiralPoint.x,
    y: CENTER_POINT.y + spiralPoint.y,
  };
};

export const drawProgressDots = (
  ctx: CanvasRenderingContext2D,
  progress: number,
  bgSpiralPath: Coords[]
) => {
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  FIB_NUMS_FOR_TIMER.forEach((fibNum, index) => {
    if (index > 6) return;

    const styleSheetVarName = fibNumToStyleSheetVarMap[fibNum];
    const centerPoint = getCenterPoint(index, bgSpiralPath);

    drawCircle(
      ctx,
      8,
      getPointWithOffset(centerPoint),
      getFibColor(progress, styleSheetVarName)
    );
  });
};
