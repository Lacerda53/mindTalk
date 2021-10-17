import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { VideoChat } from '../../components/VideoChat';
import 'webrtc-adapter';
import * as faceapi from 'face-api.js';
import {
    createOffer,
    initiateConnection,
    startCallRtc,
    sendAnswer,
    addCandidate,
    initiateLocalStream,
    listenToConnectionEvents
} from '../../services/rtcService';
import { DatabaseFirebase, database } from '../../config/fireConfig';
import { doAnswer, doCandidate, LoginService, doOffer } from '../../services/firebaseService';

export const Stream: React.FC = () => {
    const [databaseInstance, setDatabaseInstance] = useState<DatabaseFirebase>();
    const [connectedUser, setConnectedUser] = useState<string>('');
    const [localStream, setLocalStream] = useState<MediaStream>();
    const [localConnection, setLocalConnection] = useState<RTCPeerConnection>();
    const localVideoRef: MutableRefObject<HTMLVideoElement | null> = useRef(null);
    const remoteVideoRef: MutableRefObject<HTMLVideoElement | null> = useRef(null);

    useEffect(() => {
        async function initialize() {

            // getting local video stream
            const initLocalStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            localVideoRef.current!.srcObject = initLocalStream;

            const localConnection = await initiateConnection()

            setDatabaseInstance(database);
            setLocalStream(initLocalStream)
            setLocalConnection(localConnection)
        }

        initialize()
    }, []);

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.database !== nextState.database) {
    //         return false
    //     }
    //     if (this.state.localStream !== nextState.localStream) {
    //         return false
    //     }
    //     if (this.state.localConnection !== nextState.localConnection) {
    //         return false
    //     }

    //     return true
    // }

    async function startCall(username: string, userToCall: string) {

        listenToConnectionEvents(localConnection!, username, userToCall, database, remoteVideoRef, doCandidate)
        // create an offer
        createOffer(localConnection!, localStream!, userToCall, doOffer, database, username)
    }

    async function onLogin(username: string) {
        return await LoginService(username, databaseInstance!, handleUpdate)
    }

    // function setLocalVideoRef(ref: HTMLVideoElement) {
    //     localVideoRef.current = ref
    // }

    // function setRemoteVideoRef(ref: HTMLVideoElement) {
    //     remoteVideoRef.current = ref
    // }

    function handleUpdate(notif: any, username: string) {

        if (notif) {
            switch (notif.type) {
                case 'offer':
                    setConnectedUser(notif.from)

                    listenToConnectionEvents(localConnection!, username, notif.from, database, remoteVideoRef, doCandidate)

                    sendAnswer(localConnection!, localStream!, notif, doAnswer, database, username)
                    break
                case 'answer':

                    setConnectedUser(notif.from)
                    startCallRtc(localConnection!, notif)
                    break
                case 'candidate':
                    addCandidate(localConnection!, notif)
                    break
                default:
                    break
            }
        }
    }

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
        <VideoChat
            onLogin={onLogin}
            localVideoRef={localVideoRef}
            remoteVideoRef={remoteVideoRef}
            startCall={startCall}
            connectedUser={connectedUser}
        />
    );
};