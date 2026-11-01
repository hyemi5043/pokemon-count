'use strict';

/* Pokémon Court: 정의의 여정 — 혼합형 픽셀 RPG 프로토타입 */
const $ = (id) => document.getElementById(id);
const SAVE_KEY = 'pokemonCourtHybrid_v3_save';
const RANKS = [
  {name:'견습 판사',min:1,max:10},{name:'초급 판사',min:11,max:20},
  {name:'중급 판사',min:21,max:30},{name:'상급 판사',min:31,max:40},
  {name:'전문 판사',min:41,max:50},{name:'베테랑 판사',min:51,max:60}
];
const JUDGES = [
  {id:'pikachu',name:'피카츄',emoji:'⚡',ability:'전류 감지',desc:'전자 장치와 전기 흔적 조사에 유리하다.',skill:'전기 장치 조사 지점에서 추가 기록을 발견한다.'},
  {id:'lucario',name:'루카리오',emoji:'🐺',ability:'파동 감지',desc:'보이지 않는 흔적과 현장의 이상을 감지한다.',skill:'숨겨진 흔적을 찾는 조사에 특화되어 있다.'},
  {id:'gardevoir',name:'가디안',emoji:'🧚',ability:'감정 공명',desc:'증언자의 감정 변화와 심리적 동요를 읽는다.',skill:'증언 분석 시 집중력 손실을 줄인다.'},
  {id:'zorua',name:'조로아크',emoji:'🦊',ability:'환영 간파',desc:'위장과 조작된 현장의 흔적을 찾아낸다.',skill:'위장된 조사 지점을 발견하기 쉽다.'},
  {id:'rotom',name:'로토무',emoji:'🔌',ability:'기계 분석',desc:'전자 기록과 기계 장치의 데이터를 분석한다.',skill:'기록 장치와 기계 흔적 조사에 특화되어 있다.'},
  {id:'gengar',name:'팬텀',emoji:'👻',ability:'그림자 추적',desc:'어두운 장소에 남은 미세한 흔적을 찾는다.',skill:'은밀한 현장 단서를 조사하는 데 유리하다.'},
  {id:'meowth',name:'나옹',emoji:'🐱',ability:'물건 탐색',desc:'작은 물건과 떨어진 소지품을 잘 찾아낸다.',skill:'분실물과 물리 증거 탐색에 특화되어 있다.'},
  {id:'alakazam',name:'후딘',emoji:'🥄',ability:'논리 분석',desc:'복잡하게 얽힌 증거의 관계를 분석한다.',skill:'법정에서 증거 조합의 실수를 한 번 보정한다.'},
  {id:'eevee',name:'이브이',emoji:'🦊',ability:'적응력',desc:'어떤 사건에서도 빠르게 조사 방법을 익힌다.',skill:'모든 조사 유형에 작은 보너스를 얻는다.'},
  {id:'arcanine',name:'윈디',emoji:'🐕',ability:'후각 추적',desc:'냄새와 이동 경로를 따라 흔적을 추적한다.',skill:'발자국과 냄새 흔적을 더 쉽게 분석한다.'},
  {id:'ampharos',name:'전룡',emoji:'💡',ability:'광원 조사',desc:'어두운 현장과 빛의 흔적을 조사한다.',skill:'어두운 장소의 단서를 찾는 데 유리하다.'},
  {id:'slowking',name:'야도킹',emoji:'👑',ability:'기억 정리',desc:'목격자의 복잡한 기억을 정리한다.',skill:'증언의 순서를 재구성하는 데 유리하다.'}
];
const MONS = [
  {name:'피카츄',emoji:'⚡'},{name:'나옹',emoji:'🐱'},{name:'꼬부기',emoji:'🐢'},{name:'식스테일',emoji:'🦊'},
  {name:'고라파덕',emoji:'🦆'},{name:'주뱃',emoji:'🦇'},{name:'삐삐',emoji:'🌙'},{name:'팬텀',emoji:'👻'},
  {name:'이브이',emoji:'🦊'},{name:'마릴',emoji:'💧'},{name:'에나비',emoji:'🐈'},{name:'로토무',emoji:'🔌'},
  {name:'조로아',emoji:'🦊'},{name:'데덴네',emoji:'⚡'},{name:'야도란',emoji:'🦞'},{name:'루카리오',emoji:'🐺'},
  {name:'가디안',emoji:'🧚'},{name:'리오르',emoji:'🐾'},{name:'메타몽',emoji:'🟣'},{name:'토게피',emoji:'🥚'}
];
const STAGE_NAMES = [
 '첫 번째 법정','증거의 무게','엇갈린 발자국','목격자의 침묵','견습 판사의 선고',
 '부서진 시계','사라진 기록','위증의 그림자','뒤바뀐 알리바이','항소심의 시작',
 '어둠 속의 거래','가짜 범인','사라진 증거품','두 명의 용의자','검은 장부',
 '무너진 증언','조작된 현장','배후의 그림자','판사의 선택','최후의 항소',
 '지역을 넘은 사건','사라진 전설','금지된 실험','거짓된 평화','법정의 균열',
 '최후의 증인','진실을 감춘 자','전설의 증거','최종 변론','정의의 여정'
];
const STAGE_DESC = [
 '작은 마을에서 시작된 첫 사건. 관찰과 기록의 기본을 익힌다.','증거 하나의 의미가 판결을 바꾼다. 세부를 놓치지 말자.','현장에 남은 흔적을 비교해 사건의 동선을 재구성한다.','서로 다른 목격자의 기억을 대조해 진실을 찾아라.','첫 번째 승급 심사. 지금까지 배운 조사와 심문을 활용한다.',
 '사건 발생 시각을 둘러싼 진술의 모순을 밝혀라.','사라진 기록의 행방과 누락된 시간을 추적한다.','증언 속 작은 거짓말이 사건 전체를 흔든다.','용의자의 알리바이를 증거와 대조한다.','새로운 관할로 넘어가기 전 항소 사건을 해결하라.',
 '서로 모르는 포켓몬 사이의 거래를 조사한다.','피고가 범인이라는 주장이 정말 사실인지 검증한다.','증거품이 사라진 이유와 마지막 목격자를 찾아라.','복수의 용의자 중 진짜 책임자를 특정한다.','장부에 적힌 거래 내역의 암호를 풀어라.',
 '법정에서 뒤집힌 증언의 진짜 이유를 찾아라.','누군가 의도적으로 바꿔 놓은 현장을 분석한다.','사건 뒤에 숨은 조직의 연결고리를 밝혀라.','판결과 정의 사이에서 어려운 선택을 내려라.','상급 법정에서 이전 판결의 근거를 다시 검증한다.',
 '여러 지역에서 발생한 사건의 공통점을 찾아라.','전설의 포켓몬을 둘러싼 소문과 사실을 구분한다.','연구 기록과 현장 증거를 교차 검증한다.','평화로운 마을에 감춰진 갈등을 조사한다.','법정 제도 자체를 흔드는 거대한 음모가 드러난다.',
 '모든 증언을 기억하고 마지막 증인을 심문하라.','핵심 인물의 거짓말을 입증할 결정적 증거를 찾아라.','전설의 흔적을 둘러싼 최종 단서를 수집한다.','모든 사건의 실마리를 연결해 최종 변론을 완성하라.','여정의 마지막 재판. 정의의 의미를 스스로 증명하라.'
];
const LOCATIONS = ['숲속 마을','해안 항구','수정 광산','바람 언덕','왕립 도서관','고대 유적','설원 기지','별빛 연구소','중앙 광장','폐허가 된 극장'];
const CASE_TITLES = ['사라진 열매 사건','부서진 나침반','분실된 배지','수상한 발자국','꺼진 등대','바뀐 편지','사라진 공구 상자','깨진 수정 구슬','뒤바뀐 물품 표식','밤중의 종소리','숨겨진 거래 기록','도난당한 지도','거짓 목격담','잠긴 창고','사라진 연구 노트'];
const EVIDENCE_POOL = [
 ['젖은 발자국','창고 안쪽으로 이어지는 젖은 발자국이 발견되었다.','사건 시간에는 광장에 있었고 창고에는 가지 않았어.','그 시간에는 마을 밖에 있었어.','발자국의 방향과 진흙 상태가 진술한 이동 경로와 모순된다.'],
 ['찢어진 시간표','시간표의 찢긴 부분에서 사건 직전 이동 기록이 확인되었다.','그 물건은 사건이 끝난 뒤에야 처음 봤어.','그날은 하루 종일 도서관에 있었어.','시간표에 남은 기록은 피고가 사건 전 물건의 위치를 알고 있었음을 보여준다.'],
 ['부서진 잠금장치','잠금장치 안쪽에서 바깥 방향으로 난 긁힌 자국이 발견되었다.','창고 문은 내가 도착했을 때 이미 잠겨 있었어.','문은 처음부터 열려 있었어.','잠금장치의 손상 방향은 안쪽에서 문을 열었다는 설명과 맞지 않는다.'],
 ['목격자의 메모','목격자가 적어 둔 시각은 공식 진술과 20분 차이가 난다.','나는 그 시간에 혼자 있었고 누구와도 만나지 않았어.','사건이 끝난 뒤에 현장에 도착했어.','메모에는 피고와 동행한 포켓몬의 이름이 적혀 있다.'],
 ['반짝이는 가루','현장과 피고의 가방 안에서 같은 광물 가루가 검출되었다.','나는 광산 근처에 간 적이 없어.','광산에는 어제 잠깐 들렀어.','현장과 소지품에서 같은 광물 가루가 나와 장소 방문을 부인한 진술과 모순된다.'],
 ['기록 장치 로그','고장이라고 주장한 기록 장치에 사건 시각의 정상 기록이 남아 있다.','기록 장치는 사건 전부터 고장 나 있었어.','기록 장치는 사건 다음 날부터 고장 났어.','사건 시각의 기록이 정상적으로 저장되어 있어 고장 주장을 반박한다.'],
 ['젖지 않은 포장지','비를 맞은 흔적이 없는 포장지가 실외가 아닌 처마 안쪽에서 발견되었다.','그날은 비가 오지 않았어.','비가 그친 뒤 현장에 갔어.','기상 기록과 주변 물건의 젖은 흔적이 진술한 날씨와 다르다.'],
 ['끊어진 리본','리본의 매듭은 피고가 설명한 방식과 반대 방향으로 묶여 있다.','그 쪽지는 본 적이 없어.','쪽지를 읽었지만 바로 돌려줬어.','리본과 쪽지에 남은 흔적은 피고가 물건을 접촉했다는 점을 보여준다.'],
 ['희미한 냄새 흔적','현장에 남은 향이 피고의 소지품에서 확인된 향과 일치한다.','나는 그 장소에 간 적이 없어.','잠깐 입구까지만 갔어.','현장 냄새 흔적은 장소에 간 적이 없다는 진술과 맞지 않는다.'],
 ['숨겨진 쪽지','접힌 쪽지에는 사건 전에 피고와 물건을 옮기기로 한 약속이 적혀 있다.','그 물건은 사건이 끝난 뒤에야 처음 봤어.','그 물건을 옮기자는 제안을 거절했어.','사건 전 약속이 적힌 쪽지는 물건을 처음 봤다는 진술을 반박한다.'],
 ['깨진 시계 부품','시계의 내부 부품은 사건 추정 시각보다 먼저 멈춘 흔적을 보인다.','시계는 사건이 끝날 때까지 정상적으로 움직였어.','시계는 사건 전부터 느리게 가고 있었어.','내부 부품의 손상 시점은 시계가 정상 작동했다는 진술과 모순된다.'],
 ['창문 안쪽의 먼지','창문 안쪽에 바깥에서 들어온 흙먼지가 아닌 실내 먼지 자국이 남아 있다.','창문은 밖에서 열렸어.','창문은 안쪽에서 열렸어.','먼지의 쌓인 방향은 창문을 연 방향에 대한 진술을 뒤집는다.']
];
const STATEMENTS = [
 '나는 사건이 일어난 시간에 광장에 있었어. 현장에는 가지 않았어.',
 '그 물건은 사건이 끝난 뒤에야 처음 봤어. 만진 적도 없어.',
 '창고 문은 내가 도착했을 때 이미 잠겨 있었어.',
 '그날은 비가 오지 않았어. 바닥도 말라 있었지.',
 '나는 그 시간에 혼자 있었고, 누구와도 만나지 않았어.',
 '기록 장치는 사건 전부터 고장 나 있었어.',
 '목격자는 분명히 다른 포켓몬을 가리켰어.',
 '내가 그 장소를 떠난 뒤에는 아무도 들어오지 않았어.',
 '그 쪽지는 본 적이 없어. 무슨 내용인지도 몰라.',
 '시계는 사건이 끝날 때까지 정상적으로 움직였어.'
];
const WITNESSES = ['피카츄','꼬부기','나옹','식스테일','고라파덕','삐삐','이브이','마릴','데덴네','야도란','토게피','조로아'];
const state = {
  save:null, selectedJudge:null, currentStage:0, currentCase:null, player:{x:320,y:320}, collected:[], selectedStatement:null, selectedEvidence:null, roundIndex:0, focus:100, mistakes:0, lastResult:null, pendingRecruit:null, talkedWitness:false, mapFrame:0, toastTimer:null, alakazamGuardUsed:false
};
const freshSave = () => ({version:3,judge:null,level:1,xp:0,jp:0,wins:0,completed:[],unlockedStage:0,roster:[],party:[],stageStars:{},createdAt:Date.now()});
const rankFor = (level) => RANKS.find(r=>level>=r.min&&level<=r.max)?.name || '베테랑 판사';
const xpNeed = (level) => 80 + level*24;
const stageCaseCount = (stage) => 5 + Math.floor(stage/5);
const caseTotal = 225;
function stageCases(stage){return stageCaseCount(stage)}
function makeCase(stage,index){
  const id=`S${String(stage+1).padStart(2,'0')}-C${String(index+1).padStart(2,'0')}`;
  const seed=(stage*17+index*13)%997;
  const defendant=MONS[seed%MONS.length];
  const witness=WITNESSES[(seed+5)%WITNESSES.length];
  const guilty=((stage*3+index)%5)!==2; // 일부 사건은 무고한 피고가 등장한다.
  const rounds=2+Math.floor(stage/10);
  const evidenceCount=Math.min(5,3+Math.floor(stage/10));
  const evidence=[];
  for(let i=0;i<evidenceCount;i++){
    const item=EVIDENCE_POOL[(seed+i*3)%EVIDENCE_POOL.length];
    evidence.push({id:`${id}-E${i+1}`,name:item[0],description:item[1],claim:item[2],alternative:item[3],explain:item[4],kind:['현장','기록','물증','증언'][i%4]});
  }
  const title=CASE_TITLES[(seed+stage)%CASE_TITLES.length];
  const location=LOCATIONS[(stage+index)%LOCATIONS.length];
  const roundsData=[];
  for(let r=0;r<rounds;r++){
    const evidenceIndex=r%evidenceCount;
    const clue=evidence[evidenceIndex];
    const options=[clue.claim,clue.alternative];
    roundsData.push({witness:WITNESSES[(seed+r*2)%WITNESSES.length],role:r===0?'목격자':r===1?'현장 조사원':r===2?'기록 담당자':'추가 증인',text:`${location}에서 있었던 일을 진술하겠습니다. “${clue.claim}” 이 내용이 제가 기억하는 사실입니다.`,options,correctStatement:0,evidenceId:clue.id,explain:clue.explain});
  }
  const finalIndex=evidence.length-1;
  evidence[finalIndex]={...evidence[finalIndex],name:'최종 대조 기록',description:guilty?`사건 현장에서 발견된 흔적이 ${defendant.name}의 소지품과 일치한다. 피고가 현장에 있었다는 사실을 뒷받침한다.`:`사건 발생 시각에 ${defendant.name}은(는) 다른 지역의 치료소에서 확인되었다. 시간 기록과 담당자의 서명이 일치한다.`,kind:'결정적 기록'};
  return {id,stage,index,title:`${title} · ${defendant.name}의 진술`,shortTitle:title,defendant,defendantGuilty:guilty,recruitable:guilty&&((seed%4)!==0),witness,location,rounds,evidence,roundsData,description:`${location}에서 발생한 ${title}. 피고 ${defendant.name}은(는) 혐의를 부인하고 있다. 현장을 조사하고 증언을 검증하자.`,verdict:guilty?'guilty':'innocent'};
}
const STAGES=STAGE_NAMES.map((name,i)=>({id:i,name,desc:STAGE_DESC[i],cases:stageCaseCount(i),tier:Math.floor(i/5)+1,location:LOCATIONS[i%LOCATIONS.length]}));
function currentJudge(){return JUDGES.find(j=>j.id===state.save?.judge)||null}
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo({top:0,behavior:'smooth'});}
function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>el.classList.remove('show'),1900)}
function persist(){if(!state.save)return;try{localStorage.setItem(SAVE_KEY,JSON.stringify(state.save));$('saveBtn').textContent='저장됨 ✓'}catch(e){$('saveBtn').textContent='저장 실패'}}
function loadSave(){try{const raw=localStorage.getItem(SAVE_KEY);if(raw){const s=JSON.parse(raw);if(s.version===3){state.save={...freshSave(),...s};return true}}}catch(e){console.warn('save load',e)}return false}
function updateHeader(){const s=state.save,j=currentJudge();$('topJP').textContent=s?.jp??0;$('topRank').textContent=j?(rankFor(s.level)):'판사 임명 대기';$('topLocation').textContent=state.currentCase?state.currentCase.location:'왕립 재판소';$('sideAvatar').textContent=j?.emoji||'⚖️';$('sideName').textContent=j?.name||'판사 미임명';$('sideRank').textContent=j?rankFor(s.level):'파트너를 선택하세요';$('sideLevel').textContent=`Lv. ${s?.level||1}`;$('sideExp').textContent=`${s?.xp||0} / ${xpNeed(s?.level||1)} EXP`;$('sideExpBar').style.width=`${Math.min(100,((s?.xp||0)/xpNeed(s?.level||1))*100)}%`;$('sideWins').textContent=s?.wins||0;$('sideFriends').textContent=s?.roster.length||0;$('rosterCount').textContent=`${s?.roster.length||0} / 3`;$('partyCount').textContent=`${1+(s?.party.length||0)} / 4`;$('partyList').innerHTML='';if(!j){$('partyList').innerHTML='<div class="empty-party">판사 임명 후 파티가 구성돼.</div>'}else{const lead=document.createElement('div');lead.className='party-slot';lead.innerHTML=`<span class="mon">${j.emoji}</span><div><b>${j.name} · 판사</b><small>Lv. ${s.level}</small></div>`;$('partyList').append(lead);s.party.slice(0,3).forEach(id=>{const mon=s.roster.find(m=>m.id===id);if(mon){const el=document.createElement('div');el.className='party-slot';el.innerHTML=`<span class="mon">${mon.emoji}</span><div><b>${mon.name}</b><small>Lv. ${mon.level}</small></div>`;$('partyList').append(el)}})}$('sideTip').textContent=j?`${j.ability}: ${j.skill}`:'현장을 조사하고 증거를 모아 사건의 진실을 밝혀보자.'}
function openJudgeSelect(){state.selectedJudge=state.save?.judge||null;renderJudgeGrid();showScreen('judgeScreen')}
function renderJudgeGrid(){const grid=$('judgeGrid');grid.innerHTML='';JUDGES.forEach(j=>{const b=document.createElement('button');b.className='judge-option'+(state.selectedJudge===j.id?' selected':'');b.innerHTML=`<span class="mon">${j.emoji}</span><b>${j.name}</b><small>${j.ability}</small><p>${j.desc}</p>`;b.addEventListener('click',()=>{state.selectedJudge=j.id;renderJudgeGrid();$('judgeChoice').textContent=`${j.emoji} ${j.name} — ${j.ability}`;$('appointBtn').disabled=false});grid.append(b)});$('appointBtn').disabled=!state.selectedJudge;$('judgeChoice').textContent=state.selectedJudge?`${JUDGES.find(j=>j.id===state.selectedJudge).emoji} ${JUDGES.find(j=>j.id===state.selectedJudge).name} 선택됨`:'판사 후보를 선택해 줘.'}
function appointJudge(){if(!state.selectedJudge)return;if(state.save?.judge&&state.save.judge!==state.selectedJudge){if(!confirm('판사를 변경하면 현재 판사의 성장 기록이 초기화돼. 새 게임으로 시작할까?'))return;state.save=freshSave()}state.save.judge=state.selectedJudge;persist();updateHeader();renderHub();showScreen('hubScreen');toast(`${currentJudge().name} 판사를 임명했어!`)}
function renderHub(){const s=state.save;if(!s?.judge)return;const completed=s.completed.length;$('hubJudge').textContent=currentJudge().name;$('hubRank').textContent=rankFor(s.level);$('hubCases').textContent=`${completed} / ${caseTotal}`;$('hubStages').textContent=`${STAGES.filter((st,i)=>stageDone(i)).length} / 30`;$('hubRoster').textContent=`${s.roster.length} / 3`;$('hubProgress').textContent=`${Math.floor(completed/caseTotal*100)}% 완료`;$('stageGrid').innerHTML='';STAGES.forEach((st,i)=>{const unlocked=i<=s.unlockedStage;const done=stageDone(i);const count=st.cases;const progress=Array.from({length:count},(_,k)=>s.completed.includes(`${i}-${k}`)).filter(Boolean).length;const card=document.createElement('button');card.className='stage-card'+(!unlocked?' locked':'')+(i===s.unlockedStage&&!done?' current':'');card.disabled=!unlocked;card.innerHTML=`<span class="stage-no">DISTRICT ${String(i+1).padStart(2,'0')} · ${['','초급','중급','상급','전문','베테랑'][st.tier]}</span><h3>${st.name}</h3><p>${st.desc}</p><div class="stage-foot"><span>사건 ${count}건</span><span>${done?'완료':`${progress}/${count}`}</span></div><div class="mini-progress"><i style="width:${progress/count*100}%"></i></div>`;card.addEventListener('click',()=>openStage(i));$('stageGrid').append(card)})}
function stageDone(i){return STAGES[i].cases===Array.from({length:STAGES[i].cases},(_,k)=>state.save.completed.includes(`${i}-${k}`)).filter(Boolean).length}
function openStage(i){if(i>state.save.unlockedStage)return;state.currentStage=i;const st=STAGES[i];$('stageCrumb').textContent=`제${i+1}구역`;$('stageKicker').textContent=`DISTRICT ${String(i+1).padStart(2,'0')} · ${st.location}`;$('stageTitle').textContent=st.name;$('stageDesc').textContent=st.desc;const done=Array.from({length:st.cases},(_,k)=>state.save.completed.includes(`${i}-${k}`)).filter(Boolean).length;$('stageCount').textContent=`${done} / ${st.cases}`;$('stageProgressBar').style.width=`${done/st.cases*100}%`;$('caseGrid').innerHTML='';for(let k=0;k<st.cases;k++){const c=makeCase(i,k),complete=state.save.completed.includes(`${i}-${k}`),unlocked=k===0||state.save.completed.includes(`${i}-${k-1}`);const b=document.createElement('button');b.className='case-card';b.disabled=complete||!unlocked;b.innerHTML=`<span class="case-icon">${complete?'✓':['🔎','📜','🧩','⚖','🗝'][k%5]}</span><span class="case-info"><b>${String(k+1).padStart(2,'0')}. ${c.shortTitle}</b><small>${c.defendant.name} · ${c.location} · 심리 ${c.rounds}회</small></span><span class="case-status">${complete?'판결 완료':unlocked?'조사 시작 →':'잠김'}</span>`;b.addEventListener('click',()=>startCase(c));$('caseGrid').append(b)}showScreen('stageScreen')}
function startCase(c){state.currentCase=c;state.collected=[];state.talkedWitness=false;state.alakazamGuardUsed=false;state.roundIndex=0;state.focus=100;state.mistakes=0;state.selectedEvidence=null;state.selectedStatement=null;state.player={x:320,y:320};$('exploreTitle').textContent=c.shortTitle;$('exploreCrumb').textContent=c.location;$('exploreDesc').textContent=c.description;$('mapLocation').textContent=c.location;$('mapObjective').textContent=`증거 0 / ${c.evidence.length}`;$('fieldMessage').textContent='반짝이는 조사 지점으로 이동해 E 키를 눌러 조사해. 지도에서 지점을 클릭해도 돼.';$('fieldEvidence').innerHTML='';$('fieldEvidenceCount').textContent=`0 / ${c.evidence.length}`;$('toCourtBtn').disabled=true;renderFieldTargets();showScreen('exploreScreen');drawMap()}
const HOTSPOTS=[{x:145,y:118},{x:330,y:92},{x:500,y:150},{x:205,y:278},{x:465,y:292},{x:565,y:88}];
const WITNESS_POINT={x:565,y:88};
function renderFieldTargets(){const wrap=$('fieldTargets');wrap.innerHTML='';const c=state.currentCase;HOTSPOTS.slice(0,c.evidence.length).forEach((p,i)=>{const b=document.createElement('button');b.className='target-btn';b.textContent=`${state.collected.includes(c.evidence[i].id)?'✓':'◇'} 조사 지점 ${i+1} · ${state.collected.includes(c.evidence[i].id)?'조사 완료':'미조사'}`;b.disabled=state.collected.includes(c.evidence[i].id);b.addEventListener('click',()=>{state.player={x:p.x,y:p.y};inspectHotspot(i)});wrap.append(b)});const wb=document.createElement('button');wb.className='target-btn';wb.textContent=`${state.talkedWitness?'✓':'◇'} 목격자 ${state.currentCase.witness} · ${state.talkedWitness?'대화 완료':'대화하기'}`;wb.disabled=state.talkedWitness;wb.addEventListener('click',()=>{state.player={x:WITNESS_POINT.x,y:WITNESS_POINT.y};talkToWitness()});wrap.append(wb)}
function drawMap(){const canvas=$('mapCanvas');if(!canvas||!state.currentCase)return;const ctx=canvas.getContext('2d');const w=canvas.width,h=canvas.height,t=32;ctx.imageSmoothingEnabled=false;ctx.clearRect(0,0,w,h);
  // checker-like grass tiles
  for(let y=0;y<h;y+=t)for(let x=0;x<w;x+=t){const n=((x/t*7+y/t*13+state.currentStage*3)%5);ctx.fillStyle=n===0?'#78ad68':n===1?'#82b873':'#73a963';ctx.fillRect(x,y,t,t);if(n===2){ctx.fillStyle='#8fc27a';ctx.fillRect(x+5,y+7,3,3);ctx.fillRect(x+21,y+22,3,3)}}
  // path
  ctx.fillStyle='#c7b17a';ctx.fillRect(0,170,w,55);ctx.fillRect(285,0,60,h);ctx.fillStyle='#d8c38b';ctx.fillRect(0,176,w,4);ctx.fillRect(0,215,w,4);
  // water at one side
  ctx.fillStyle='#559bb6';ctx.fillRect(0,0,65,h);for(let y=10;y<h;y+=26){ctx.fillStyle='#83c6d3';ctx.fillRect(8,y,28,3);ctx.fillRect(42,y+9,14,3)}
  // buildings
  function building(x,y,color){ctx.fillStyle='#76533f';ctx.fillRect(x,y+18,76,48);ctx.fillStyle=color;ctx.fillRect(x-5,y+5,86,20);ctx.fillStyle='#f0d7a1';ctx.fillRect(x+10,y+31,15,17);ctx.fillRect(x+49,y+31,15,17);ctx.fillStyle='#513d36';ctx.fillRect(x+32,y+39,14,27)}
  building(92,24,'#b96c59');building(455,22,'#9c78b7');building(85,276,'#d39c55');
  // trees
  for(let i=0;i<13;i++){const x=(i*53+22)%w,y=(i*71+46)%h;if((y>150&&y<230)||(x>80&&x<170&&y<110))continue;ctx.fillStyle='#604b38';ctx.fillRect(x+8,y+17,8,17);ctx.fillStyle=i%2?'#39734d':'#458553';ctx.fillRect(x,y,25,24);ctx.fillRect(x+5,y-7,15,9);ctx.fillStyle='#6ca76a';ctx.fillRect(x+4,y+4,6,5)}
  // sign and fountain
  ctx.fillStyle='#6c5039';ctx.fillRect(555,244,7,32);ctx.fillStyle='#f2d38a';ctx.fillRect(536,235,45,17);ctx.fillStyle='#433a35';ctx.font='9px monospace';ctx.fillText('CASE',543,247);
  // hotspots
  HOTSPOTS.slice(0,state.currentCase.evidence.length).forEach((p,i)=>{const got=state.collected.includes(state.currentCase.evidence[i].id);ctx.fillStyle=got?'#9bd9a0':'#ffe08a';ctx.fillRect(p.x-9,p.y-9,18,18);ctx.fillStyle=got?'#397a50':'#9b622a';ctx.fillRect(p.x-5,p.y-5,10,10);ctx.fillStyle='#fff2c2';ctx.fillRect(p.x-2,p.y-2,4,4);if(!got){ctx.fillStyle='#17243a';ctx.font='bold 12px monospace';ctx.fillText('!',p.x-3,p.y-14)}});
  // witness NPC marker
  ctx.fillStyle=state.talkedWitness?'#9bd9a0':'#9bd8f2';ctx.fillRect(WITNESS_POINT.x-10,WITNESS_POINT.y-10,20,20);ctx.fillStyle='#345a86';ctx.fillRect(WITNESS_POINT.x-6,WITNESS_POINT.y-6,12,12);ctx.fillStyle='#fff';ctx.font='bold 10px monospace';ctx.fillText('NPC',WITNESS_POINT.x-10,WITNESS_POINT.y-15);
  // player sprite
  const px=Math.round(state.player.x),py=Math.round(state.player.y);ctx.fillStyle='#29364e';ctx.fillRect(px-8,py+7,18,5);ctx.fillStyle='#e8b98b';ctx.fillRect(px-6,py-13,13,13);ctx.fillStyle='#344b76';ctx.fillRect(px-8,py,17,14);ctx.fillStyle='#eac66e';ctx.fillRect(px-8,py+12,7,5);ctx.fillRect(px+2,py+12,7,5);ctx.fillStyle='#49352c';ctx.fillRect(px-7,py-16,14,5);ctx.fillStyle='#fff';ctx.fillRect(px+1,py-9,3,3);
  ctx.strokeStyle='#ffffff66';ctx.strokeRect(1,1,w-2,h-2);
}
function nearestHotspot(){let best=-1,dist=Infinity;HOTSPOTS.slice(0,state.currentCase.evidence.length).forEach((p,i)=>{if(state.collected.includes(state.currentCase.evidence[i].id))return;const d=Math.hypot(p.x-state.player.x,p.y-state.player.y);if(d<dist){dist=d;best=i}});const wd=Math.hypot(WITNESS_POINT.x-state.player.x,WITNESS_POINT.y-state.player.y);if(wd<58&&wd<dist)return state.currentCase.evidence.length;return dist<58?best:-1}
function inspectHotspot(i){const c=state.currentCase,e=c.evidence[i];if(!e||state.collected.includes(e.id))return;state.collected.push(e.id);const j=currentJudge();let bonus='';if(j?.id==='lucario'&&i===0)bonus=' 파동 감지로 숨은 흔적까지 확인했다.';if((j?.id==='rotom'||j?.id==='pikachu')&&e.name.includes('기록'))bonus=' 전기 신호를 분석해 기록의 수정 흔적을 복구했다.';if(j?.id==='meowth'&&(/물건|부서진|끊어진/.test(e.name)))bonus=' 나옹이 주변의 작은 파편도 찾아냈다.';if(j?.id==='arcanine'&&e.name.includes('발자국'))bonus=' 후각으로 발자국의 이동 방향을 더 정확히 추적했다.';if(j?.id==='ampharos'&&i===0)bonus=' 광원으로 어두운 틈의 흔적을 비춰냈다.';$('fieldMessage').textContent=`${e.name}을(를) 발견했다.${bonus}`;$('fieldEvidence').insertAdjacentHTML('beforeend',`<div class="evidence-chip"><b>${e.name}</b><small>${e.description}</small></div>`);$('fieldEvidenceCount').textContent=`${state.collected.length} / ${c.evidence.length}`;$('mapObjective').textContent=`증거 ${state.collected.length} / ${c.evidence.length}`;$('toCourtBtn').disabled=!(state.collected.length===c.evidence.length&&state.talkedWitness);renderFieldTargets();drawMap();if(state.collected.length===c.evidence.length){$('fieldMessage').textContent='필요한 증거를 모두 확보했어. 현장 기록을 정리하고 법정으로 이동하자.';toast('필요한 증거를 모두 모았어!')}}
function talkToWitness(){if(state.talkedWitness)return;state.talkedWitness=true;$('fieldMessage').textContent=`${state.currentCase.witness}의 이야기를 들었어. ‘그날 들은 소리는 평소와 달랐고, 사건 직후 누군가 급히 자리를 떠났어.’`;renderFieldTargets();$('toCourtBtn').disabled=!(state.collected.length===state.currentCase.evidence.length&&state.talkedWitness);toast('목격자 진술을 기록했어.')}
function handleMapClick(ev){const canvas=$('mapCanvas'),r=canvas.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width*canvas.width,y=(ev.clientY-r.top)/r.height*canvas.height;let nearest=-1,dist=Infinity;HOTSPOTS.slice(0,state.currentCase.evidence.length).forEach((p,i)=>{const d=Math.hypot(p.x-x,p.y-y);if(d<dist){dist=d;nearest=i}});const wd=Math.hypot(WITNESS_POINT.x-x,WITNESS_POINT.y-y);if(wd<38){state.player={x:WITNESS_POINT.x,y:WITNESS_POINT.y};talkToWitness()}else if(dist<38){state.player={x:HOTSPOTS[nearest].x,y:HOTSPOTS[nearest].y};inspectHotspot(nearest)}else{state.player={x,y};drawMap()}}
function movePlayer(dx,dy){if(!$('exploreScreen').classList.contains('active'))return;state.player.x=Math.max(80,Math.min(610,state.player.x+dx));state.player.y=Math.max(22,Math.min(360,state.player.y+dy));drawMap()}
function interact(){const i=nearestHotspot();if(i===state.currentCase.evidence.length)talkToWitness();else if(i>=0)inspectHotspot(i);else $('fieldMessage').textContent='조사 지점 가까이 이동해야 해. 반짝이는 표식에 다가가 보자.'}
function enterCourt(){if(state.collected.length<state.currentCase.evidence.length||!state.talkedWitness)return;setupCourt();showScreen('courtScreen')}
function setupCourt(){const c=state.currentCase,r=c.roundsData[state.roundIndex];state.selectedStatement=null;state.selectedEvidence=null;$('courtTitle').textContent=c.shortTitle;$('courtSubtitle').textContent=`피고 ${c.defendant.name}의 진술을 검증하자.`;$('courtJudgeSprite').textContent=currentJudge()?.emoji||'⚖';$('defendantSprite').textContent=c.defendant.emoji;$('defendantName').textContent=`피고 ${c.defendant.name}`;$('witnessSprite').textContent=MONS[(state.currentStage*3+state.roundIndex+2)%MONS.length].emoji;$('standName').textContent=`증인 ${r.witness}`;$('speakerName').textContent=`${r.witness} · ${r.role}`;$('roundLabel').textContent=`심리 ${state.roundIndex+1} / ${c.rounds}`;$('testimonyText').textContent=r.text;$('focusText').textContent=`${state.focus} / 100`;$('focusBar').style.width=`${state.focus}%`;$('statementList').innerHTML='';r.options.forEach((text,i)=>{const b=document.createElement('button');b.className='choice-btn';b.innerHTML=`<small>진술 ${i+1}</small>${text}`;b.addEventListener('click',()=>{state.selectedStatement=i;document.querySelectorAll('#statementList .choice-btn').forEach((el,k)=>el.classList.toggle('selected',k===i));updateSubmitState()});$('statementList').append(b)});$('courtEvidenceList').innerHTML='';c.evidence.forEach(e=>{const b=document.createElement('button');b.className='choice-btn';b.innerHTML=`<small>${e.kind}</small><b>${e.name}</b><small>${e.description}</small>`;b.addEventListener('click',()=>{state.selectedEvidence=e.id;document.querySelectorAll('#courtEvidenceList .choice-btn').forEach(el=>el.classList.toggle('selected',el.dataset.id===e.id));updateSubmitState()});b.dataset.id=e.id;$('courtEvidenceList').append(b)});$('courtFeedback').textContent='진술 하나와 증거 하나를 선택해 제출해.';$('courtFeedback').className='';$('presentEvidenceBtn').disabled=true}
function updateSubmitState(){$('presentEvidenceBtn').disabled=state.selectedStatement===null||!state.selectedEvidence}
function submitEvidence(){const c=state.currentCase,r=c.roundsData[state.roundIndex];if(state.selectedStatement===r.correctStatement&&state.selectedEvidence===r.evidenceId){$('courtFeedback').textContent='정확한 지적이야! 증언의 모순이 드러났어.';$('courtFeedback').className='good';toast('증언의 모순을 밝혔어!');setTimeout(()=>{state.roundIndex++;if(state.roundIndex<c.rounds){setupCourt()}else{openVerdictChoice()}},650)}else{state.mistakes++;const j=currentJudge();let loss=j?.id==='gardevoir'?8:j?.id==='eevee'?10:14;if(j?.id==='alakazam'&&!state.alakazamGuardUsed){loss=0;state.alakazamGuardUsed=true;toast('후딘의 논리 분석이 첫 번째 실수를 보정했어.')}state.focus=Math.max(0,state.focus-loss);$('focusText').textContent=`${state.focus} / 100`;$('focusBar').style.width=`${state.focus}%`;$('courtFeedback').textContent='그 조합으로는 모순을 입증할 수 없어. 증언과 증거의 관계를 다시 살펴보자.';$('courtFeedback').className='bad';toast('증거가 맞지 않아. 집중력이 감소했어.');if(state.focus===0){state.focus=35;toast('판사가 잠시 심호흡을 하고 집중력을 회복했어.');setTimeout(()=>{$('focusText').textContent=`${state.focus} / 100`;$('focusBar').style.width=`${state.focus}%`},450)}}}
function openVerdictChoice(){const c=state.currentCase;$('modalContent').innerHTML=`<div class="eyebrow">FINAL VERDICT</div><h2>최종 판결을 내려라.</h2><p>${c.shortTitle}의 모든 증언을 검토했어. 확보한 증거를 바탕으로 판결을 선택해.</p><div class="verdict-buttons" style="flex-direction:column"><button class="btn primary" data-verdict="guilty">유죄 — 혐의가 증명되었다</button><button class="btn ghost" data-verdict="innocent">무죄 — 피고는 범인이 아니다</button><button class="btn ghost" data-verdict="insufficient">증거 불충분 — 혐의를 확정할 수 없다</button></div>`;$('modal').classList.remove('hidden');$('modalContent').querySelectorAll('[data-verdict]').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.verdict;$('modal').classList.add('hidden');finishCase(v)}))}
function gainXP(amount){const s=state.save;let levels=0;s.xp+=amount;while(s.level<60&&s.xp>=xpNeed(s.level)){s.xp-=xpNeed(s.level);s.level++;levels++}if(s.level>=60)s.xp=Math.min(s.xp,xpNeed(60)-1);return levels}
function finishCase(verdict){const c=state.currentCase,key=`${c.stage}-${c.index}`;const correct=verdict===c.verdict;const perfect=correct&&state.mistakes===0;let xp=correct?70+c.stage*9:0;let jp=correct?25+c.stage*3:0;const levels=gainXP(xp);state.save.jp+=jp;state.save.wins+=correct?1:0;if(correct){state.save.roster.forEach(m=>{m.xp+=20+c.stage*2;while(m.xp>=100+m.level*15){m.xp-=100+m.level*15;m.level++}})}if(correct&&!state.save.completed.includes(key))state.save.completed.push(key);const stage=STAGES[c.stage];if(correct&&stageDone(c.stage)&&c.stage<29)state.save.unlockedStage=Math.max(state.save.unlockedStage,c.stage+1);state.lastResult={correct,perfect,xp,jp,levels,verdict};state.pendingRecruit=correct&&verdict==='guilty'&&c.recruitable?{name:c.defendant.name,emoji:c.defendant.emoji,id:`${c.id}-mon`}:null;persist();updateHeader();renderVerdict();showScreen('verdictScreen')}
function renderVerdict(){const c=state.currentCase,r=state.lastResult;$('verdictIcon').textContent=r.correct?'⚖️':'📜';$('verdictTitle').textContent=r.correct?(r.perfect?'완벽한 판결!':'올바른 판결!'):'판결 근거가 부족해.';$('verdictText').textContent=r.correct?`${c.defendant.name} 사건의 진실을 밝혔어. ${c.verdict==='guilty'?'증거에 따라 책임을 물을 수 있게 되었어.':'무고한 피고를 올바르게 석방했어.'}`:'판결은 기록됐지만 정답과 달라. 다음 사건에서 더 정확한 근거를 찾아보자.';$('verdictRewards').innerHTML=`<div class="reward"><b>+${r.xp}</b><small>판사 EXP</small></div><div class="reward"><b>+${r.jp}</b><small>JP 포인트</small></div><div class="reward"><b>${state.save.level}</b><small>현재 판사 레벨</small></div>`;if(r.levels)$('verdictRewards').insertAdjacentHTML('beforeend',`<div class="reward"><b>+${r.levels}</b><small>레벨 상승</small></div>`);$('recruitPanel').innerHTML='';if(state.pendingRecruit){$('recruitPanel').innerHTML=`<h3>교화 대상 발견 · ${state.pendingRecruit.emoji} ${state.pendingRecruit.name}</h3><p>피고가 자신의 행동을 돌아보고 새로운 길을 걷고 싶어 해. 동료로 받아들일까?</p><div class="recruit-actions"><button class="btn primary" id="recruitYes">동료로 맞이하기</button><button class="btn ghost" id="recruitNo">나중에 결정</button></div>`;$('recruitYes').addEventListener('click',recruitDefendant);$('recruitNo').addEventListener('click',()=>{state.pendingRecruit=null;$('recruitPanel').innerHTML='<p>교화 권유를 보류했어. 사건은 완료 처리됐어.</p>'})}else{$('recruitPanel').innerHTML=`<p>${c.verdict==='innocent'?'무고한 포켓몬을 석방했어.':r.correct?'이번 피고는 교화 대상이 아니야.':'교화는 올바른 판결과 사건 해결 이후에 가능해.'}</p>`}const nextIdx=c.index+1;$('nextCaseBtn').textContent=!r.correct?'사건 다시 도전 ↻':nextIdx<stageCases(c.stage)?'다음 사건 →':'법정 구역으로 →'}
function recruitDefendant(){if(!state.pendingRecruit)return;if(state.save.roster.length>=3){toast('동료 엔트리가 가득 찼어. 파티 관리에서 동료를 정리해 줘.');return}const m={...state.pendingRecruit,level:1,xp:0,ability:'교화 동료',joined:Date.now()};state.save.roster.push(m);if(state.save.party.length<3)state.save.party.push(m.id);persist();updateHeader();$('recruitPanel').innerHTML=`<h3>🤝 ${m.name} 합류 완료!</h3><p>${m.name}이(가) 조사 파티에 합류했어. 앞으로 사건을 해결하면서 함께 성장할 거야.</p>`;state.pendingRecruit=null;toast(`${m.name}이(가) 동료가 되었어!`)}
function nextCase(){const c=state.currentCase;if(!state.lastResult.correct){startCase(makeCase(c.stage,c.index));return}if(c.index+1<stageCases(c.stage)){openStage(c.stage)}else{renderHub();showScreen('hubScreen')}}
function renderPartyManage(){const wrap=$('partyManage');wrap.innerHTML='';const j=currentJudge();if(j){const card=document.createElement('div');card.className='party-manage-card';card.innerHTML=`<span class="mon">${j.emoji}</span><div class="details"><b>${j.name} · 판사</b><small>Lv. ${state.save.level} · ${rankFor(state.save.level)} · 고정 멤버</small></div>`;wrap.append(card)}state.save.roster.forEach(m=>{const active=state.save.party.includes(m.id);const card=document.createElement('div');card.className='party-manage-card';card.innerHTML=`<span class="mon">${m.emoji}</span><div class="details"><b>${m.name}</b><small>Lv. ${m.level} · EXP ${m.xp} · ${active?'파티 참가 중':'대기 중'}</small></div><button>${active?'파티 해제':'파티 참가'}</button>`;card.querySelector('button').addEventListener('click',()=>{if(active)state.save.party=state.save.party.filter(x=>x!==m.id);else if(state.save.party.length<3)state.save.party.push(m.id);else toast('판사 외 동료는 최대 3마리야.');persist();updateHeader();renderPartyManage()});wrap.append(card)})}
function openModal(title,body){$('modalContent').innerHTML=`<h2>${title}</h2><p>${body}</p>`;$('modal').classList.remove('hidden')}
function init(){loadSave();updateHeader();$('newGameBtn').addEventListener('click',()=>{if(state.save?.judge&&!confirm('새 게임을 시작하면 현재 저장 데이터가 초기화돼. 계속할까?'))return;state.save=freshSave();persist();updateHeader();openJudgeSelect()});$('continueBtn').addEventListener('click',()=>{if(state.save?.judge){renderHub();showScreen('hubScreen')}else openJudgeSelect()});$('appointBtn').addEventListener('click',appointJudge);$('changeJudgeBtn').addEventListener('click',openJudgeSelect);$('backHub').addEventListener('click',()=>{renderHub();showScreen('hubScreen')});$('leaveExplore').addEventListener('click',()=>openStage(state.currentStage));$('toCourtBtn').addEventListener('click',enterCourt);$('leaveCourt').addEventListener('click',()=>{if(confirm('법정 심리를 나가고 현장 기록으로 돌아갈까? 현재 심리 진행은 초기화돼.')){state.roundIndex=0;showScreen('exploreScreen')}});$('presentEvidenceBtn').addEventListener('click',submitEvidence);$('nextCaseBtn').addEventListener('click',nextCase);$('caseListBtn').addEventListener('click',()=>openStage(state.currentStage));$('saveBtn').addEventListener('click',()=>{persist();toast('진행 상황을 저장했어.')});$('brandHome').addEventListener('click',()=>showScreen('homeScreen'));$('partyNav').addEventListener('click',()=>{if(!state.save?.judge){toast('먼저 판사를 임명해 줘.');return}renderPartyManage();showScreen('partyScreen')});$('partyBackHub').addEventListener('click',()=>{renderHub();showScreen('hubScreen')});$('modalClose').addEventListener('click',()=>$('modal').classList.add('hidden'));$('modal').addEventListener('click',e=>{if(e.target===$('modal'))$('modal').classList.add('hidden')});$('mapCanvas').addEventListener('click',handleMapClick);document.addEventListener('keydown',e=>{if(!$('exploreScreen').classList.contains('active'))return;const key=e.key.toLowerCase();if(['arrowup','w'].includes(key)){e.preventDefault();movePlayer(0,-16)}else if(['arrowdown','s'].includes(key)){e.preventDefault();movePlayer(0,16)}else if(['arrowleft','a'].includes(key)){e.preventDefault();movePlayer(-16,0)}else if(['arrowright','d'].includes(key)){e.preventDefault();movePlayer(16,0)}else if(key==='e'){interact()}});if(state.save?.judge){$('continueBtn').disabled=false;$('continueBtn').textContent='이어하기'}else{$('continueBtn').disabled=true;$('continueBtn').textContent='저장 데이터 없음'}if(location.hash==='#reset'){localStorage.removeItem(SAVE_KEY);state.save=freshSave();location.hash='';updateHeader()}}
init();
