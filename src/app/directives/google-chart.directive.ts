import { Directive, ElementRef, Input, OnInit, OnChanges } from '@angular/core'

declare let google: any
declare let googleLoaded: boolean

@Directive({
    selector: '[GoogleChart]'
})
export class GoogleChartDirective implements OnInit, OnChanges {
    @Input() chartType: string
    @Input() chartOptions: Object
    @Input() chartData: Object

    private dataTable: Object
    private element: any
    private formatters: ChartFormatter[]

    constructor(public el: ElementRef) {
        this.element = this.el.nativeElement
    }

    public ngOnInit() {
        if (!googleLoaded) {
            google.charts.load('current', {
                'packages': ['corechart', 'gauge']
            })
            googleLoaded = true
        }
        this.ngOnChanges()
    }

    public ngOnChanges() {
        if (googleLoaded) google.charts.setOnLoadCallback(() =>
            this.drawGraph(this.chartOptions, this.chartType, this.chartData, this.element))
    }

    public setFormat(formatType: string, options: string, columns: number[]): boolean {
        if (!googleLoaded)
            return false

        switch (formatType) {
            case 'Number':
                return this.setNumberFormat(options, columns)
            default:
                return false
        }
    }

    public clearFormat() {
        this.formatters = []
    }

    private drawGraph(chartOptions, chartType, chartData, ele) {
        // don't attempt to load chart if there isn't any data
        if (chartData === null || chartData === undefined || chartData.length === 1)
            return

        this.dataTable = google.visualization.arrayToDataTable(chartData, false);
        this.applyFormat()
        let data = this.dataTable

        google.charts.setOnLoadCallback(() => {
            let wrapper = new google.visualization.ChartWrapper({
                chartType: chartType,
                dataTable: data,
                options: chartOptions || {},
                containerId: ele.id
            })
            wrapper.draw()
        })
    }

    private applyFormat() {
        for (let i = 0; i < this.formatters.length; i++) {
            let formatter = this.formatters[i].formatter

            for (let j = 0; j < this.formatters[i].columns.length; j++) {
                formatter.format(this.dataTable, this.formatters[i].columns[j])
            }
        }
    }

    private setNumberFormat(options: string, columns: number[]): boolean {
        if (!googleLoaded || !google || !google.visualization || !google.visualization.NumberFormat)
            return false

        let formatter = new google.visualization.NumberFormat(JSON.parse(options))
        let chartFormatter = new ChartFormatter(formatter, columns)
        this.formatters.push(chartFormatter)

        return true;
    }
}

export class ChartFormatter {
    constructor(public formatter: any, public columns: number[]) {
    }
}
