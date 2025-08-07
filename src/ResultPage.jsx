import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Paper, Button, Grid
} from '@mui/material';

const depressiveItems = [1,2,3,5,6,8,9,17,19];
const reflectiveItems = [7,11,12,20,21,22];
const broodingItems = [4,10,13,14,15,16,18];

const T_SCORE_PARAMS = {
  total: { mean: 40.73, sd: 13.85 },
  depressive: { mean: 16.25, sd: 5.69 },
  reflective: { mean: 10.38, sd: 4.11 },
  brooding: { mean: 14.13, sd: 5.19 },
};

function calcSum(indices, responses) {
  return indices.reduce((sum, i) => sum + (responses[i - 1] || 0), 0);
}

function calcT(sum, mean, sd) {
  return Math.round(50 + 10 * ((sum - mean) / sd));
}

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const raw = searchParams.get("data");

  if (!raw) return <Typography>결과 데이터를 찾을 수 없습니다.</Typography>;

  const responses = JSON.parse(decodeURIComponent(raw));

  const totalScore = responses.reduce((a, b) => a + (b || 0), 0);
  const dep = calcSum(depressiveItems, responses);
  const ref = calcSum(reflectiveItems, responses);
  const bro = calcSum(broodingItems, responses);

  const tTotal = calcT(totalScore, T_SCORE_PARAMS.total.mean, T_SCORE_PARAMS.total.sd);
  const tDep = calcT(dep, T_SCORE_PARAMS.depressive.mean, T_SCORE_PARAMS.depressive.sd);
  const tRef = calcT(ref, T_SCORE_PARAMS.reflective.mean, T_SCORE_PARAMS.reflective.sd);
  const tBro = calcT(bro, T_SCORE_PARAMS.brooding.mean, T_SCORE_PARAMS.brooding.sd);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h6" gutterBottom>📊 피드백 결과 (T Score)</Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}><b>반추적 반응 (총점)</b>: {tTotal}</Grid>
          <Grid item xs={12}><b>우울형 반추 (Depressive Rumination)</b>: {tDep}</Grid>
          <Grid item xs={12}><b>숙고 (Reflective Pondering)</b>: {tRef}</Grid>
          <Grid item xs={12}><b>자책 (Brooding)</b>: {tBro}</Grid>
        </Grid>
      </Paper>

      <Button
      variant="outlined"
      fullWidth
      onClick={() => navigate('/', { replace: true })} // ✅ replace 옵션도 같이 넣는 걸 추천
    >
      다시 하기
    </Button>
    </Container>
  );
}
