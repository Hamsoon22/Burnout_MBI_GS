// BurnoutSurveyGS.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import "./langButtons.css";

const translations = {
  ko: {
    title: "📋 MBI GS 설문지",
    instruction:
      "다음 질문에 0에서 6 사이의 점수로 답해주세요.\n(0: 전혀없다, 1: 1년에 2-3회 또는 그 미만, 2: 한 달에 한 번 또는 그 미만, 3: 한 달에 2-3회, 4: 일주일에 1회 정도, 5: 일주일에 2-3회, 6: 매일)",
    submit: "결과 보기",
    labels: ["전혀없다", "1년에 2-3회 또는 그 미만", "한 달에 한 번 또는 그 미만", "한 달에 2-3회", "일주일에 1회 정도", "일주일에 2-3회", "매일"],
    questions: [
      "맡은 일을 하는 데 있어서 정서적으로 고갈된 느낌이 든다.",
      "일을 마치고 퇴근할 때쯤이면 기진맥진한 느낌이 든다.",
      "아침에 일어나서 다시 출근할 생각을 하면 피곤한 느낌이 든다.",
      "하루 종일 일하는 것은 나를 긴장시킨다.",
      "나는 직무상 발생하는 문제들을 효과적으로 해결한다.",
      "일 때문에 소진된 상태이다.",
      "직장에 효과적인 기여를 하고 있다고 느낀다.",
      "이 일을 시작한 이후로 내 일에 대한 관심이 줄었다.",
      "맡은 일을 하는데 있어서 소극적이 되었다.",
      "내가 생각할 때, 나는 일을 잘한다.",
      "직무상 무언가를 성취했을 때 기쁨을 느낀다.",
      "나는 현재의 직무에서 가치 있는 많은 것을 이루어왔다.",
      "나는 방해받지 않고 내 일을 수행하기 원할 뿐이다.",
      "내 일이 무언가에 기여하든 말든 나는 점점 더 냉소적이 되었다.",
      "내 일의 중요성이 의심스럽다.",
      "나는 일을 효과적으로 처리하고 있다는 자신감이 있다."
    ]
  },
  en: {
    title: "📋 MBI GS Survey",
    instruction:
      "Please respond using a score from 0 to 6.\n(0: Never, 1: A few times a year or less, 2: Once a month or less, 3: A few times a month, 4: Once a week, 5: A few times a week, 6: Every day)",
    submit: "View Results",
    labels: ["Never", "A few times a year or less", "Once a month or less", "A few times a month", "Once a week", "A few times a week", "Every day"],
    questions: [
      "I feel emotionally drained from my work.",
      "I feel used up at the end of the workday.",
      "I feel tired when I get up in the morning and have to face another day on the job.",
      "Working all day is really a strain for me.",
      "I can effectively solve the problems that arise in my work.",
      "I feel burned out from my work.",
      "I feel I am making an effective contribution to what this organization does.",
      "I have become less interested in my work since I started this job.",
      "I have become less enthusiastic about my work.",
      "In my opinion, I am good at my job.",
      "I feel exhilarated when I accomplish something at work.",
      "I have accomplished many worthwhile things in this job.",
      "I just want to do my job and not be bothered.",
      "I have become more cynical about whether my work contributes anything.",
      "I doubt the significance of my work.",
      "At my work, I feel confident that I am effective at getting things done."
    ]
  },
  my: {
    title: "📋 MBI GS စစ်တမ်း",
    instruction:
      "အောက်ဖော်ပြပါမေးခွန်းများကို ၀ မှ ၆ အထိ အမှတ်ပေးပါ။\n(၀ - လုံးဝမရှိပါ၊ ၁ - တစ်နှစ်လျှင် အနည်းငယ် သို့မဟုတ် ပိုနည်းပါးသည်၊ ၂ - တစ်လလျှင် တစ်ကြိမ် သို့မဟုတ် ပိုနည်းပါးသည်၊ ၃ - တစ်လလျှင် အကြိမ်အနည်းငယ်၊ ၄ - တစ်ပတ်လျှင် တစ်ကြိမ်၊ ၅ - တစ်ပတ်လျှင် အနည်းငယ်၊ ၆ - နေ့စဉ်)",
    submit: "ရလဒ်ကြည့်မည်",
    labels: ["လုံးဝမရှိပါ", "တစ်နှစ်လျှင် အနည်းငယ် သို့မဟုတ် ပိုနည်းပါးသည်", "တစ်လလျှင် တစ်ကြိမ် သို့မဟုတ် ပိုနည်းပါးသည်", "တစ်လလျှင် အကြိမ်အနည်းငယ်", "တစ်ပတ်လျှင် တစ်ကြိမ်", "တစ်ပတ်လျှင် အနည်းငယ်", "နေ့စဉ်"],
    questions: [
      "ကျွန်ုပ်၏အလုပ်ကြောင့် စိတ်ပိုင်းဆိုင်ရာ ကုန်ခန်းနေသည်ဟု ခံစားရသည်။",
      "အလုပ်ပြီးဆုံးချိန်တွင် အင်အားကုန်ခန်းသွားသည်ဟု ခံစားရသည်။",
      "နောက်ရက်တွင် အလုပ်တစ်ခုကို ရင်ဆိုင်ရမည်ဖြစ်၍ နံနက်အိပ်ယာထချိန်တွင်ပင် ပင်ပန်းသည်ဟု ခံစားရသည်။",
      "တစ်နေကုန် အလုပ်လုပ်ရခြင်းသည် ကျွန်ုပ်အတွက် အလွန်ဖိစီးပင်ပန်းစေသည်။",
      "ကျွန်ုပ်၏အလုပ်တွင် ဖြစ်ပေါ်လာသော ပြဿနာများကို ထိထိရောက်ရောက် ဖြေရှင်းနိုင်သည်။",
      "ကျွန်ုပ်၏အလုပ်ကြောင့် အလွန်အမင်းပင်ပန်းနွမ်းနယ်နေသည်ဟု ခံစားရသည်။",
      "ဤအဖွဲ့အစည်း၏ လုပ်ဆောင်ချက်များတွင် ကျွန်ုပ်ထိရောက်စွာ ပံ့ပိုးကူညီနေသည်ဟု ခံစားရသည်။",
      "ဤအလုပ်ကို စတင်လုပ်ကိုင်ပြီးနောက် ကျွန်ုပ်၏အလုပ်အပေါ် စိတ်ဝင်စားမှု လျော့နည်းလာသည်။",
      "ကျွန်ုပ်၏အလုပ်အပေါ် စိတ်အားထက်သန်မှု လျော့နည်းလာသည်။",
      "ကျွန်ုပ်၏ထင်မြင်ချက်အရ ကျွန်ုပ်သည် ကျွန်ုပ်၏အလုပ်တွင် ကောင်းမွန်စွာလုပ်ဆောင်နိုင်သည်။",
      "အလုပ်တွင် တစ်စုံတစ်ရာ ပြီးမြောက်အောင်မြင်သောအခါ ကျွန်ုပ်ပျော်ရွှင်စိတ်လှုပ်ရှားမှုကို ခံစားရသည်။",
      "ဤအလုပ်တွင် အဖိုးတန်သော အရာများစွာကို ကျွန်ုပ်ပြီးမြောက်အောင်မြင်ခဲ့ပြီ။",
      "ကျွန်ုပ်သည် ကျွန်ုပ်၏အလုပ်ကိုသာ လုပ်လိုပြီး အနှောင့်အယှက်မခံလိုပါ။",
      "ကျွန်ုပ်၏အလုပ်က တစ်စုံတစ်ရာ အထောက်အကူပြုခြင်းရှိမရှိအပေါ် ပိုမိုသံသယဝင်လာသည်။",
      "ကျွန်ုပ်၏အလုပ်၏ အရေးပါမှုကို သံသယရှိသည်။",
      "ကျွန်ုပ်၏အလုပ်တွင် ကိစ္စရပ်များကို ထိထိရောက်ရောက် လုပ်ဆောင်နိုင်သည်ဟု ယုံကြည်မှုရှိသည်။"
    ]
  }
};

export default function BurnoutSurveyGS() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("ko");
  const { title, instruction, submit, labels, questions } = translations[lang];

  const handleSubmit = () => {
    const unanswered = questions.some((_, i) => {
      return !document.querySelector(`input[name='q${i}']:checked`);
    });

    if (unanswered) {
      alert("모든 문항에 응답해야 결과를 볼 수 있습니다.");
      return;
    }

    const getValue = (i) => {
      const selected = document.querySelector(`input[name='q${i}']:checked`);
      return selected ? parseInt(selected.value, 10) : 0;
    };

    const exhaustionIdx = [0, 1, 2, 3, 5];
    const depersonalIdx = [7, 8, 12, 13, 14];
    const efficacyIdx = [4, 6, 9, 10, 11, 15];

    const exhaustionSum = exhaustionIdx.reduce((sum, i) => sum + getValue(i), 0);
    const depersonalSum = depersonalIdx.reduce((sum, i) => sum + getValue(i), 0);
    const efficacySum = efficacyIdx.reduce((sum, i) => sum + getValue(i), 0);

    const exhaustionMean = exhaustionSum / exhaustionIdx.length;
    const depersonalMean = depersonalSum / depersonalIdx.length;
    const efficacyMean = efficacySum / efficacyIdx.length;

    const exhaustionT = 50 + 10 * (exhaustionMean - 2.26) / 1.47;
    const depersonalT = 50 + 10 * (depersonalMean - 1.74) / 1.36;
    const efficacyT = 50 + 10 * (efficacyMean - 4.34) / 1.17;

    navigate("/result", {
      state: {
        exhaustionSum,
        exhaustionMean,
        depersonalSum,
        depersonalMean,
        efficacySum,
        efficacyMean,
        exhaustionT,
        depersonalT,
        efficacyT,
        lang
      }
    });
  };

  return (
    <div className="burnout-container">
      <main className="burnout-main">
        <section className="burnout-section">
        <div className="burnout-lang-toggle" style={{ display: 'flex', gap: '8px', marginBottom: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => setLang('ko')}
              className={`lang-button ${lang === 'ko' ? 'active-lang' : ''}`}
            >
              🇰🇷 한국어
            </button>
            <button
              onClick={() => setLang('en')}
              className={`lang-button ${lang === 'en' ? 'active-lang' : ''}`}
            >
              🇺🇸 English
            </button>
            <button
              onClick={() => setLang('my')}
              className={`lang-button ${lang === 'my' ? 'active-lang' : ''}`}
            >
              🇲🇲 မြန်မာ
            </button>
        </div>
          <h2 className="burnout-title">{title}</h2>
          <p className="burnout-instruction">
            {instruction.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
          {questions.map((q, idx) => (
            <div key={idx} className="burnout-question-card">
              <h3>{idx + 1}. {q}</h3>
              <div className="burnout-options">
                {labels.map((label, i) => (
                  <label key={i} className="burnout-option">
                    <input type="radio" name={`q${idx}`} value={i} />
                    {i} - {label}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="burnout-button-center">
            <button className="burnout-button" onClick={handleSubmit}>{submit}</button>
          </div>
        </section>
      </main>
    </div>
  );
}
