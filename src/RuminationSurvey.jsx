import React, { useState } from 'react';
import {
  Container, Typography, Radio, RadioGroup, FormControlLabel,
  FormControl, FormLabel, Button, Paper, Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const questions = [
  "내가 얼마나 외로운지에 대해 생각한다.",
  "“이런 기분에서 빠져 나오지 못하면 일을 하지 못할 거야.”라고 생각한다.",
  "내가 얼마나 피로하고 아픈지에 대해 생각한다.",
  "집중하는 것이 얼마나 어려운지에 대해 생각한다.",
  "“내가 무슨 일을 했기에 이런 일을 당할까?”라고 생각한다.",
  "내가 얼마나 수동적이고 의욕이 없는지에 대해 생각한다.",
  "내가 왜 우울해졌는지 알아내기 위해 최근 사건들을 분석해 본다.",
  "이제 더 이상 아무 것도 느낄 수 없을 것만 같다고 생각한다.",
  "“왜 나는 꿋꿋하게 지내지 못할까?”하고 생각한다.",
  "“왜 나는 항상 이런 식으로 반응할까?”라고 생각한다.",
  "혼자 조용히 왜 내가 이렇게 느끼는지에 대해 생각한다.",
  "내가 생각하고 있는 것을 글로 쓰고 분석해 본다.",
  "최근의 상황이 더 나았으면 좋았을 걸 하고 생각한다.",
  "“계속 이런 식으로 느끼다가는 집중하는 게 힘들거야.” 라고 생각한다.",
  "“나는 왜 다른 사람들에게는 없는 문제가 있을까?”라고 생각한다.",
  "“왜 나는 더 잘 대처하지 못할까?”라고 생각한다.",
  "내가 얼마나 슬픈지에 대해 생각한다.",
  "나의 단점과 실패들, 잘못, 실수에 대해 생각한다.",
  "아무 것도 할 기분이 안 든다는 생각을 한다.",
  "내가 왜 우울해졌는지 이해하려고 나의 성격을 분석해 본다.",
  "혼자 어디론가 가서 내 기분에 대해 생각한다.",
  "내가 스스로에게 얼마나 화가 났는지에 대해 생각한다.",
];

export default function RuminationSurvey() {
  const [responses, setResponses] = useState(Array(22).fill(null));
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const updated = [...responses];
    updated[index] = parseInt(value);
    setResponses(updated);
  };

  const handleSubmit = () => {
    const encoded = encodeURIComponent(JSON.stringify(responses));
    navigate(`/result?data=${encoded}`);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>나는 우울할 때…</Typography>
      <Typography variant="body1" gutterBottom>
        사람들은 우울할 때 여러 가지 생각과 행동을 하게 됩니다. <br />
        아래 문항들을 읽고 우울할 때 이러한 생각이나 행동을 어느 정도 하는지를 선택해 주세요.
      </Typography>

      {questions.map((question, index) => (
        <Paper key={index} sx={{ my: 2, p: 2 }} elevation={2}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">{index + 1}. {question}</FormLabel>
            <RadioGroup
              row
              value={responses[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
            >
              <FormControlLabel value={1} control={<Radio />} label="거의 전혀 아니다" />
              <FormControlLabel value={2} control={<Radio />} label="가끔 그렇다" />
              <FormControlLabel value={3} control={<Radio />} label="자주 그렇다" />
              <FormControlLabel value={4} control={<Radio />} label="거의 언제나 그렇다" />
            </RadioGroup>
          </FormControl>
        </Paper>
      ))}

      <Button
        variant="contained"
        fullWidth
        disabled={responses.includes(null)}
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        결과 보기
      </Button>
    </Container>
  );
}