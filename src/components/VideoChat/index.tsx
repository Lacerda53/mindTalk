import React, { MutableRefObject, useCallback, useMemo, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './styles.css';

type Props = {
    localVideoRef: MutableRefObject<HTMLVideoElement | null>;
    remoteVideoRef: MutableRefObject<HTMLVideoElement | null>;
    connectedUser: string;
    isCreator: boolean;
};

export const VideoChat: React.FC<Props> = ({
    isCreator,
    localVideoRef,
    remoteVideoRef,
    connectedUser
}) => {
    const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
    const videoWidth = 720;
    const videoHeight = 560;

    const displaySize = useMemo(() => {
        return {
            width: videoWidth,
            height: videoHeight
        }
    }, []);

    const videoOnPlay = useCallback(() => {

        if (isCreator) {
            setInterval(async () => {

                canvasRef.current!.innerHTML = String(faceapi.createCanvasFromMedia(remoteVideoRef.current!));

                faceapi.matchDimensions(canvasRef.current!, displaySize);

                const detections = await faceapi.detectAllFaces(
                    remoteVideoRef.current!,
                    new faceapi.TinyFaceDetectorOptions()
                ).withFaceLandmarks().withFaceExpressions();

                // setExpressions(detections[0]?.expressions)
                const resizeDetections = faceapi.resizeResults(detections, displaySize);
                canvasRef.current!.getContext('2d')?.clearRect(0, 0, videoWidth, videoHeight);
                faceapi.draw.drawDetections(canvasRef.current!, resizeDetections);
                faceapi.draw.drawFaceExpressions(canvasRef.current!, resizeDetections);
            }, 100);
        }
    }, [displaySize, remoteVideoRef, isCreator])

    return (
        <section>
            <div className='localVideoContainer'>
                <video ref={localVideoRef} autoPlay muted playsInline className='localVideo'></video>
                <label>You</label>
            </div>
            <div className='remoteVideoContainer'>
                <video ref={remoteVideoRef} autoPlay playsInline width={videoWidth} height={videoHeight} onPlay={videoOnPlay}></video>
                <label>{connectedUser}</label>
                {isCreator && <canvas ref={canvasRef} className='canvas' />}
            </div>
        </section>
    )
};