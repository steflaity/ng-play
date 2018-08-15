import { Component, ViewChild } from '@angular/core'

import { GoogleChartDirective } from '../../directives'

@Component({
  selector: 'app-root',
  template: `
  <h2>Here are some charts: </h2>

  <div (window:resize)="onResize($event)" id="example-chart"
    [chartData]="chartData" [chartOptions]="chartOptions" chartType="BarChart" GoogleChart>
`
})
export class AppComponent {  
  @ViewChild(GoogleChartDirective) chart: GoogleChartDirective

  public chartData: any
  private drawing: boolean = false

    public ngOnInit() {
        this.refreshChart(true)
    }

    public ngOnChanges() {
        this.refreshChart(true)
    }

    public onResize(event) {
        if (!this.drawing)
            this.refreshChart(true)
    }

    public refreshChart(forceRefresh: boolean = false) {
        this.drawing = true;
        this.loadData();

        this.chart.clearFormat()

        let hasSetFormat = false;
        let index = 0;

        while (!hasSetFormat && index < 5) {
            hasSetFormat = this.chart.setFormat('Number', '{ "pattern": "000" }', [1, 2]);
            index++;
        }

        if (forceRefresh)
            this.chart.ngOnChanges();

        this.drawing = false
    }

      public loadData() {
        this.chartData = [['111111', '22222', { role: 'style' }, { type: 'number', role: 'annotation' }]];
        this.chartData.push([1, 2, '#00c', 1]) 
        this.chartData.push([2, 3, '#00c', 1])
       // this.chartData.push(['ffff', ' eeee', '#0c0', 2])
       // this.chartData.push(['hhhh', ' iiii', '#c00', 3])
        
    }
    
    public chartOptions = {
        chartArea: {
            width: '50%'
        },
        fontSize: 12,
        color: '#fff',
        animation: {
            startup: true,
            duration: 1000
        },
        legend: { position: 'none' },
        annotations: {
            alwaysOutside: true,
            stem: { color: 'none' }
        },
        backgroundColor: 'none',
        hAxis: {
            gridlines: { count: 0 },
            baselineColor: 'none',
            format: 'none'
        },
        vAxis: {
            textStyle: {
                color: '#fff'
            }
        }
    };

}
