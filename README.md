# 🧠 Rumination Survey (루미네이션 설문)

이 프로젝트는 반추(rumination) 경향을 측정하는 설문 도구입니다.  
사용자는 "나는 우울할 때..."라는 문장을 시작으로 22개의 문항에 답변하고,  
그 결과로 T-점수 기반 피드백을 받을 수 있습니다.

---

## 🔍 사용 기술

- React
- React Router v6
- Material-UI (MUI)
- GitHub Pages 배포 (`gh-pages`)

---

## ✨ 기능

- 우울 시 사고/행동에 대한 22개 문항 설문
- 총점 기반 반추적 반응 점수 + 세부 척도
  - 우울형 반추 (Depressive Rumination)
  - 숙고 (Reflective Pondering)
  - 자책 (Brooding)
- T-score 계산 (Shin et al., 2015 기반)
- 모바일 친화적 UI (Material-UI)
- 결과 페이지 → "다시하기" 버튼으로 설문 초기화

---

## 📦 설치 및 실행

```bash
# 설치
npm install

# 개발 서버 실행
npm start

# 빌드 및 배포
npm run build
npm run deploy
