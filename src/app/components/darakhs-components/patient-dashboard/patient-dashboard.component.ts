import { Component, OnInit, ElementRef } from '@angular/core';
import { PatientsInfoService } from '../services/patients-info.service';
import { DashboardResponseDto, DonutChartDto, HourlyAppointmentDto, MonthlyStatsDto, TreatmentsDonutChartDto, TreatmentsMonthlyStatsDto } from '../model/DashboardResponseDto';
// import * as ApexCharts from 'apexcharts';
// import * as ApexChartsModule from 'apexcharts';

// const ApexCharts: any = (ApexChartsModule as any).default || ApexChartsModule;
//import * as echarts from 'echarts';

declare var ApexCharts: any;
declare var echarts: any;

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  dshboardResponseDto: DashboardResponseDto;
  //chart: ApexCharts | null = null;

  constructor(private elementRef: ElementRef, private patientService: PatientsInfoService) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    this.getDashboardStats();
  }

  getDashboardStats() {
    this.patientService.GetDashboardStats().subscribe(res => {


      this.dshboardResponseDto = res;

      this.setPatientHourlyAppointmentsChart(this.dshboardResponseDto.HourlyAppointments);

      this.setMonthWisePatientsChart(this.dshboardResponseDto.MonthlyStats);

      this.setMonthWiseTreatmentsChart(this.dshboardResponseDto.TreatmentsMonthlyStatsDto);

      this.setAppointmentVsWalkinChart(this.dshboardResponseDto.AppointmentVsWalkin);

      this.setHearingVsSpeakingChart(this.dshboardResponseDto.TreatmentsDonutChartDto);





    });
  }

  setHearingVsSpeakingChart(TreatmentsDonutChart: TreatmentsDonutChartDto[]) {
    // Default values (important if no data)
    let HearingCount = 0;
    let SpeakingCount = 0;
    TreatmentsDonutChart.forEach(item => {
      if (item.TreatmentType === 'Hearing') {
        HearingCount = item.TreatmentCount;
      } else if (item.TreatmentType === 'Speaking') {
        SpeakingCount = item.TreatmentCount;
      }
    });

    const chartDom1 = document.querySelector("#trafficChart2") as HTMLElement;
    const trafficChart2 = echarts.init(chartDom1);

    trafficChart2.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Patients',
          type: 'pie',
          radius: ['40%', '70%'], // Donut
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold',
              formatter: '{b}\n{c}'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: HearingCount, name: 'Hearing' },
            { value: SpeakingCount, name: 'Speaking' }
          ]
        }
      ]
    });
  }

  setAppointmentVsWalkinChart(AppointmentVsWalkin: DonutChartDto[]) {
    // Default values (important if no data)
    let appointmentCount = 0;
    let walkinCount = 0;

    AppointmentVsWalkin.forEach(item => {
      if (item.PatientType === 'Appointment') {
        appointmentCount = item.PatientCount;
      } else if (item.PatientType === 'Walk-in') {
        walkinCount = item.PatientCount;
      }
    });

    const chartDom = document.querySelector("#trafficChart1") as HTMLElement;
    const trafficChart = echarts.init(chartDom);

    trafficChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Patients',
          type: 'pie',
          radius: ['40%', '70%'], // Donut
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold',
              formatter: '{b}\n{c}'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: appointmentCount, name: 'Appointment' },
            { value: walkinCount, name: 'Walk-in' }
          ]
        }
      ]
    });

  }

  setMonthWiseTreatmentsChart(TreatmentsMonthlyStats: TreatmentsMonthlyStatsDto[]) {
    // Month-wise Treatment Chart
    const monthlyData1 = TreatmentsMonthlyStats || [];
    const categories2 = monthlyData1.map(x => x.MonthName);
    const counts2 = monthlyData1.map(x => x.HearingCount);
    const counts12 = monthlyData1.map(x => x.SpeakingCount);

    const options2 = {
      series: [{
        name: 'HearingCount',
        data: counts2
      }, {
        name: 'SpeakingCount',
        data: counts12
      }],
      chart: {
        height: 350,
        type: 'area',
        toolbar: { show: false },
        zoom: {
          enabled: false   // 🔴 disables mouse scroll & drag zoom
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        categories: categories2
      }
    };

    const chart2 = new ApexCharts(
      document.querySelector("#reportsChart3"),
      options2
    );

    chart2.render();
  }

  setMonthWisePatientsChart(MonthlyStats: MonthlyStatsDto[]) {
    // Month-wise Patients Chart
    const monthlyData = MonthlyStats || [];
    const categories1 = monthlyData.map(x => x.MonthName);
    const counts1 = monthlyData.map(x => x.PatientCount);
    const counts11 = monthlyData.map(x => x.AppointmentCount);

    const options1 = {
      series: [{
        name: 'PatientCount',
        data: counts1
      }, {
        name: 'AppointmentCount',
        data: counts11
      }],
      chart: {
        height: 350,
        type: 'area',
        toolbar: { show: false },
        zoom: {
          enabled: false   // 🔴 disables mouse scroll & drag zoom
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        categories: categories1
      }
    };

    const chart1 = new ApexCharts(
      document.querySelector("#reportsChart2"),
      options1
    );

    chart1.render();
  }

  setPatientHourlyAppointmentsChart(HourlyAppointments: HourlyAppointmentDto[]) {

    const hourlyData = HourlyAppointments || [];
    const categories = hourlyData.map(x => x.HourSlot);
    const counts = hourlyData.map(x => x.PatientCount);

    const options = {
      series: [{
        name: 'Appointments',
        data: counts
      }],
      chart: {
        height: 350,
        type: 'area',
        toolbar: { show: false },
        zoom: {
          enabled: false   // 🔴 disables mouse scroll & drag zoom
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        categories: categories
      }
    };

    const chart = new ApexCharts(
      document.querySelector("#reportsChart1"),
      options
    );

    chart.render();
  }



  // ngOnDestroy(): void {
  //     if(this.chart) {
  //     this.chart.destroy();
  //     this.chart = null;
  //   }
  // }

}
