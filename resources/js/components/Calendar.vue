<!-- <template>
    <Navigation/>
    <h1>Calendar page</h1>
</template> -->

<template>
    <Navigation/>
    <div class="wrapper">
      <div class="p-3">
        <div class="calendar-box">
          <div class="calendar-box-title search-box-title calendar-header">
            <div class="calendar-header">
              <h2 class="calendar-title">As of {{ getMonthName(displayedMonth) }} {{ displayedYear }}</h2>
              <div class="calendar-search">
                <input v-model="selectedYear" class="calendar-input" type="number" min="1950" max="2100" placeholder="Year">
                <p class="calendar-p">Year</p>
                <input v-model="selectedMonth" class="calendar-input" type="number" min="1" max="12" placeholder="Month">
                <p class="calendar-p">Month</p>
                <button class="btn-radius btn btn-sm search-btn" @click="searchCalendar">Search</button>
              </div>
            </div>
            <div class="calendar-header_btn">
              <button type="button" class="btn-pagination" @click="prevYear">{{ "<<" }}</button>
              <button type="button" class="btn-back-pagination" @click="prevMonth">{{ "<" }}</button>
              <button class="calendar-btn btn" type="button" @click="thisMonth">This</button>
              <button type="button" class="btn-next-pagination" @click="nextMonth">{{ ">" }}</button>
              <button type="button" class="btn-next-pagination-year" @click="nextYear">{{ ">>" }}</button>
            </div>
          </div>
          <div class="calendar-box-content">
            <table class="calendar-grid">
              <thead>
                <tr class="calendar-weekly">
                  <th v-for="day in weekDays" :key="day" class="calendar-youbi">{{ day }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(week, index) in calendarData" class="v-calendar-weekly__week" :key="index" style="border-left:1px solid gray;border-top:1px solid gray">
                  <td
                  v-for="day in week"
                  :key="day.day" 
                  class="calendar-color"
                  :class="{ outside: day.outside }"
                  style="min-height:125px; height: 78px; width: 10%; padding: 4px 0 0 4px; border-right:1px solid gray; border-bottom:1px solid gray"
                  >
                    <div v-if="checkCurrentDate(day.day,selectedMonth, selectedYear,day.outside )"  class="day"><p style="background-color: green !important;">{{ day.day }}</p></div>
                    <div v-else class="day"><p>{{ day.day }}</p></div>
                    <div v-if="hasVisitDate(day)" class="mt-10">
                      <p class="day-p">{{ hasVisitDate(day) }}</p>
                      <p class="day-p">Patient</p>
                    </div>
                    <div class="dflex">
                      <div v-if="hasVisitDate(day)" class="view day-btn">
                      <button>
                        <router-link :to="{ name: 'calendarView', params: { dayDate: day.day.toString(), month: day.dayData.month } }">
                        <a href="#">View</a>
                        </router-link>
                      </button>
                      </div>
                      <div v-if="hasVisitDate(day)" class="details day-btn">
                        <button class="details-button" @click="showDetails(day)">Details</button>
                      </div>
                      <div v-else class="holiday">
                        holiday
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="showModal" class="modal">
            <div class="modal-content calendar-modal-content" >
              <!-- <span class="close" @click="closeModal">&times;</span>
              
              <h2 class="detailed-title">Detailed Information</h2> -->
              <div class="ui-widget-header calendar-header" >
                <h3 class="modal-title in-header" id="staticBackdropLabel">
                  Detailed Information
                </h3>
                  <span @click="closeModal" style="top: 15px; right: 15px;" class="close ui-icon ui-icon-closethick" data-bs-dismiss="modal" aria-label="Close"></span>
                </div>
              <div class="modal-table mt-4">
                <p class="modal-day">{{ modalData.day }}</p>
                <table id="pr-tb" >
                  <!-- テーブルのヘッダー -->
                    <tr>
                      <td class="table-cell">Number of reservations</td>
                      <td class="table-cell">{{ modalData.detailmode.length }}</td>
                    </tr>
                    <tr>
                      <td class="table-cell">Male</td>
                      <td class="table-cell">{{ numberOfMale }}</td>
                    </tr>
                    <tr>
                      <td class="table-cell">Female</td>
                      <td class="table-cell">{{ numberOfFemale }}</td>
                    </tr>
                    <tr>
                      <td class="table-cell">Child</td>
                      <td class="table-cell">{{ numberOfChild}}</td>
                    </tr>
                  </table>
                  <div style="height: 2rem;"></div>
  
                  <div class=" scrollable-container" style="width:100%; margin-bottom: 2rem;">
                    <table id="weekday-tb">
                    <thead>
                      <tr class="header-table" style="text-align: center !important;">
                        <th class="text-center header-cell">No</th>
                        <th class="text-center header-cell">Patient</th>
                        <th class="text-center header-cell">Sex</th>
                        <th class="text-center header-cell">Age</th>
                        <th class="text-center header-cell">Date of Birth</th>
                        <th class="text-center header-cell">Phone Number</th>
                        <th class="text-center header-cell">Diagnosis</th>
                        <th class="text-center header-cell">Remark</th>
                      </tr>
                    </thead>
                    <!-- テーブルのボディ -->
                    <tbody>
                      <tr v-for="(cal,index) in modalData.detailmode" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ cal.firstname }} {{ cal.lstname }} </td>
                        <td>
                          <!-- 条件に応じて表示内容を切り替える -->
                          <span v-if="cal.age >= 13 && cal.sex === 'Male'">M</span>
                          <span v-else-if="cal.age >= 13 && cal.sex === 'Female'">F</span>
                          <span v-else-if="cal.age < 13 && cal.sex === 'Male'">C/M</span>
                          <span v-else-if="cal.age < 13 && cal.sex === 'Female'">C/F</span>
                        </td>
                        <td>{{ cal.age }}</td>
                        <td>{{ cal.birstdate }}</td>
                        <td>{{ cal.phone1 }}</td>
                        <td>{{ cal.group_code }}</td>
                        <td>{{ cal.remark }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    
    <!-- Modal user info -->
  
  
    <div v-if="userInfo" class="modal">
            <div class="modal-content calendar-modal-content" >
              <!-- <span class="close" @click="closeModal">&times;</span>
              
              <h2 class="detailed-title">Detailed Information</h2> -->
              <div class="ui-widget-header calendar-header" >
                <h3 class="modal-title in-header" id="staticBackdropLabel">
                  Detailed Information
                </h3>
                  <span @click="closeModal" style="top: 15px; right: 15px;" class="close ui-icon ui-icon-closethick" data-bs-dismiss="modal" aria-label="Close"></span>
                </div>
              <div class="modal-table mt-4">
                <p class="modal-day">{{ modalData.day }}</p>
                <table id="pr-tb" >
                  <!-- テーブルのヘッダー -->
                    <tr>
                      <td class="table-cell">Number of reservations</td>
                      <td class="table-cell">{{ modalData.detailmode.length }}</td>
                    </tr>
                    <tr>
                      <td class="table-cell">Male</td>
                      <td class="table-cell">{{ numberOfMale }}</td>
                    </tr>
                    <tr>
                      <td class="table-cell">Female</td>
                      <td class="table-cell">{{ numberOfFemale }}</td>
                    </tr>
                    <tr>
                      <td class="table-cell">Child</td>
                      <td class="table-cell">{{ numberOfChild}}</td>
                    </tr>
                  </table>
                  <div style="height: 2rem;"></div>
  
                  <div class=" scrollable-container" style="width:100%; margin-bottom: 2rem;">
                    <table id="weekday-tb">
                    <thead>
                      <tr class="header-table" style="text-align: center !important;">
                        <th class="text-center header-cell">No</th>
                        <th class="text-center header-cell">Patient</th>
                        <th class="text-center header-cell">Sex</th>
                        <th class="text-center header-cell">Age</th>
                        <th class="text-center header-cell">Date of Birth</th>
                        <th class="text-center header-cell">Phone Number</th>
                        <th class="text-center header-cell">Diagnosis</th>
                        <th class="text-center header-cell">Description</th>
                      </tr>
                    </thead>
                    <!-- テーブルのボディ -->
                    <tbody>
                      <tr v-for="(cal,index) in modalData.detailmode" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ cal.firstname }} {{ cal.lstname }} </td>
                        <td>
                          <!-- 条件に応じて表示内容を切り替える -->
                          <span v-if="cal.age >= 13 && cal.sex === 'Male'">M</span>
                          <span v-else-if="cal.age >= 13 && cal.sex === 'Female'">F</span>
                          <span v-else-if="cal.age < 13 && cal.sex === 'Male'">C/M</span>
                          <span v-else-if="cal.age < 13 && cal.sex === 'Female'">C/F</span>
                        </td>
                        <td>{{ cal.age }}</td>
                        <td>{{ cal.birstdate }}</td>
                        <td>{{ cal.phone1 }}</td>
                        <td>{{ cal.group_code }}</td>
                        <td>{{ cal.remark }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
  
  
  
  
  
  
    <!-- end modal -->
  
    
  </template>
  
  <script>
  import axios from "axios";
  import moment from "moment"

  // import i18n from '../i18n/i18n';
  
  
  export default {
    data() {
      return {
  
  
        
        language : 'English',
        text : '',
      
     
        message : '',
        userInfo : false,
  
  
        datas: [],
        visitDate: [],
        day: [],
        currentDate: new Date(),
        selectedYear: null,
        selectedMonth: null,
        years: [],
        months: [],
        displayedMonth: "",
        displayedYear: "",
        weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        calendarData: [],
        showModal: false,
        modalData: null,
        detailmode: [],
      };
    },
    methods: {

      //check if current day
      checkCurrentDate(day, month,year, outside){

        let date = new Date()
        let curDay = date.getDate()
        let curMonth = date.getMonth() + 1
        let curYear = date.getFullYear()

        if(curDay == day && curMonth == month && curYear == year && !outside){
          return true
        }
        else{
          return false
        }


      },

      getUserModal(){
        this.userInfo = true
      },
  
      //User info method
      getText(text){
        this.language =text;
      },
      //change language
      changeLangauge(){
        if(this.lng !=this.language){
            if(i18n.changeleg()){
                window.location.reload();
            }
        }
      },
      //change password
   
      messagebox() {
          var modal = document.getElementById("myModal");
          modal.style.display = "block";
          setTimeout(() => (modal.style.display = "none"), 2000);
      },
  
  //end
  
  
      hasVisitDate(day) {
        const selectedDate = new Date(this.selectedYear, this.selectedMonth - 1, day.day);
        const count = this.visitDate.reduce((acc, date) => {
          if (date !== null && new Date(date).toDateString() === selectedDate.toDateString()) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0);
        return count;
      },
  
      generateCalendarData() {
        const firstDay = new Date(this.selectedYear, this.selectedMonth - 1, 1);
        const lastDay = new Date(this.selectedYear, this.selectedMonth, 0);
        const startDayOfWeek = firstDay.getDay();
        const endDayOfWeek = lastDay.getDay();
        const daysInMonth = lastDay.getDate();
        const calendarData = [];
        let currentDay = 1;
  
        // visitDateを日付オブジェクトに変換
        const visitDate = new Date(this.visitDate); // visitDateの値をDateオブジェクトに変換
  
        for (let week = 0; week < 6; week++) {
          const weekRow = [];
  
          for (let day = 0; day < 7; day++) {
            let dayOfMonth; // dayOfMonthをループ内で定義
  
            if (week === 0 && day < startDayOfWeek) {
              const prevMonthLastDay = new Date(
                this.selectedYear,
                this.selectedMonth - 1,
                0
              ).getDate();
              dayOfMonth = prevMonthLastDay - startDayOfWeek + day + 1; // dayOfMonthを代入
              weekRow.push({
                day: dayOfMonth,
                outside: true,
                hasValue: false // hasValueをfalseに設定
              });
            } else if (currentDay > daysInMonth) {
              dayOfMonth = currentDay - daysInMonth; // dayOfMonthを代入
              weekRow.push({
                day: dayOfMonth,
                outside: true,
                hasValue: false // hasValueをfalseに設定
              });
              currentDay++;
            } else {
              dayOfMonth = currentDay; // dayOfMonthを代入
              const year = this.selectedYear;
              const month = this.selectedMonth;
              const day = currentDay;
              const targetDate = new Date(year, month - 1, day);
  
              weekRow.push({
                day: dayOfMonth,
                outside: false,
                hasValue: targetDate.getTime() === visitDate.getTime(),// 日付が一致する場合はhasValueをtrueに設定
                dayData: {
                dayOfMonth: dayOfMonth,
                month: this.selectedMonth, // 選択された月を保存
                },
              });
              currentDay++;
            }
          }
  
          // 6週目が翌月の日付だけの場合は表示しない
          if (weekRow.every(day => day.outside)) {
            break;
          }
  
          calendarData.push(weekRow);
        }
  
        this.calendarData = calendarData;
      },
  
      searchCalendar() {
        this.displayedMonth = this.months[this.selectedMonth - 1];
        this.displayedYear = this.selectedYear.toString();
        this.generateCalendarData();
      },
      prevYear() {
        this.selectedYear--;
        this.searchCalendar();
      },
      prevMonth() {
        if (this.selectedMonth === 1) {
          this.selectedMonth = 12;
          this.selectedYear--;
        } else {
          this.selectedMonth--;
        }
        this.searchCalendar();
      },
      thisMonth() {
        const currentYear = this.currentDate.getFullYear();
        const currentMonth = this.currentDate.getMonth() + 1;
        this.selectedYear = currentYear;
        this.selectedMonth = currentMonth;
        this.searchCalendar();
      },
      nextMonth() {
        if (this.selectedMonth === 12) {
          this.selectedMonth = 1;
          this.selectedYear++;
        } else {
          this.selectedMonth++;
        }
        this.searchCalendar();
      },
      nextYear() {
        this.selectedYear++;
        this.searchCalendar();
      },
      getMonthName(month) {
        return moment().month(month - 1).format('MMMM');
      },
      fetchPatients() {
        axios.get('/api/v1/calendar')
        .then(response => {
          this.datas = response.data.datas;
          this.visitDate = JSON.parse(JSON.stringify(response.data.visitDate)); // Proxy(Array)を通常の配列に変換
          this.detailmode = response.data.detailmode;
  
          console.log("fecth patient")
          console.log(this.detailmode)
  
        })
        .catch(error => {
          console.error(error);
        });
      },
      showDetails(day) {
        const selectedDate = new Date(this.selectedYear, this.selectedMonth - 1, day.day);
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).replace(',', '');
  
        const formattedDateParts = formattedDate.split(' ');
        const formattedDateInEnglish = `${formattedDateParts[1]} ${formattedDateParts[0]} ${formattedDateParts[2]}`;
  
        // PrescriptionsのvisitDateとカレンダーの日付を比較して、一致するデータを取得
        const filteredDetails = this.detailmode.filter(data => {
          const visitDate = new Date(data.visit_date);
          return visitDate.toDateString() === selectedDate.toDateString();
        });
  
        this.modalData = {
          day: formattedDateInEnglish,
          detailmode: filteredDetails,
        };
          this.showModal = true;
      },
  
      closeModal() {
        this.showModal = false;
        this.modalData = null;
      },
    },
    mounted() {
  
      //user infor
     
  
  
      // axios.get("/api/calendar").then((response) => (this.datas = response.data));
      this.fetchPatients(); // ページが読み込まれた際にデータを取得
      const currentYear = this.currentDate.getFullYear();
      const currentMonth = this.currentDate.getMonth() + 1;
      this.selectedYear = currentYear;
      this.selectedMonth = currentMonth;
      this.displayedMonth = currentMonth;
      this.displayedYear = currentYear.toString();
    
      for (let year = 2000; year <= 2030; year++) {
        this.years.push(year);
      }
  
      for (let month = 1; month <= 12; month++) {
        this.months.push(month);
      }
  
      this.generateCalendarData();
    },
  
    computed: {
      numberOfMale() {
        if (!this.modalData || !this.modalData.detailmode) return 0;
        return this.modalData.detailmode.filter(item => item.sex === 'Male' && item.age >= 13).length;
      },
      numberOfFemale() {
        if (!this.modalData || !this.modalData.detailmode) return 0;
        return this.modalData.detailmode.filter(item => item.sex === 'Female' && item.age >= 13).length;
      },
      numberOfChild() {
        if (!this.modalData || !this.modalData.detailmode) return 0;
        const currentDate = new Date();
        let childCount = 0;
        this.modalData.detailmode.forEach(item => {
          const birthDate = new Date(item.birstdate);
          const age = currentDate.getFullYear() - birthDate.getFullYear();
          if (item.age < 13) {
            if (item.sex === 'Male') {
              childCount++;
            } else if (item.sex === 'Female') {
              childCount++;
            }
          }
        });
        return Math.max(childCount, 0); // Childの数が0未満にならないように調整
      },
    },
  };
  </script>
