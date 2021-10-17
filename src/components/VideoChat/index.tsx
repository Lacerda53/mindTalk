import React, { MutableRefObject, useCallback, useMemo, useRef, useState } from 'react';
import './styles.css';
import * as faceapi from 'face-api.js';

type Props = {
    startCall: (username: string, userToCall: string) => Promise<void>;
    onLogin: (username: string) => Promise<void>;
    localVideoRef: MutableRefObject<HTMLVideoElement | null>;
    remoteVideoRef: MutableRefObject<HTMLVideoElement | null>;
    connectedUser: string;
};

export const VideoChat: React.FC<Props> = ({
    startCall,
    onLogin,
    localVideoRef,
    remoteVideoRef,
    connectedUser
}) => {
    const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userToCall, setUserToCall] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const videoWidth = 720;
    const videoHeight = 560;

    const displaySize = useMemo(() => {
        return {
            width: videoWidth,
            height: videoHeight
        }
    }, []);

    const onLoginClicked = useCallback(async () => {
        await onLogin(username);

        setIsLoggedIn(true);
    }, [onLogin, username]);

    const onStartCallClicked = useCallback(async () => {
        await startCall(username, userToCall)
    }, [username, userToCall, startCall]);

    const renderForms = useCallback(() => {

        return isLoggedIn
            ? (
                <div key='a' className='form'>
                    <label>Call to</label>
                    <input value={userToCall} type="text" onChange={e => setUserToCall(e.target.value)} />
                    <button onClick={onStartCallClicked} id="call-btn" className="btn btn-primary">Call</button>

                </div>
            ) : (
                <div key='b' className='form'>
                    <label>Type a name</label>
                    <input value={username} type="text" onChange={e => setUsername(e.target.value)} />

                    <button onClick={onLoginClicked} id="login-btn" className="btn btn-primary">Login</button>
                </div>
            )
    }, [isLoggedIn, onLoginClicked, onStartCallClicked, userToCall, username]);

    const videoOnPlay = useCallback(() => {

        setInterval(async () => {

            canvasRef.current!.innerHTML = String(faceapi.createCanvasFromMedia(remoteVideoRef.current!));

            faceapi.matchDimensions(canvasRef.current!, displaySize);

            const detections = await faceapi.detectAllFaces(remoteVideoRef.current!, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            // setExpressions(detections[0]?.expressions)
            const resizeDetections = faceapi.resizeResults(detections, displaySize);

            canvasRef.current!.getContext('2d')?.clearRect(0, 0, videoWidth, videoHeight);
            faceapi.draw.drawDetections(canvasRef.current!, resizeDetections);
            faceapi.draw.drawFaceExpressions(canvasRef.current!, resizeDetections);
        }, 100);
    }, [displaySize, remoteVideoRef])

    const renderVideos = useCallback(() => {

        return (
            <>
                <div className='localVideoContainer'>
                    <video ref={localVideoRef} autoPlay playsInline className='localVideo'></video>
                    <label>{username}</label>
                </div>
                <div className='remoteVideoContainer'>
                    <video ref={remoteVideoRef} autoPlay playsInline width={videoWidth} height={videoHeight} onPlay={videoOnPlay}></video>
                    <label>{connectedUser}</label>
                    <canvas ref={canvasRef} className='canvas' />
                </div>
            </>
        )
    }, [connectedUser, localVideoRef, remoteVideoRef, username, videoOnPlay]);

    return (
        <section>
            {connectedUser ? null : renderForms()}
            {renderVideos()}
        </section>
    )
};