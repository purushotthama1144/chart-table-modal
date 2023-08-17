import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { dataList, barChartData, sectorData } from './data'

@Component({
  selector: 'app-popup-chart',
  templateUrl: './popup-chart.component.html',
  styleUrls: ['./popup-chart.component.css']
})

export class PopupChartComponent implements OnInit, AfterViewInit {

  @ViewChild('chart') chart: ChartComponent = {} as ChartComponent;
  @Output() allChartLoad = new EventEmitter<boolean>();
  date: any;
  shortTerm: any;
  intermediateTerm: any;
  dowShortTerm: any;
  dowIndexElement:any;
  sandpShortTerm: any;
  sandpIndexElement:any;
  nasdaqShortTerm: any;
  nasdaqIndexElement:any;
  midcapShortTerm: any;
  midcapIndexElement: any;
  smallcapShortTerm: any;
  smallcapIndexElement: any;
  europeonShortTerm: any;
  emergingShortTerm: any;
  southAmericanShortTerm: any;
  biotechnologyShortTerm: any;
  semiconductorShortTerm: any;
  airlineShortTerm: any;
  regionalBankShortTerm: any;
  solarShortTerm: any;
  healthcareShortTerm: any;
  builderShortTerm: any;
  materialShortTerm: any;
  communicationShortTerm: any;
  financialShortTerm: any;
  technologyShortTerm: any;
  realEstateShortTerm: any;
  consumerDicretionShortTerm: any;
  consumerStapleShortTerm: any;
  energyShortTerm: any;
  OilGasShortTerm: any;
  retailShortTerm: any;
  industrialShortTerm: any;
  utilityShortTerm: any;
  commodityIndexShortTerm: any;
  treasuryShortTerm: any;
  goldShortTerm: any;

  dowBarChart: any;
  spBarChart: any;
  nasdaqBarChart: any;
  midcapBarChart: any;
  smallcapBarChart: any;
  sectorHeatMap: any;

  industryHeatMap: any;
  thematicHeatMap: any;

  exchangeLevelUpdown: any;
  exchangeLevelBullish: any;
  exchangeLevelBearish: any;
  exchangeLevelSma200: any;
  exchangeLevelSma50: any;

  constructor() { }

  ngOnInit(): void {
    this.date = Date.now();
    this.dowThirty();
    this.sandpFiveHundred();
    this.NASDAQ();
    this.midCap();
    this.smallCap();
    this.europeonMarket();
    this.emergingMarket();
    this.southAmericanMarket();
    this.biotechnology();
    this.semiconductor();
    this.airlines();
    this.regionalBank();
    this.solar();
    this.healthcare();
    this.homeBuilder();
    this.materials();
    this.communication();
    this.financial();
    this.technology();
    this.realEstate();
    this.consumerDicretion();
    this.consumerStaple();
    this.energy();
    this.OilGas();
    this.retail();
    this.industrial();
    this.utilities();
    this.commodityIndex();
    this.treasury();
    this.gold();
    this.dowChart();
    this.spChart();
    this.nasdaqChart();
    this.midcapChart();
    this.smallcapChart();
    this.sectorHeatMapChart();
    this.industryHeatMapChart();
    this.thematicHeatMapChart();
    this.exchangeLevelUpdownBarChart();
    this.exchangeLevelBullishBarChart();
    this.exchangeLevelBearishBarChart();
    this.exchangeLevelSma50BarChart();
    this.exchangeLevelSma200BarChart();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.allChartLoad.emit(true);
    }, 2000); // Adjust the delay as needed
  }

  dowThirty() {
    let dataLabels = dataList.opinion.map(sector => sector.name);
    let dataSeries = dataList.opinion.map(sector => sector.value);

    this.dowShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut"
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false // Hide the legend
      },
      dataLabels: {
        enabled: false // Hide the data labels
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.dowIndexElement = {
      series: [
        {
          name: "dow 30",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },

      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "Dow 30",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  sandpFiveHundred() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.sandpShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut"
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.sandpIndexElement = {
      series: [
        {
          name: "S&P 500",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },

      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "S&P 500",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  NASDAQ() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.nasdaqShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut"
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.nasdaqIndexElement = {
      series: [
        {
          name: "NASDAQ",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },

      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "NASDAQ",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };

  }

  midCap() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.midcapShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut"
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.midcapIndexElement = {
      series: [
        {
          name: "Midcap",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },

      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "Midcap",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };

  }

  smallCap() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.smallcapShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut"
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.smallcapIndexElement = {
      series: [
        {
          name: "Midcap",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },

      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "Smallcap",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  europeonMarket() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.europeonShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut"
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  emergingMarket() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.emergingShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut"
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  southAmericanMarket() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.southAmericanShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut"
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  biotechnology() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.biotechnologyShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut"
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  semiconductor() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.semiconductorShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut"
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  airlines() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.airlineShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  regionalBank() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);


    this.regionalBankShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  solar() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.solarShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  healthcare() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.healthcareShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  homeBuilder() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.builderShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  materials() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.materialShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  communication() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.communicationShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  financial() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.financialShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  technology() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.technologyShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  realEstate() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.realEstateShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  consumerDicretion() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.consumerDicretionShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  consumerStaple() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.consumerStapleShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  energy() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.energyShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  OilGas() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.OilGasShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  retail() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.retailShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  industrial() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.industrialShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  utilities() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.utilityShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  commodityIndex() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.commodityIndexShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  treasury() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.treasuryShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  gold() {
    const dataLabels = dataList.opinion.map(sector => sector.name);
    const dataSeries = dataList.opinion.map(sector => sector.value);

    this.goldShortTerm = {
      series: dataSeries,
      chart: {
        width: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "12px"
        }
      },
      labels: dataLabels,
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  dowChart() {
    const dataLabels = barChartData.data.map(data => data.name);
    const dataSeries = barChartData.data.map(data => data.value);

    this.dowBarChart = {
      series: [
        {
          name: "Dow",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "Dow 30",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  spChart() {
    const dataLabels = barChartData.data.map(data => data.name);
    const dataSeries = barChartData.data.map(data => data.value);

    this.spBarChart = {
      series: [
        {
          name: "S&P 500",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "S&P 500",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  nasdaqChart() {
    const dataLabels = barChartData.data.map(data => data.name);
    const dataSeries = barChartData.data.map(data => data.value);

    this.nasdaqBarChart = {
      series: [
        {
          name: "S & P",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "S & P",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  midcapChart() {
    const dataLabels = barChartData.data.map(data => data.name);
    const dataSeries = barChartData.data.map(data => data.value);

    this.midcapBarChart = {
      series: [
        {
          name: "Midcap",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "Midcap",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  smallcapChart() {
    const dataLabels = barChartData.data.map(data => data.name);
    const dataSeries = barChartData.data.map(data => data.value);

    this.smallcapBarChart = {
      series: [
        {
          name: "Midcap",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "Smallcap",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  sectorHeatMapChart() {
    const dataLabels = sectorData.data.map(data => data.category);
    const dataSeries = sectorData.data.map(data => data.value);

    this.sectorHeatMap = {
      series: [
        {
          name: "Cash Flow",
          data: dataSeries,
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true,
          colors: {
            ranges: [
              {
                from: -100,
                to: -46,
                color: "#F15B46"
              },
              {
                from: -45,
                to: 0,
                color: "#FEB019"
              }
            ]
          },
          columnWidth: "100%"
        }
      },
      dataLabels: {
        enabled: false
      },
      yaxis: {
        labels: {
          formatter: function (y: any) {
            return y.toFixed(0) + "%";
          }
        }
      },
      xaxis: {
        type: "datetime",
        categories: dataLabels,
      }
    };
  }

  industryHeatMapChart() {
    this.industryHeatMap = {
      series: [
        {
          name: "W1",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W2",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W3",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W4",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W5",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W6",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W7",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W8",
          data: this.generateData(7, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W9",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W10",
          data: this.generateData(5, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W11",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W12",
          data: this.generateData(10, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W13",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W14",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W15",
          data: this.generateData(12, {
            min: 0,
            max: 90
          })
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 350,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      colors: [
        "#F3B415",
        "#F27036",
        "#663F59",
        "#6A6E94",
        "#4E88B4",
        "#00A7C6",
        "#18D8D8",
        "#A9D794",
        "#46AF78",
        "#A93F55",
        "#8C5E58",
        "#2176FF",
        "#33A1FD",
        "#7A918D",
        "#BAFF29",
      ],
      xaxis: {
        type: "category",
        categories: [
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "12:00",
          "12:30",
          "01:00",
          "01:30"
        ]
      },
      title: {
        // text: "Industry Heat Map"
      },
      grid: {
        padding: {
          right: 20
        }
      }
    };
  }

  thematicHeatMapChart() {
    this.thematicHeatMap = {
      series: [
        {
          name: "W1",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W2",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W3",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W4",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W5",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W6",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W7",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W8",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W9",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W10",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W11",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W12",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W13",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W14",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "W15",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 350,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      colors: [
        "#F3B415",
        "#F27036",
        "#663F59",
        "#6A6E94",
        "#4E88B4",
        "#00A7C6",
        "#18D8D8",
        "#A9D794",
        "#46AF78",
        "#A93F55",
        "#8C5E58",
        "#2176FF",
        "#33A1FD",
        "#7A918D",
        "#BAFF29",
      ],
      xaxis: {
        type: "category",
        categories: [
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "12:00",
          "12:30",
          "01:00",
          "01:30"
        ]
      },
      title: {
        // text: "Thematics Heat Map"
      },
      grid: {
        padding: {
          right: 20
        }
      }
    };
  }

  generateData(count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push(y);
      i++;
    }
    return series;
  }

  exchangeLevelUpdownBarChart() {
    const dataLabels = barChartData.data.map(data => data.name);
    const dataSeries = barChartData.data.map(data => data.value);

    this.exchangeLevelUpdown = {
      series: [
        {
          name: "Exchange Level",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "Exchange Level Up Down",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  exchangeLevelBullishBarChart() {
    const dataLabels = barChartData.data.map(data => data.name);
    const dataSeries = barChartData.data.map(data => data.value);

    this.exchangeLevelBullish = {
      series: [
        {
          name: "Exchange Level",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "Exchange level bullish",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  exchangeLevelBearishBarChart() {
    const dataLabels = barChartData.data.map(data => data.name);
    const dataSeries = barChartData.data.map(data => data.value);

    this.exchangeLevelBearish = {
      series: [
        {
          name: "Exchange Level",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "Exchange level bearish",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  exchangeLevelSma50BarChart() {
    const dataLabels = barChartData.data.map(data => data.name);
    const dataSeries = barChartData.data.map(data => data.value);

    this.exchangeLevelSma50 = {
      series: [
        {
          name: "Exchange Level",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "Exchange level above SMA50",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  exchangeLevelSma200BarChart() {
    const dataLabels = barChartData.data.map(data => data.name);
    const dataSeries = barChartData.data.map(data => data.value);

    this.exchangeLevelSma200 = {
      series: [
        {
          name: "Exchange Level",
          data: dataSeries
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dataLabels,
        position: "top",
        labels: {
          offsetY: -5
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },

      yaxis: {
        labels: {
          show: true,
        }
      },
      title: {
        position: "top",
        text: "Exchange level above SMA200",
        floating: 0,
        offsetY: -5,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }
}