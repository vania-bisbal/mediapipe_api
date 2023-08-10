import { DrawingUtils } from "@mediapipe/tasks-vision";

const canvasElement = document.getElementById("output_canvas");
const canvasCtx = canvasElement.getContext("2d");

export let webcamState = {
    webcamRunning: false,
    webcamDevices: [],
    webcamId: 'default',
    lastVideoTime: -1,
    drawingUtils: new DrawingUtils(canvasCtx),
};
  
export let socketState = {
    adddress: 'ws://localhost',
    port: '9980',
    ws: undefined,
};

export let overlayState = {
  show: true,
}
