# 모두의 인터뷰 (FE)

## 명령어

```bash
# 패키지 설치
npm install
# 개발 서버 실행
npm start
# 빌드
npm build
```

## 폴더구조

```bash
windows cmd command : tree src /f
mac os cmd command : tree src 
```

```bash
src
│  App.js
│  index.js
│
├─api
│      interview.js
│
├─assets
│      free-icon-man-3884851-p-500.png
│      free-icon-man-4086624-p-500.png
│      pexels-fauxels-3182765_gnR1cf24-p-1080.webp
│      recruitment-6838250_1920.png
│
├─components
│      footer.jsx
│      header.jsx
│      loading.jsx
│
├─constants
│      interviewChatConst.js
│      interviewFeedbackConst.js
│      interviewInputConst.js
│      interviewRoomConst.js
│      serviceConst.js
│
├─fonts
│      GmarketSansTTFBold.ttf
│      GmarketSansTTFLight.ttf
│      GmarketSansTTFMedium.ttf
│      IBMPlexSansKR-Regular.ttf
│      NanumGothic.ttf
│
├─pages
│  │  error_page.jsx
│  │  interviewRoom.jsx
│  │  main.jsx
│  │
│  └─interviewRoom
│          interviewChat.jsx
│          interviewFeedback.jsx
│          interviewInput.jsx
│
├─store
│      interviewChatAtom.js
│      interviewRoomAtom.js
│      loadingAtom.js
│
├─styles
│      animation.css
│      button.hover.css
│      error.module.css
│      font.css
│      footer.module.css
│      header.module.css
│      index.css
│      interviewChat.module.css
│      interviewFeedback.module.css
│      interviewInput.module.css
│      layout.css
│      loading.css
│      main.module.css
│      radio.input.css
│      range.input.css
│      toast.css
│
└─utils
        interviewSummaryGenerator.js
        scrollRestoration.jsx
        toastContainer.jsx
        useInterval.js
        useTitle.js
```