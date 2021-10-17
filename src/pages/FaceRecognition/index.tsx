import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './styles.css'

export const FaceRecognition: React.FC = () => {
    const [initializing, setInitializing] = useState(false);
    const videoWidth = 720;
    const videoHeight = 560;
    const videoRef: MutableRefObject<HTMLVideoElement | null> = useRef(null);
    const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
    const [expressions, setExpressions] = useState<faceapi.FaceExpressions>()

    const displaySize = {
        width: videoWidth,
        height: videoHeight
    };

    async function startVideo() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });

        videoRef.current!.srcObject = stream;
        setInitializing(false);
    }

    async function videoOnPlay() {

        setInterval(async () => {

            if (initializing) {

                setInitializing(false)
            }
            canvasRef.current!.innerHTML = String(faceapi.createCanvasFromMedia(videoRef.current!));

            faceapi.matchDimensions(canvasRef.current!, displaySize);

            const detections = await faceapi.detectAllFaces(videoRef.current!, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            setExpressions(detections[0]?.expressions)
            const resizeDetections = faceapi.resizeResults(detections, displaySize);

            canvasRef.current!.getContext('2d')?.clearRect(0, 0, videoWidth, videoHeight);
            faceapi.draw.drawDetections(canvasRef.current!, resizeDetections);
            faceapi.draw.drawFaceExpressions(canvasRef.current!, resizeDetections);
        }, 100);
    }

    useEffect(() => {

        async function loadModels() {
            const MODEL_URL = process.env.PUBLIC_URL + '/models'
            setInitializing(true);
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(startVideo);
        }

        loadModels();
    }, []);

    return (
        <div className='container'>
            <div className="detectionContainer">

                <span>
                    {initializing ? 'Iniciando' : 'Pronto'}
                </span>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    width={videoWidth}
                    height={videoHeight}
                    onPlay={videoOnPlay}
                />
                <canvas ref={canvasRef} className='canvas' />
            </div>
            <div>
                 <div>
                    <h4>Neutro: </h4>
                    <span>{String(expressions?.neutral || 0)} %</span>
                </div>
                <div>
                    <h4>Feliz: </h4>
                    <span>{String(expressions?.happy || 0)} %</span>
                </div>
                <div>
                    <h4>Triste: </h4>
                    <span>{String(expressions?.sad || 0)} %</span>
                </div>
                <div>
                    <h4>Nervoso: </h4>
                    <span>{String((Math.floor((expressions?.angry || 0) * 100)))} %</span>
                </div>
                <div>
                    <h4>Supreso: </h4>
                    <span>{String((Math.floor((expressions?.surprised || 0) * 100)))} %</span>
                </div>
                <div>
                    <h4>Nojo: </h4>
                    <span>{String((Math.floor((expressions?.disgusted || 0) * 100)))} %</span>
                </div>
                <div>
                    <h4>Medo: </h4>
                    <span>{String(expressions?.fearful || 0)} %</span>
                </div>
            </div>
            <div>
                <h1>

                </h1>
            </div>
        </div>
    );
};