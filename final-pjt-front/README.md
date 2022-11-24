# MovieRecommendApp

### SSAFY 1학기 최종 프로젝트 - 영화 추천 앱 제작
#### 계획
![image](https://user-images.githubusercontent.com/109333410/203188330-5b5ae6c6-f884-4db8-8055-b0c465d3cb49.png)
![image](https://user-images.githubusercontent.com/109333410/203188778-79f8ed63-b462-4064-996d-34595daa8fba.png)



# Welcome to MoJi 👋

![Version](images/README/version-0.1.0-blue.svg)

<img src="final-pjt-front\src\assets\logo.png.png">

> MoJi (Movie 뭐보Ji) 웹사이트

### 🏠 [Homepage](https://brave-hamilton-108ad5.netlify.app/)

<br>

## ⚙️ 실행 방법

- final-pjt-back에서 필요한 패키지를 설치합니다.

  - ```bash
    $ pip install -r requirements.txt
    ```

- migrate을 실행합니다.

  - ```bash
    $ python manage.py migrate
    $ python manage.py runserver
    ```

- Django 프로젝트를 실행합니다.

  - ```bash
    $ python manage.py runserver
    ```

- final-pjt-front에서 필요한 패키지를 설치합니다.

  - ```bash
    $ npm i
    ```

- Vue 프로젝트를 실행합니다

  - ```bash
    $ npm run serve
    ```

<br>

## 👥 팀원 및 업무 분담

**Gill Sang Uk &  Song Eun Ji**

- 길상욱: 프론트엔드 담당 - 화면 설계 및 디자인, Vue Cli 및 Axios를 통한 REST API 활용

- 송은지: 백엔드 담당 - DB/ Django REST API 설계, Vue Cli 및 Axios 로직 구현 

<br>

## 📆 개발 계획

- 진행 기간: 2022.06.15 ~ 2022.11.24
- 목표: 사람들의 선호도에 맞게 영화를 추천하고 영화 마다 사람들의 의견을 들어보자
- 웹사이트 이름: MoJi
  - 영화를 추천하는 사이트로 영화 뭐볼까?라는 생각이 들면 들어오는 사이트로 만들고 싶었습니다.
  - 이를 바탕으로 영화를 영어로한 Movie의 'Mo'와 뭐보지의 'Ji'를 합쳐서 'Moji'가 저희 팀의 이름이 되었습니다.

<br>

## 📒 Tech Log

- <a href="./DailyREADME/README_1116.md">11/16 - 기획 + 개발 세팅 + 메인페이지 + 영화 디테일 페이지 + 리뷰 + 회원가입/로그인 페이지 + 사용자 인증</a>
- <a href="./DailyREADME/README_1117.md">11/17 - DB 수정 + 장르별 영화 랜덤 추천 + 영화, 리뷰 좋아요 + 전체적인 디자인 색상 정하기</a>
- <a href="./DailyREADME/README_1118.md">11/18 - 추천 알고리즘 구현 + 개인 프로필 구현 + NotFound 꾸미기</a>
- <a href="./DailyREADME/README_1119.md">11/19 - 선호하는 영화 검색 후 리스트 담기 + 영화 디테일 Modal + 영화 추천 페이지</a>
- <a href="./DailyREADME/README_1120.md">11/20 - 영화 좋아요 + 영화 리뷰 리스트 + 영화 로고 제작</a>
- <a href="./DailyREADME/README_1121.md">11/21 - 영화 추천 서비스 수정 + 영화 nav바 수정 + 영화 추천 Pagination 적용</a>
- <a href="./DailyREADME/README_1122.md">11/22 - 영화 리뷰 작성 Modal + 리뷰 댓글 작성 Modal + 리뷰 댓글 리스트</a>
- <a href="./DailyREADME/README_1123.md">11/23 - 영화 리뷰 좋아요 + 추천 알고리즘 수정 + 로딩창 수정</a>
- <a href="./DailyREADME/README_1124.md">11/24 - 배포 완료 + 팔로잉 기능 </a>

<br>

## 🔧 Tech Stack

- **Front-end**
  - Vue CLI
  - npm
  - Font Awesome
  - Bootstrap 4
  - Sweet Alert2

- **Back-end**
  - Django
  - Django-rest-auth
  - python

<br>

## 📌 DB Modeling(ERD)
<img src="ERD.drawio.png">

## 📌 DB Modeling(ERD)
<img src="ERD.drawio.png">

<br>

## ⭐️ 핵심 기능

![capture-2500935](images/README/capture-2500935.png)

<br>

## 💡 Pages

> Heroku와 Netlify를 이용해 배포한 웹사이트입니다.

### 1.회원가입 페이지


회원가입은 username, nickname, password 정보를 입력함으로 가능하다.

nickname은 고유값으로 다른 사람이 사용하고 있을 시 같은 값으로는 사용이 불가능하다.

password와 password comfirmation이 다를 경우 또는 사용하고 있는 nickname을 입력시 alert창과 입력값에 빨간색 테두리가 만들어진다.



### 회원가입 후 영화 선택 페이지

회원가입 후 선호하는 영화 정보에 맞추어서 영화를 추천해 주므로,


### 로그인 페이지



### 메인 페이지


### 영화 상세 페이지





### 리뷰 상세 페이지

![capture-2501284](images/README/capture-2501284.png)



### 프로필 페이지

![capture-2501162](images/README/capture-2501162.png)

![capture-2501387](images/README/capture-2501387.png)



### 장르별 익명 게시판 페이지

![capture-2501353](images/README/capture-2501353.png)

### footer

<img src="images/README/capture-2501418.png" alt="capture-2501418" style="zoom: 67%;" />

<br>

## 🎬 Video

- <a href="https://www.youtube.com/watch?v=joCXRFD6VUM&feature=youtu.be">8분 유튜브 영상</a>

<br>

## Show your support

Give a ⭐️ if this project helped you!

***

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_