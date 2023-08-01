import React, { Component } from 'react';
import 'amcharts3/amcharts/amcharts';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';
import AmCharts from "@amcharts/amcharts3-react";

class AmChartStatistics4 extends Component {

    componentDidMount() {
        AmCharts.makeChart("line-chart2", {
            "type": "serial",
            "theme": "light",
            "marginTop": 10,
            "marginRight": 0,
            "dataProvider": [{
                "year": "Jan",
                "value": 160,
                "value2": 85,
            }, {
                "year": "Feb",
                "value": 140,
                "value2": 95,
            }, {
                "year": "Mar",
                "value": 150,
                "value2": 90,
            }, {
                "year": "Apr",
                "value": 95,
                "value2": 125,
            }, {
                "year": "May",
                "value": 130,
                "value2": 105,
            }, {
                "year": "Jun",
                "value": 55,
                "value2": 120,
            }, {
                "year": "Jul",
                "value": 75,
                "value2": 110,
            }, {
                "year": "Aug",
                "value": 65,
                "value2": 140,
            }, {
                "year": "Sep",
                "value": 140,
                "value2": 100,
            }, {
                "year": "oct",
                "value": 120,
                "value2": 95,
            }, {
                "year": "Nov",
                "value": 110,
                "value2": 130,
            }, {
                "year": "Dec",
                "value": 180,
                "value2": 80,
            }],
            "valueAxes": [{
                "axisAlpha": 0,
                "minimum": 0,
                "maximum": 200,
                "position": "left"
            }],
            "graphs": [{
                "id": "g1",
                "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": 2,
                "bulletAlpha": 1,
                "bulletSize": 12,
                "stackable": false,
                "bulletColor": "#fff",
                "bulletBorderColor": "#a389d4",
                "bulletBorderThickness": 3,
                "lineColor": "#a389d4",
                "lineThickness": 2,
                "type": "smoothedLine",
                "valueField": "value"
            }, {
                "id": "g2",
                "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": 2,
                "bulletAlpha": 1,
                "bulletSize": 12,
                "stackable": false,
                "bulletColor": "#fff",
                "bulletBorderColor": "#1ddcc8",
                "bulletBorderThickness": 3,
                "lineColor": "#1ddcc8",
                "lineThickness": 2,
                "type": "smoothedLine",
                "valueField": "value2"
            }],
            "chartCursor": {
                "cursorAlpha": 0,
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "valueLineAlpha": 0.5,
                "fullWidth": true
            },
            "categoryField": "year",
            "categoryAxis": {
                "minorGridAlpha": 0,
                "minorGridEnabled": true,
                "gridAlpha": 0,
                "axisAlpha": 0,
                "lineAlpha": 0
            },
            "legend": {
                "useGraphSettings": true,
                "position": "top"
            },
        });
    }

    render() {
        return <div id='line-chart2' className="lineChart2 ChartShadow" style={{width: '100%', height: '350px'}} />;
    }
}

export default AmChartStatistics4;