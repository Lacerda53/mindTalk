import { DatabaseFirebase } from "../config/fireConfig"

export async function LoginService(username: string, database: DatabaseFirebase, handleUpdate: (notf: any, username: string) => void) {
    await database.ref('/notifs/' + username).remove()
    database.ref('/notifs/' + username).on('value', snapshot => {
        snapshot.exists() && handleUpdate(snapshot.val(), username)
    })
}

export const doOffer = async (to: string, offer: any, database: DatabaseFirebase, username: string) => {
    await database.ref('/notifs/' + to).set({
        type: 'offer',
        from: username,
        offer: JSON.stringify(offer)
    })
}

export const doAnswer = async (to: string, answer: RTCSessionDescriptionInit, database: DatabaseFirebase, username: string) => {
    await database.ref('/notifs/' + to).update({
        type: 'answer',
        from: username,
        answer: JSON.stringify(answer)
    })
}

export const doLeaveNotif = async (to: string, database: DatabaseFirebase, username: string) => {
    await database.ref('/notifs/' + to).update({
        type: 'leave',
        from: username
    })
}

export const doCandidate = async (to: string, candidate: string, database: DatabaseFirebase, username: string) => {
    // send the new candiate to the peer
    await database.ref('/notifs/' + to).update({
        type: 'candidate',
        from: username,
        candidate: JSON.stringify(candidate)
    })
}