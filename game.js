'use strict';

const CASE_DATA = {
  culprit: '파이리',
  evidence: [
    { id: 'access', icon: '🔑', name: '보관실 출입 기록', desc: '전자 잠금장치 로그', detail: '20:09, 파이리의 출입 카드로 보관실 문이 열렸다.' },
    { id: 'camera', icon: '📹', name: '복도 CCTV 영상', desc: '20:09 복도 녹화', detail: '영상에는 파이리가 보관실 안으로 들어가는 모습이 선명하게 찍혀 있다.' },
    { id: 'wrapper', icon: '🔥', name: '그을린 씨앗 포장지', desc: '보관함 옆에서 발견', detail: '포장지 가장자리에 작은 불꽃으로 그을린 흔적이 남아 있다.' },
    { id: 'analysis', icon: '🧪', name: '그을음 분석 보고서', desc: '연구원 감정 결과', detail: '포장지의 그을음은 파이리의 꼬리 불꽃과 같은 열 흔적을 보인다.' },
    { id: 'footprints', icon: '💧', name: '젖은 발자국', desc: '보관실 바닥에서 발견', detail: '보관실 문 안쪽에 물기가 남아 있다. 사건과 직접 관련 있는지는 불분명하다.' },
    { id: 'pot', icon: '🪴', name: '깨진 화분 조각', desc: '창문 아래에서 발견', detail: '화분은 창문 근처에서 깨졌지만, 씨앗 보관함과는 거리가 있다.' }
  ],
  rounds: [
    {
      witness: '파이리', avatar: '🔥',
      statements: [
        '사건이 일어난 20시 10분쯤 나는 보관실에 들어간 적이 없어.',
        '내 출입 카드는 그날 하루 종일 내 방에 있었어.'
      ],
      correct: { statement: 1, evidence: 'access' },
      explanation: '출입 기록에는 20:09에 파이리의 출입 카드가 사용됐다고 나옵니다. 카드가 방에 있었다는 진술과 모순됩니다.'
    },
    {
      witness: '피카츄', avatar: '⚡',
      statements: [
        '20시 9분쯤 복도 CCTV를 확인했어. 파이리는 그때 연구소 밖에 있었어.',
        '그 시간에 보관실 문은 계속 잠겨 있었어.'
      ],
      correct: { statement: 0, evidence: 'camera' },
      explanation: 'CCTV 영상에는 20:09에 파이리가 보관실 안으로 들어가는 장면이 찍혀 있습니다. 연구소 밖에 있었다는 진술은 사실과 다릅니다.'
    },
    {
      witness: '파이리', avatar: '🔥',
      statements: [
        '씨앗 포장지에 불이 닿은 적은 없어. 나는 포장지 근처에도 가지 않았어.',
        '그을음은 연구소의 난방 장치 때문에 생겼을 거야.'
      ],
      correct: { statement: 0, evidence: 'analysis' },
      explanation: '감정 결과 포장지의 그을음은 파이리의 꼬리 불꽃과 같은 열 흔적을 보입니다. 출입 기록과 CCTV까지 종합하면 파이리가 범인이라는 결론에 도달할 수 있습니다.'
    }
  ]
};

const $ = (id) => document.getElementById(id);
const screenIds = ['homeScreen', 'caseScreen', 'trialScreen', 'resultScreen'];
let playMode = 'solo';
let roundIndex = 0;
let selectedEvidence = null;
let selectedStatement = 0;
let solvedRounds = new Set();
let mistakes = 0;

function showScreen(id) {
  screenIds.forEach((screenId) => {
    const node = $(screenId);
    if (node) node.classList.toggle('active', screenId === id);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startCase(mode) {
  playMode = mode;
  roundIndex = 0;
  selectedEvidence = null;
  selectedStatement = 0;
  solvedRounds = new Set();
  mistakes = 0;
  renderRound();
  showScreen('trialScreen');
}

function renderRound() {
  const round = CASE_DATA.rounds[roundIndex];
  if (!round) return;
  selectedEvidence = null;
  selectedStatement = 0;
  $('roundLabel').textContent = playMode === 'local'
    ? `친구와 교대 추리 · 심리 ${roundIndex + 1} / ${CASE_DATA.rounds.length}`
    : `심리 ${roundIndex + 1} / ${CASE_DATA.rounds.length}`;
  $('sideRound').textContent = `${roundIndex + 1} / ${CASE_DATA.rounds.length}`;
  $('witnessName').textContent = `증인 · ${round.witness}`;
  $('witnessAvatar').textContent = round.avatar;
  $('speechName').textContent = `${round.witness}의 진술`;
  $('statementText').textContent = round.statements[0];
  $('statementList').replaceChildren();

  round.statements.forEach((statement, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `statement-btn${index === 0 ? ' active' : ''}`;
    button.textContent = `진술 ${index + 1}`;
    button.addEventListener('click', () => {
      selectedStatement = index;
      $('statementText').textContent = statement;
      $('statementList').querySelectorAll('.statement-btn').forEach((item, itemIndex) => {
        item.classList.toggle('active', itemIndex === index);
      });
    });
    $('statementList').append(button);
  });

  $('evidenceGrid').replaceChildren();
  CASE_DATA.evidence.forEach((evidence) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'evidence-card';
    button.innerHTML = `<span class="ev-icon"></span><b></b><small></small>`;
    button.querySelector('.ev-icon').textContent = evidence.icon;
    button.querySelector('b').textContent = evidence.name;
    button.querySelector('small').textContent = evidence.desc;
    button.setAttribute('aria-label', `${evidence.name}: ${evidence.desc}`);
    button.addEventListener('click', () => {
      selectedEvidence = evidence.id;
      $('evidenceGrid').querySelectorAll('.evidence-card').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
      $('submitEvidence').disabled = false;
    });
    $('evidenceGrid').append(button);
  });

  $('submitEvidence').disabled = true;
  $('feedback').textContent = solvedRounds.has(roundIndex)
    ? '이 심리는 이미 해결했습니다. 다음 심리로 진행할 수 있습니다.'
    : '진술과 증거를 선택해 제출하세요.';
  $('feedback').className = 'feedback';
  $('witnessHint').textContent = '진술을 읽고 모순되는 부분을 찾아보세요.';
  $('previousRound').disabled = roundIndex === 0;
  $('nextRound').textContent = roundIndex === CASE_DATA.rounds.length - 1 ? '판결 확인' : '다음 심리 →';
}

function submitEvidence() {
  if (selectedEvidence === null) return;
  const round = CASE_DATA.rounds[roundIndex];
  if (solvedRounds.has(roundIndex)) {
    $('feedback').textContent = '이미 해결한 심리입니다. 다음 심리로 이동하세요.';
    $('feedback').className = 'feedback good';
    return;
  }
  const isCorrect = selectedStatement === round.correct.statement && selectedEvidence === round.correct.evidence;
  if (isCorrect) {
    solvedRounds.add(roundIndex);
    $('feedback').textContent = `정답입니다! ${round.explanation}`;
    $('feedback').className = 'feedback good';
    $('witnessHint').textContent = '모순을 밝혀냈습니다. 다음 심리로 진행하세요.';
    $('submitEvidence').disabled = true;
  } else {
    mistakes += 1;
    const evidence = CASE_DATA.evidence.find((item) => item.id === selectedEvidence);
    $('feedback').textContent = `이 조합으로는 모순을 입증할 수 없습니다. 선택한 증거: ${evidence ? evidence.name : '알 수 없음'}. 진술과 증거를 다시 살펴보세요.`;
    $('feedback').className = 'feedback bad';
  }
}

function finishTrial() {
  const allSolved = solvedRounds.size === CASE_DATA.rounds.length;
  showScreen('resultScreen');
  $('resultIcon').textContent = allSolved ? '⚖' : '📁';
  $('resultTitle').textContent = allSolved ? '모든 모순을 밝혀냈다!' : '재판이 종료되었습니다';
  $('resultText').textContent = allSolved
    ? '핵심 증거를 모두 찾아 사건의 진실을 밝혀냈습니다.'
    : `전체 ${CASE_DATA.rounds.length}개 심리 중 ${solvedRounds.size}개를 해결했습니다. 사건 기록을 다시 살펴보세요.`;
  const modeLine = playMode === 'local' ? '<br>플레이 방식: 같은 기기 2인 교대 추리' : '<br>플레이 방식: 싱글플레이';
  $('verdictBox').innerHTML = `<b>사건 요약</b><br>피해자: 이상해씨<br>사건: 희귀 씨앗 절도<br>추리 성공: ${solvedRounds.size} / ${CASE_DATA.rounds.length}${modeLine}<br>잘못된 증거 제출: ${mistakes}회<br><br><b>사건의 진실</b><br>범인은 파이리입니다. 출입 기록과 CCTV 영상, 그을음 분석 결과가 파이리의 진술과 모순됩니다.`;
}

function bindEvents() {
  $('startSolo').addEventListener('click', () => { playMode = 'solo'; showScreen('caseScreen'); });
  $('startLocal').addEventListener('click', () => { playMode = 'local'; showScreen('caseScreen'); });
  $('enterCourt').addEventListener('click', () => startCase(playMode));
  $('homeLink').addEventListener('click', (event) => { event.preventDefault(); showScreen('homeScreen'); });
  $('backHome').addEventListener('click', () => showScreen('homeScreen'));
  $('playAgain').addEventListener('click', () => { showScreen('caseScreen'); });
  $('previousRound').addEventListener('click', () => { if (roundIndex > 0) { roundIndex -= 1; renderRound(); } });
  $('nextRound').addEventListener('click', () => {
    if (roundIndex < CASE_DATA.rounds.length - 1) { roundIndex += 1; renderRound(); }
    else finishTrial();
  });
  $('submitEvidence').addEventListener('click', submitEvidence);
  $('giveUp').addEventListener('click', finishTrial);
}

bindEvents();
