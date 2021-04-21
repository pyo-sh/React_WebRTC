import React, {useState, useRef, useEffect} from 'react';
import AgoraRTC, { ILocalTrack, UID, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
// import ReactDOM from 'react-dom';

let client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "h264"
});

type LocalTrackType = {
    [key: string]: ILocalTrack | undefined,
    videoTrack ?: ILocalTrack
    audioTrack ?: ILocalTrack
}
let localTracks: LocalTrackType = {
    videoTrack: undefined,
    audioTrack: undefined,
};

type OptionType = {
    appId: string,
    token: | null,
    uid: UID | null,
}
export const options: OptionType = {
    appId: process.env.REACT_APP_AGORA_appId || '',
    token: null,
    uid: null,
};

const Test: React.FC = () => {
    const [joined, setJoined] = useState(false);
    const channelRef = useRef<HTMLInputElement>(null);
    const leaveRef = useRef<HTMLInputElement>(null);
    // const remoteRef = useRef("");
    const [uids, setUids] = useState<Array<UID>>([]);
    const [unpublishedUid, setUnpublishedUid] = useState("");

    useEffect(() => {
    }, [uids])

    useEffect(() => {
        unsubscribe(unpublishedUid);
    }, [unpublishedUid])

    const join = async (/*event*/) => {
        try {
            if ((channelRef.current as any).value === "") {
                return console.log("Please Enter Channel Name");
            }
            setJoined(true);

            // 상대방이 Publish 될 때!!
            client.on("user-published", handleUserPublished);
            client.on("user-unpublished", handleUserUnpublished);

            //여기서, 엑티브 스피커를..?
            // client.enableAudioVolumeIndicator();
            // client.on("volume-indicator", volumes => {
            //   volumes.forEach((volume, index) => {
            //     console.log(`${index} UID ${volume.uid} Level ${volume.level}`);
            //   });
            // })

            options.uid = await client.join(options.appId, (channelRef.current as any).value, options.token || null);
            localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
            // View ID ...? 
            localTracks.videoTrack.play("local-player");

            const clientArray = [];
            if (localTracks.audioTrack){ clientArray.push(localTracks.audioTrack) }
            if (localTracks.videoTrack){ clientArray.push(localTracks.videoTrack) }

            await client.publish(clientArray);
        }
        catch(err){
            console.error(err)
        }
    }

    function handleUserPublished(user: any, mediaType: any) {
        const id = user.uid;
        subscribe(user, mediaType);
    }
  
    const handleUserUnpublished = (user: any) => {
        const id = user.uid;
        setUnpublishedUid(user.uid);
    }

    const unsubscribe = async (uid: any) => {
        console.log('unsubscribe');
        console.log(uids);
        const index = uids.findIndex((uid) => uid === uid)
        if(index === -1){    
        }
        else{
            const copy = [...uids]
            const newUids = copy.splice(index, 1)
            setUids(copy.splice(index, 1))
        }
    }

    const subscribe = async (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => {
        const uid = user.uid;
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === 'video' && user.videoTrack) {
            //uid - 
            if(uids.includes(uid)){
                //pass
            }
            else{
                setUids(uids => [...uids, uid]);
                user.videoTrack.play(`player-${uid}`);
            }
        // const PlayerContainer = React.createElement("div", {
        //      id: `player-${user.uid}`,
        //      className: "player",
        // });
        // ReactDOM.render(
        //      PlayerContainer,
        //      document.getElementById("remote-playerlist")
        // );

        // user.videoTrack.play(`player-${uid}`);
        } 
        if (mediaType === 'audio' && user.audioTrack) {
            user.audioTrack.play();
        }
    }

    const leave = async (/*event*/) => {
        Object.keys(localTracks).forEach(trackName => {
            const track = localTracks[trackName];
            if(track) {
                track.stop();
                track.close();
                localTracks[trackName] = undefined;
            }
        })
  
        await client.leave();    
        setJoined(false);
    }

    return (
    <>
        <div className="container">
            <input
                type="text"
                ref={channelRef}
                id="channel"
                placeholder="Enter Channel name"
                />
            <input
                type="submit"
                value="Join"
                onClick={join}
                disabled={joined ? true : false}
                />
            <input
                type="button"
                ref={leaveRef}
                value="Leave"
                onClick={leave}
                disabled={joined ? false : true}
                />
        </div>
        {joined ? (
        <>
            <div id="local-player" className="stream local-stream"></div>

            <div className="col">
                <div id="remote-playerlist" style={{width:400, height:400,}}>
                {
                    uids.map(uid => <>
                        <div className="player" id={`player-${uid}`}></div>
                    </>)
                }
                </div>
            </div>
        </>
        ) : null}
    </>
    );
}

export default Test;