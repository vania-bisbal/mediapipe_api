# Create an Art piece Digital Twin using Mediapipe TouchDesigner Plugin and Arduino 
<img width="1053" alt="digital_twin" src="https://github.com/vania-bisbal/mediapipe_api/blob/cc52cd9bb43f9cc27baa278645e4bf33e85d2d0b/digitalclaytwin.jpg">


# Let's start with the MediaPipe TouchDesigner Plugin

[![Total Downloads](https://img.shields.io/github/downloads/torinmb/mediapipe-touchdesigner/total?style=for-the-badge&label=Total%20Downloads)](https://github.com/torinmb/mediapipe-touchdesigner/releases/latest/download/release.zip)

[![Download Latest Release](https://img.shields.io/badge/Download_Latest_Release_%E2%86%93-blank?style=for-the-badge)](https://github.com/torinmb/mediapipe-touchdesigner/releases/latest/download/release.zip)

A GPU Accelerated, self-contained, [MediaPipe](https://developers.google.com/mediapipe) Plugin for TouchDesigner that runs on Mac and PC with no installation. This project currently supports all MediaPipe vision models except Interactive Segmentation and Image Embedding.

<img width="1053" alt="Screenshot 2023-08-14 at 2 16 44 PM" src="https://github.com/torinmb/mediapipe-touchdesigner/assets/6014011/8f7a9eb9-fa7a-4d9b-b541-bb9c6c4e0e88">

# Mediapipe Plugin Overview
To get an idea of what's possibe with the plugin, and a quick tutorial on how to get up and running, check out Torin's tutorial [introduction video on YouTube](https://www.youtube.com/watch?v=Cx4Ellaj6kk "Face, Hand, Pose Tracking & More in TouchDesigner with @MediaPipe GPU Plugin")

# Mediapipe Plugin Setup
Download the latest **release.zip** from the [Release Section](https://github.com/torinmb/mediapipe-touchdesigner/releases). Open up the MediaPipe TouchDesigner.toe file. All of the components are stored inside the /toxes folder. The main component is MediaPipe.tox. All of the other components are examples of how to load and display the associated model data in TouchDesigner.

On the MediaPipe component once it's loaded you can select your webcam from the drop-down. You can turn on and off the different MediaPipe models as well as preview overlays. There're also sub-menus available for each model to customize them further.


![image-1](https://github.com/torinmb/mediapipe-touchdesigner/assets/6014011/ffb65b9b-e916-45ee-87fc-af7480cc2ac6)

# A note on resolution
Currently the model is limited to 720p input resolution - as long as that's a resolution your webcam supports, you're good to go.

## Mediapipe Plugin Components
The plugin consists of a number of components:

### Media Pipe tox
This component launches a Chromium web browser to host and run all of the MediaPipe vision tasks.
It has a DAT output for each vision task, as well as a TOP output showing the video feed and any overlays.

### Face detector tox
Use this to process the face detection results

[Face detection guide](https://developers.google.com/mediapipe/solutions/vision/face_detector)

### Face tracking tox
Use this to process the facial landmark detection results

[Face landmark detection guide](https://developers.google.com/mediapipe/solutions/vision/face_landmarker)

### Hand tracking tox
Use this to process the hand landmark and gesture detection results

[Gesture recognition task guide](https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer)

### Object tracking tox
Use this to process the object detection results

[Object detection task guide](https://developers.google.com/mediapipe/solutions/vision/object_detector)

### Pose tracking tox
Use this to process the pose landmark detection results

[Pose landmark detection guide](https://developers.google.com/mediapipe/solutions/vision/pose_landmarker)

### Image segmentation tox
Use this to key out segmentation results
[Image segmentation guide](https://developers.google.com/mediapipe/solutions/vision/image_segmenter)

Note: If you're hoping to get the most accurate web-cam cutout use the MultiCam model in the MediaPipe.tox. There's also a toggle to display only the background cutout which you can enable while on the multiclass model.

### Image classification tox
Use this to identify what the image might contain
[Image classification guide](https://developers.google.com/mediapipe/solutions/vision/image_classifier)


The media should appear with no frames of delay!

## Turn off what you're not using
The MediaPipe detection tasks are very CPU and GPU intensive, so turn off any that you aren't using

# How do the plugins work?
This project loads the different MediaPipe models through a web browser. All of the ML models are downloaded locally and stored inside TouchDesigner's virtual file system including the website so the component can run without an internet connection. The models run using web assembly and the data coming back from the models are piped into TouchDesigner through a local WebSocket server running inside TD. This allows the components to run as standalone .tox files with GPU acceleration on any device with no setup.

## Architecture
As MediaPipe currently only supports GPU acceleration via the Javascript implementation, and this is the only version that does not require installing local libraries, we have implemented this version, by using the following three main components:
1. Web (and websocket) server
2. Web browser
3. JSON decoders

### Web server
The web server component has an embedded set of web pages that are served to the web browser just like any website would do. It also acts as a websocket server that allows two-way-communication between the web browser and TouchDesigner.

### Web browser
The embedded Chromium support in TouchDesigner allows us to run a full web browser within TouchDesigner. This web browser opens the web pages served by the web server, which allow it to run all of the MediaPipe detection components and render the final video stream. The web browser also sends coordinate data and other detection data back to TouchDesigner via a websocket connection.
