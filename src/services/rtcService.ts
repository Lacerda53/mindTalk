import { MutableRefObject } from "react"
import { DatabaseFirebase } from "../config/fireConfig"

export const createOffer = async (
    connection: any,
    localStream: MediaStream,
    userToCall: string,
    doOffer: (to: string, offer: any, database: DatabaseFirebase, username: string) => Promise<void>,
    database: DatabaseFirebase, username: string) => {
    try {
        connection.addStream(localStream)

        const offer = await connection.createOffer()
        await connection.setLocalDescription(offer)

        doOffer(userToCall, offer, database, username)
    } catch (exception) {
        console.error(exception)
    }
}

export const initiateLocalStream = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        return stream
    } catch (exception) {
        console.error(exception)
    }
}

export const initiateConnection = async () => {
    try {
        // using Google public stun server
        var configuration: RTCConfiguration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.1.google.com:19302' },
                { urls: 'stun:stun01.sipphone.com' },
                { urls: 'stun:stun.ekiga.net' },
                { urls: 'stun:stum.fwdnet.net' },
                { urls: 'stun:stum.ideasip.com' },
                { urls: 'stun:stum.iptel.org' },
                { urls: 'stun:stum.rixtelecom.se' },
                { urls: 'stun:stun.softjoys.com' },
                { urls: 'stun:stun.voiparound.com' },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                },
                {
                    urls: 'turn:192.158.29.39:3478?transport=udp',
                    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                    username: '28224511:1379330808'
                },
                {
                    urls: 'turn:192.158.29.39:3478?transport=tcp',
                    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                    username: '28224511:1379330808'
                },
                {
                    urls: 'turn:turn.bistri.com:80',
                    credential: 'homeo',
                    username: 'homeo'
                },
                {
                    urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
                    credential: 'webrtc',
                    username: 'webrtc'
                }
            ]
        }

        const conn = new RTCPeerConnection(configuration)

        return conn
    } catch (exception) {
        console.error(exception)
    }
}

export const listenToConnectionEvents = (
    conn: RTCPeerConnection,
    username: string,
    remoteUsername: string,
    database: DatabaseFirebase,
    remoteVideoRef: MutableRefObject<HTMLVideoElement | null>,
    doCandidate: (
        to: string,
        candidate: string,
        database: DatabaseFirebase,
        username: string
    ) => Promise<void>
) => {
    conn.onicecandidate = function (event: any) {
        if (event.candidate) {
            doCandidate(remoteUsername, event.candidate, database, username)
        }
    }

    // when a remote user adds stream to the peer connection, we display it
    conn.ontrack = function (e) {
        if (remoteVideoRef.current!.srcObject !== e.streams[0]) {
            remoteVideoRef.current!.srcObject = e.streams[0]
        }
    }
}

export const sendAnswer = async (
    conn: any,
    localStream: MediaStream,
    notif: any,
    doAnswer: (to: string, answer: RTCSessionDescriptionInit, database: DatabaseFirebase, username: string) => void,
    database: DatabaseFirebase,
    username: string
) => {
    try {
        conn.addStream(localStream)

        const offer = JSON.parse(notif.offer)
        conn.setRemoteDescription(offer)

        // create an answer to an offer
        const answer = await conn.createAnswer()
        conn.setLocalDescription(answer)

        doAnswer(notif.from, answer, database, username)
    } catch (exception) {
        console.error(exception)
    }
}

export const startCallRtc = (yourConn: RTCPeerConnection, notif: any) => {
    const answer = JSON.parse(notif.answer)
    yourConn.setRemoteDescription(answer)
}

export const addCandidate = (yourConn: RTCPeerConnection, notif: any) => {
    // apply the new received candidate to the connection
    const candidate = JSON.parse(notif.candidate)
    yourConn.addIceCandidate(new RTCIceCandidate(candidate))
}