# Agora WebRTC

[RingleStudy - WebRTC](https://dev-recruiting.ringleplus.com/d7739606-a5f2-4a45-8898-6905e556c242)

Agora WebRTC + Firebase를 활용하여, voice 및 text chat이 가능한 서비스 만들기

- 기간 : 2021.04.12 - 2021.04.21

## [HomePage](https://pyo-sh.github.io/React_WebRTC/#/)

## About Projects

### Environment

회원가입 및 로그인을 통해 자신의 정보를 만들 수 있고 이를 통해 다른 사람과 화상 및 텍스트 채팅을 할 수 있는 기능

* React App with Typescript

* Redux

* Redux-Saga

* Firebase

* Agora

### Login

Redux 에서 유저 정보를 저장하고 있으며 유저 정보가 없을 시 화면을 출력

![login](https://user-images.githubusercontent.com/55688122/116821974-564a3200-abb7-11eb-8554-f98aab2c885f.PNG)

### Signup

회원가입하고 싶은 정보들을 입력하고 이를 검증하여 전부 적합하다 싶으면 Firebase를 통해 회원가입 요청 (성공한다면 로그인 및 정보 저장)

![signup](https://user-images.githubusercontent.com/55688122/116822036-ad500700-abb7-11eb-8009-cdabf235afe8.PNG)

### Lobby

Redux 에서 유저 정보를 저장하고 있을 때 자신이 어떤 채팅방에 속해있는지 출력

초대 됐거나 만든 방의 목록이 주어진다

![basic](https://user-images.githubusercontent.com/55688122/116822091-e0929600-abb7-11eb-9f62-9d65cf844894.PNG)

자신만의 방을 생성할 수 있고 초대는 방 안에서 가능하다.

클릭 시 방에 입장할 수 있다.

![Created](https://user-images.githubusercontent.com/55688122/116822137-0ae45380-abb8-11eb-91b9-9ce50ddaf1fe.PNG)

### Room

방을 처음 생성하고 혼자 진입했을 때의 모습

화상 채팅에는 자동으로 입장되며 방 안의 채팅을 할 수 있고 현재 접속중인 유저에 대한 정보를 볼 수 있다.

유저를 초대할 수 있고 초대된다면 초대 됐다는 창과 함께 그 유저에게 방의 목록을 추가할 수 있다.

![onChat](https://user-images.githubusercontent.com/55688122/116822162-30715d00-abb8-11eb-89e2-76fc7f35105b.PNG)

최종 연결이 된 모습은 아래와 같다.

웹캠이 없는 상태에서 접속하더라도 정상작동이 되는 것을 확인할 수 있다.

![Connected](https://user-images.githubusercontent.com/55688122/116822190-67e00980-abb8-11eb-8a7e-d5086d32072d.PNG)


## Review

스터디는 2주 동안 이였지만 생각보다 시간이 적었다.

첫 Firebase 사용 및 WebRTC에 대한 공부를 함께 병행하다보니 사실 시간이 많이 부족했다.

더 만들 수 있다면 아래와 같은 내용을 추가적으로 구현하거나 최적화하고 싶다.

* State 관련 최적화 진행 (useCallback, useMemo ...)

* WebRTC의 웹캠 / 마이크의 On / Off의 여부에 따라 상대방에도 Display

* WebRTC의 UserInfo 함수를 통해 User의 실시간 정보를 Update

* 친구 추가 기능

* 유저 정보 및 방 정보 수정과 삭제

비록 위의 내용에 대한 아쉬움이 남지만 얻어가는 것은 많았다.

공식 문서 참조에 대한 중요성, Redux / Saga 사용에 대한 숙련도, Deploy 시 HashRouter를 통한 Github Page 사용 등이 있지만,

채팅, 웹캠, 마이크 등에 대한 구현을 완성했다는 것이 가장 뿌듯했던 것 같다.