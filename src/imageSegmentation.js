import { FilesetResolver, ImageSegmenter } from "@mediapipe/tasks-vision";

const legendColors = [
    [255, 197, 0, 255], // Vivid Yellow
    [128, 62, 117, 255], // Strong Purple
    [255, 104, 0, 255], // Vivid Orange
    [166, 189, 215, 255], // Very Light Blue
    [193, 0, 32, 255], // Vivid Red
    [206, 162, 98, 255], // Grayish Yellow
    [129, 112, 102, 255], // Medium Gray
    [0, 125, 52, 255], // Vivid Green
    [246, 118, 142, 255], // Strong Purplish Pink
    [0, 83, 138, 255], // Strong Blue
    [255, 112, 92, 255], // Strong Yellowish Pink
    [83, 55, 112, 255], // Strong Violet
    [255, 142, 0, 255], // Vivid Orange Yellow
    [179, 40, 81, 255], // Strong Purplish Red
    [244, 200, 0, 255], // Vivid Greenish Yellow
    [127, 24, 13, 255], // Strong Reddish Brown
    [147, 170, 0, 255], // Vivid Yellowish Green
    [89, 51, 21, 255], // Deep Yellowish Brown
    [241, 58, 19, 255], // Vivid Reddish Orange
    [35, 44, 22, 255], // Dark Olive Green
    [0, 161, 194, 255] // Vivid Blue
];

export const segmentationModelTypes = {
    'selfieSquare': './mediapipe/selfie_segmenter.tflite',
    'selfieLandscape': './mediapipe/selfie_segmenter_landscape.tflite',
    'selfieMulticlass': './mediapipe/selfie_multiclass_256x256.tflite',
    'deepLabV3': './mediapipe/deeplab_v3.tflite',
}

let segmentationCanvas = document.getElementById("segmentation");
let segmentCtx = segmentationCanvas.getContext("2d");

segmentCtx.width = "1280px";
segmentCtx.height = "720px";
// let segmentationWebgl = segmentationCanvas.getContext("webgl");

export const createImageSegmenter = async (WASM_PATH, modelAssetPath) => {
    const vision = await FilesetResolver.forVisionTasks(WASM_PATH);
    let imageSegmenter = await ImageSegmenter.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: modelAssetPath,
            delegate: "GPU",
        },
        runningMode: "VIDEO",
        outputCategoryMask: true,
        outputConfidenceMasks: true,
    });
    return imageSegmenter;
};

export function drawSegmentation(result, video) {
    // let texture = result.categoryMask.getAsWebGLTexture();
    let eightBitMap = result.categoryMask.getAsUint8Array();
    // let floatBitMap = result.categoryMask.getAsFloat32Array();

    let imageData = ImageData(video.videoWidth, video.videoHeight);

      const mask = result.categoryMask.getAsFloat32Array();
      let j = 0;
      for (let i = 0; i < mask.length; ++i) {
        const maskVal = Math.round(mask[i] * 255.0);
        const legendColor = legendColors[maskVal % legendColors.length];
        imageData[j] = legendColor[0];
        imageData[j + 1] = legendColor[1];
        imageData[j + 2] = legendColor[2];
        imageData[j + 3] = legendColor[3];
        j += 4;
      }
      const uint8Array = new Uint8ClampedArray(imageData.buffer);
      const dataNew = new ImageData(
        uint8Array,
        video.videoWidth,
        video.videoHeight
      );
      segmentCtx.putImageData(dataNew, 0, 0);
}