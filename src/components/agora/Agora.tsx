import React, { useState, useRef, useEffect } from 'react';
import AgoraBox from 'styles/agora/AgoraBox';
import AgoraRTC, { ILocalTrack, UID, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';

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

type AgoraPropType = {
    roomId : string,
    users: any,
}

const Agora: React.FC<AgoraPropType> = ({ roomId, users }) => {
    const my_uid = useSelector((state: RootState) => state.user.uid);
    // 내가 Join 했는지 에 대한 State...
    // 후에 Loading... 등 가능할 듯 하다
    const [joined, setJoined] = useState<boolean>(false);
    
    // 비디오 On 여부
    const [myVideo, setMyVideo] = useState<boolean>(false);
    // 오디오 On 여부
    const [myAudio, setMyAudio] = useState<boolean>(false);

    // 참가하고 있는 UID 들
    const [publishedUids, setPublishedUids] = useState<Array<any>>([]);
    // 삭제할 UID 를 State로 관리할 것이다.
    const [unpublishedUid, setUnpublishedUid] = useState<any>(undefined);

    useEffect(() => {
        // joinChannel();
        return () => {
            leaveChannel();
        }
    }, [])

    // 채널 참여
    const joinChannel = async (/*event*/) => {
        try {
            if (!roomId) {
                return console.log("Please Enter Correct Channel");
            }
            setJoined(true);

            // Listening 상대방 입장/퇴장
            client.on("user-published", userPublished);
            client.on("user-unpublished", userUnpublished);

            //여기서, 엑티브 스피커를..?
            // client.enableAudioVolumeIndicator();
            // client.on("volume-indicator", volumes => {
            //   volumes.forEach((volume, index) => {
            //     console.log(`${index} UID ${volume.uid} Level ${volume.level}`);
            //   });
            // })

            options.uid = await client.join(options.appId, roomId, options.token || null, my_uid);
            localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();

            const clientArray = [];
            if (localTracks.audioTrack){
                clientArray.push(localTracks.audioTrack);
                setMyAudio(true);
            }
            if (localTracks.videoTrack){ 
                localTracks.videoTrack.play("Agora-Local-Player");
                clientArray.push(localTracks.videoTrack);
                setMyVideo(true);
            }

            await client.publish(clientArray);
        }
        catch(error){
            console.error(error)
            setJoined(false);
        }
    }
    // 채널 퇴장... Unmount & Leave... else
    const leaveChannel = async (/*event*/) => {
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

    // To My subscribers, I Have to Control Video & Audio
    useEffect(() => {
        try{
            const { videoTrack, audioTrack } = localTracks;
            if (videoTrack) {
                videoTrack.setEnabled(myVideo);
                console.log(videoTrack.isPlaying);
            }
            if (audioTrack) {
                audioTrack.setEnabled(myAudio);
            }
        }
        catch(error){
            console.error(error)
        }
    }, [myVideo, myAudio])

    // 유저 입장
    const userPublished = (user: any, mediaType: any) => {
        if(!publishedUids.filter((publishedUser) => publishedUser.uid == user.uid).length){
            setPublishedUids([...publishedUids, user]);
        console.log('ddddddddddddddddddddddddddddddddddddddddd')

        }
        userSubscribe(user, mediaType);
    }
    // 유저 퇴장 -> State 에 저장 -> State 변경 감지 및 삭제
    const userUnpublished = (user: any) => {
        setUnpublishedUid(user);
    }
    useEffect(() => {
        if (unpublishedUid){
            userUnsubscribe(unpublishedUid);
        }
    }, [unpublishedUid])

    // 유저의 Subscribe
    const userSubscribe = async (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");

        if (mediaType === 'video' && user.hasVideo) {
            (user.videoTrack as any).play(`Agora-Player-${user.uid}`);
        } 
        if (mediaType === 'audio' && user.hasAudio) {
            (user.audioTrack as any).play();
        }
    }

    // 유저의 Unsubscribe
    const userUnsubscribe = async (user: any) => {
        const index = publishedUids.findIndex((publishedUser) => publishedUser.uid === user.uid);
        if(index !== -1){
            setPublishedUids(prev => [...prev].splice(index, 1));
        }
    }

    // 비디오 Off 일 때 Image를 출력
    // const displayImage = (uid: string) => {
    //     let profileImage = 'Profile.png';
    //     if (users[uid] && users[uid].profileImage) {
    //         profileImage = users[uid].profileImage;
    //     }
    //     return (
    //         <div className="Agora-Player-Image-Wrapper">
    //             <img className="Agora-Player-Image" src={profileImage} alt="Image"/>
    //         </div>
    //     );
    // }
    // UID 에 대한 이름을 출력
    const displayName = (uid: any) => {
        let name = 'undefined';
        if (users[uid] && users[uid].name){
            name = users[uid].name;
        }
        return (
            <div className="Agora-Player-Name">{name}</div>
        );
    }
    
    return (
        <AgoraBox>
            <ul className="Agora-Videos">
            {joined
            ?<>
                <li id="Agora-Local-Player" className="Agora-Stream">
                    {displayName(my_uid)}
                </li>
                {
                publishedUids.map(users => {
                    const uid = users.uid;
                    return (
                        <li id={`Agora-Player-${uid}`} className="Agora-Stream">
                            {displayName(uid as string)}
                        </li>
                    );
                })
                }</>
            : null}
            </ul>
            <section className="Agora-Controller">
                <input
                    type="button"
                    value="Join"
                    onClick={joinChannel}
                    disabled={joined ? true : false}
                    />
                <input
                    type="button"
                    value="Leave"
                    onClick={leaveChannel}
                    disabled={joined ? false : true}
                    />
                <input
                    type="button"
                    value={myVideo ? "Off" : "Display"}
                    onClick={() => setMyVideo(prev => !prev)}
                    />
            </section>
        </AgoraBox>
    );
}

export default Agora;