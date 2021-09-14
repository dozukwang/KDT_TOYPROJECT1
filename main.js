//서버에서 데이터 불러오기
const url = 'https://syoon0624.github.io/json/test.json';

const reqObj = new XMLHttpRequest();
reqObj.open('GET', url);
reqObj.responseType = 'json';
reqObj.send();
reqObj.addEventListener('load', work);
function work() {
    const bankList = reqObj.response;
    //사용할 데이터 변수에 저장
    // const income = [];

    // const classify = [];

    // const history = [];

    //const date = [];

    //const price = [];

    // 데이터를 받아 실행할 함수들
}
//budget_graph 스타일 적용
const slider = document.getElementsByClassName('budget_setting_bar')
console.log(slider);
const value = slider[1].value

//.bank_acct의 budget_graph
slider[0].style.background = `linear-gradient(to right, #FFDB4C 0%, #FFDB4C ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`

//.set_budget의 budget_graph
slider[1].style.background = `linear-gradient(to right, #FFDB4C 0%, #FFDB4C ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`

//.set_budget의 budget_graph에 값(value)이 입력되면 그래프 스타일이 따라 변경되는 함수를 설정
slider[1].oninput = function() {
  const newValue = this.value;
  this.style.background = `linear-gradient(to right, #FFDB4C 0%, #FFDB4C ${newValue}%, #C4C4C4 ${newValue}%, #C4C4C4 100%)`
  //2개의 설정 그래프 연동
  // 변경된 값을 바로 bank_acct 페이지의 budget_graph로 연결, 스타일이 동기화 진행
  slider[0].value = this.value;
	slider[0].style.background = this.style.background;
};
// bank_acct 페이지의 budget_graph 밸류값 설정 방지
slider[0].oninput = function(){
  slider[0].value = slider[1].value;
};


//graph
//graph 정보 가져오기
const barCanvas = document.querySelector(".bar_graph").getContext('2d');
const donutCanvas = document.querySelector(".donut_graph").getContext('2d');

//bar&line_graph Set up
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const barData = {
  labels: labels,
  datasets: [{
    data: [10000, 20000, 30000, 40000, 50000, 60000, 70000],
    backgroundColor: [
      '#38C976' ],
    borderWidth: 0,
    barThickness: 5,
    borderRadius: 4,
  },{ //bar_graph에 Line_graph만 추가
    type: 'line',
    label: labels,
    data: [10000, 20000, 30000, 40000, 50000, 60000, 70000],
    borderColor: '#FF5F00',
    borderDash: [6],
    pointBorderColor: 'transparent',
    pointBackgroundColor: 'transparent',
    order: 0
  }]
};
//bar_graph config
const barChart = new Chart(barCanvas, {
  //그래프 타입
  type: 'bar',
  //받는 데이터 설정
  data: barData,
  options: { 
    plugins: { legend:{ display: false } } ,
    
    scales: {
      y: { //y축 옵션 변경
        max: 100000, //최대 표시값
        ticks: {
        setpSize: 20000, //표시 간격
        }
      }
    }
  },
});
//donut_graph Set up
const donutData = {
  labels: ['주유비','건강관리비','외식비','장보기','상점'],
  datasets: [{
    data: [300, 50, 100, 200, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 205, 86)',
      'rgb(247, 69, 69)',
      'rgb(54, 162, 235)',
      'rgb(161, 237, 61)',
    ],
    hoverOffset: 5
  }]
};
//donut_graph config
const donutChart = new Chart(donutCanvas, {
  //그래프 타입
  type: 'doughnut',
  //받는 데이터 설정
  data: donutData,
  options: { 
    plugins: { legend:{ display: false } },
    cutout: '75%',
  },  
});


//color module 적용


//지출내역 페이지 toggle


//사용내역 상단dhfflrl toggle
const dragBtn = document.querySelector('.drag_btn')
const bankUseHistory = document.querySelector('.bank_use_history');
console.log(bankUseHistory)
console.log(dragBtn)

dragBtn.addEventListener('click', showUp)

function showUp() {
  if (bankUseHistory.classList.contains('page_on')){
    bankUseHistory.classList.remove('page_on');
  } else {
    bankUseHistory.classList.add('page_on');
  }
}
