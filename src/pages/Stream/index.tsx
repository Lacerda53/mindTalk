import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { doAnswer, doCandidate, LoginService, doOffer } from '../../services/firebaseService';
import { Identification } from '../../components/Identification';
import { VideoChat } from '../../components/VideoChat';
import { useAuth } from '../../context/AuthContext';
import * as faceapi from 'face-api.js';
import 'webrtc-adapter';
import {
    createOffer,
    initiateConnection,
    startCallRtc,
    sendAnswer,
    addCandidate,
    listenToConnectionEvents
} from '../../services/rtcService';
import { useLocation } from 'react-router';

type StateProps = {
    isCreator?: boolean;
};

export const Stream: React.FC = () => {
    const { databaseInstance } = useAuth();
    const { state } = useLocation();
    const { isCreator } = state as StateProps || {};
    const [loading, setLoading] = useState<boolean>(true);
    const [connectedUser, setConnectedUser] = useState<string>('');
    const [localStream, setLocalStream] = useState<MediaStream>();
    const [localConnection, setLocalConnection] = useState<RTCPeerConnection>();
    const localVideoRef: MutableRefObject<HTMLVideoElement | null> = useRef(null);
    const remoteVideoRef: MutableRefObject<HTMLVideoElement | null> = useRef(null);

    useEffect(() => {
        async function initialize() {
            // getting local video stream
            try {
                const initLocalStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });

                localVideoRef.current!.srcObject = initLocalStream;

                const localConnection = await initiateConnection()

                setLoading(false);
                setLocalStream(initLocalStream);
                setLocalConnection(localConnection);
            } catch {

                alert('Câmera desconectada');
            }
        }

        initialize();
    }, []);

    const startCall = useCallback(async (username: string, userToCall: string) => {

        if (localConnection && databaseInstance && localStream) {

            if (isCreator) {

                listenToConnectionEvents(localConnection, username, userToCall, databaseInstance, remoteVideoRef, doCandidate);
                // create an offer
                await createOffer(localConnection, localStream, userToCall, doOffer, databaseInstance, username);
            } else {

                listenToConnectionEvents(localConnection, username, 'mind', databaseInstance, remoteVideoRef, doCandidate);
                // create an offer
                await createOffer(localConnection, localStream, 'mind', doOffer, databaseInstance, username);
            }
        }
    }, [databaseInstance, isCreator, localConnection, localStream]);

    const handleUpdate = useCallback((notif: any, username: string) => {

        if (notif && localConnection && databaseInstance && localStream) {
            switch (notif.type) {
                case 'offer':
                    setConnectedUser(notif.from)

                    listenToConnectionEvents(localConnection, username, notif.from, databaseInstance, remoteVideoRef, doCandidate)

                    sendAnswer(localConnection, localStream, notif, doAnswer, databaseInstance, username)
                    break
                case 'answer':

                    setConnectedUser(notif.from)
                    startCallRtc(localConnection, notif)
                    break
                case 'candidate':
                    addCandidate(localConnection, notif)
                    break
                default:
                    break
            }
        }
    }, [databaseInstance, localConnection, localStream])

    const onLogin = useCallback(async (username: string) => {
        await LoginService(username, databaseInstance!, handleUpdate);
    }, [databaseInstance, handleUpdate]);

    useEffect(() => {

        async function validateCreator() {

            if (isCreator) {

                await onLogin('mind');
            }
        }

        validateCreator();
    }, [onLogin, isCreator]);

    useEffect(() => {

        async function loadModels() {
            const MODEL_URL = process.env.PUBLIC_URL + '/models'
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]);
        }

        loadModels();
    }, []);

    return (
        <>
            {connectedUser || isCreator
                ? (
                    <VideoChat
                        localVideoRef={localVideoRef}
                        remoteVideoRef={remoteVideoRef}
                        isCreator={isCreator ? true : false}
                        connectedUser={connectedUser}
                    />
                ) : (
                    <Identification
                        onLogin={onLogin}
                        localVideoRef={localVideoRef}
                        loading={loading}
                        startCall={startCall}
                    />
                )
            }
        </>
    );
};