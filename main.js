//서버에서 데이터 불러오기
const url = 'https://syoon0624.github.io/json/test.json';

//함수
//1. 신규와 기존내역의 date 비교함수
function dateMatch(findDate, dateParse) {

  for (let i = 0; i < findDate.length; ++i) {
    if (findDate[i].textContent == dateParse) {
      return i;
    }
  }
  return -1;
}

//2. 숫자 세자리수 마다 쉼표

const reqObj = new XMLHttpRequest();
reqObj.open('GET', url);
reqObj.responseType = 'json';
reqObj.send();
reqObj.addEventListener('load', work);
function work() {
    const rawData = reqObj.response;
    const bankList = rawData.bankList;
    const september = [];
    const october = [];

    //월별 내역 분리하기
    bankList.forEach( function(object){
      const date = object.date.split('-');
      if (date[1] === '09') {september.push(object);}
      else if (date[1] === '10') {october.push(object)}
    });
  
    //세부 사용내역에 data 반영하기
    const useHistoryDetail = document.querySelector('.history_detail_wrap')
    console.log(useHistoryDetail);

    //기입될 날짜 X월Y일 형태로 변경하기
    september.forEach( function(object, idx){

      const dateSplit = object.date.split('-');
      const dateParse = `${parseInt(dateSplit[1])}월${parseInt(dateSplit[2])}일`
  
      // X월Y일 기록의 세부 사용내역 존재여부 확인
      const findDate = document.querySelectorAll('.date');
      // 기존과 신규내역의 date 비교 함수 실행
      const index = dateMatch(findDate, dateParse);

      if (index != -1) { //기존내역이 있으면 index = 기존내역의 date위치
        //신규 사용내역만 추가하기
        const parent = document.createElement('li');
        const child1 = document.createElement('span');
        child1.classList.add('used_name');
        child1.textContent = object.history;
        const child2 = document.createElement('span');
        child2.classList.add('used_amount');
        if (object.income === "in") {
          child2.textContent = `+ ${object.price}`;
          child2.classList.add('money_red')
        } else {child2.textContent = object.price;}
        parent.appendChild(child1);
        parent.appendChild(child2);
        findDate[index].parentNode.parentNode.children[1].appendChild(parent);
      } 
      else { //기존내역이 없으면 index = -1
        //새로운 사용내역 칸 자체를 추가하기
        const dailyUsed = document.createElement('li');
        dailyUsed.classList.add('daily_used');
        const dayInfo = document.createElement('div');
        dayInfo.classList.add('day_info');
        const diDate = document.createElement('span');
        diDate.classList.add('date');
        diDate.textContent = dateParse;
        const diDayTotal = document.createElement('span');
        diDayTotal.classList.add('day_total')
        dayInfo.appendChild(diDate);
        dayInfo.appendChild(diDayTotal);
        dailyUsed.appendChild(dayInfo);
        useHistoryDetail.appendChild(dailyUsed);

        //신규 사용내역 추가하기
        const ancient = document.createElement('ul');
        ancient.classList.add('daily_used_list');
        const parent = document.createElement('li');
        const child1 = document.createElement('span');
        child1.classList.add('used_name');
        child1.textContent = object.history;
        const child2 = document.createElement('span');
        child2.classList.add('used_amount');
        if (object.income === "in") {
          child2.textContent = `+ ${object.price}`;
          child2.classList.add('money_red')
        } else {child2.textContent = object.price;}
        parent.appendChild(child1);
        parent.appendChild(child2);
        ancient.appendChild(parent);
        dailyUsed.appendChild(ancient);
      }
  });
}; 



//budget_graph 스타일 적용
const slider = document.getElementsByClassName('budget_setting_bar')
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
const outManagePage = document.querySelector('.out_manage_page') //움직일 페이지 불러오기
const ompOpenBtn = document.querySelector('.omp_open_btn') //페이지 여는 버튼 불러오기
const ompCloseBtn = document.querySelector('.omp_close_btn') //페이지 닫는 버튼 불러오기

ompOpenBtn.addEventListener('click', openPage) //페이지 열기 감지

function openPage() {
    outManagePage.classList.add('page_on');
}

ompCloseBtn.addEventListener('click', closePage) //페이지 닫기 감지

function closePage() {
  if (outManagePage.classList.contains('page_on')){
    outManagePage.classList.remove('page_on');
  }
}

//사용내역 상단올리기 toggle
const dragBtn = document.querySelector('.drag_btn');
const bankUseHistory = document.querySelector('.bank_use_history');

dragBtn.addEventListener('click', showUp);

function showUp() {
  if (bankUseHistory.classList.contains('page_on')){
    bankUseHistory.classList.remove('page_on');
  } else {
    bankUseHistory.classList.add('page_on');
  }
}
