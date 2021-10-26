import React, { MutableRefObject, useCallback, useMemo, useRef } from 'react';
import * as faceapi from 'face-api.js';
import { Canvas, Container, Label, LocalContainer, RemoteContainer, VideoLocal, VideoRemote } from './styles';

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
        <Container>
            <LocalContainer>
                <VideoLocal ref={localVideoRef} autoPlay muted playsInline />
                <Label>You</Label>
            </LocalContainer>
            <RemoteContainer>
                <VideoRemote ref={remoteVideoRef} autoPlay playsInline onPlay={videoOnPlay} />
                <Label>{connectedUser}</Label>
                {isCreator && <Canvas ref={canvasRef} />}
            </RemoteContainer>
        </Container>
    )
};