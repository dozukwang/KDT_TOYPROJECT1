// 지출금액 설정 그래프 스타일 적용 + 2개의 그래프 변동 연동
const slider = document.getElementsByClassName('budget_setting_bar')

console.log(slider)
const value = slider[1].value

//bank_acct의 budget_graph
//지출관리 설정 페이지의 budget_graph value값을 bank_acct 값으로 설정 -> 현재 지출관리 금액(value)로 설정된 값에 맞춰 동기화되도록 설정
slider[0].style.background = `linear-gradient(to right, #FFDB4C 0%, #FFDB4C ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`

//지출관리 설정 페이지의 budget_graph
slider[1].style.background = `linear-gradient(to right, #FFDB4C 0%, #FFDB4C ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`

//지출관리 설정 페이지의 budget_graph에 값(value)이 입력되면 그래프 스타일이 따라 변경되는 함수를 설정
slider[1].oninput = function() {
  const newValue = this.value;
  this.style.background = `linear-gradient(to right, #FFDB4C 0%, #FFDB4C ${newValue}%, #C4C4C4 ${newValue}%, #C4C4C4 100%)`
  // 변경된 값을 바로 bank_acct 페이지의 budget_graph로 연결, 스타일이 동기화 진행
  slider[0].value = this.value;
	slider[0].style.background = this.style.background;
};
// bank_acct 페이지의 budget_graph 밸류값 설정 방지
slider[0].oninput = function(){
  slider[0].value = slider[1].value;
};
