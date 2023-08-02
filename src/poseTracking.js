import { FilesetResolver, PoseLandmarker, DrawingUtils } from "@mediapipe/tasks-vision";

export const createPoseLandmarker = async (WASM_PATH, modelAssetPath) => {
    const vision = await FilesetResolver.forVisionTasks(WASM_PATH);
    let poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: modelAssetPath,
            delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 2,
    });
    return poseLandmarker;
};

export function drawPoseLandmarks(results, drawingUtils) {
    if (results && results.landmarks) {
        for (const landmark of results.landmarks) {
            drawingUtils.drawLandmarks(landmark, {
                radius: (data) =>
                    DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1),
            });
            drawingUtils.drawConnectors(
                landmark,
                PoseLandmarker.POSE_CONNECTIONS
            );
        }
    }
}