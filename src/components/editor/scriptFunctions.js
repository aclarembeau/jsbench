import * as c3 from "c3";
import * as stats from "simple-statistics";

export function setupScriptFunctions({
  contextData,
  setContextData,
  setPlotModal,
}) {
  // Global functions accessible to eval
  let setContext = (key, value) =>
    setContextData({ ...contextData, [key]: value });
  let getContext = (key, value) => contextData[key];
  let removeContext = (key) => {
    delete contextData[key];
    setContextData({ ...contextData });
  };
  let plot = (props) => {
    setPlotModal(true);
    window.setTimeout(() => {
      var chart = c3.generate({
        bindto: "#chart",
        ...props,
      });

      let handler = () => chart.resize();
      let timeout = null;
      let prevWidth, prevHeight;
      window.setInterval(() => {
        let { width, height } = document
          .getElementById("chart")
          .getBoundingClientRect();

        if (width !== prevWidth || height !== prevHeight) {
          prevWidth = width;
          prevHeight = height;
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(handler, 500);
        }
      }, 500);
    }, 100);
  };
  return { getContext, setContext, removeContext, plot };
}

export const chartHelpers = {
  pieChart: `plot(({
    data: {
        // iris data from R
        columns: [
            ['data1', 30],
            ['data2', 120],
        ],
        type : 'pie',
    }
}))`,
  lineChart: `plot({
    data: {
        columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
        ]
    }
})`,
  barChart: `plot(({
    data: {
        columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 100, 140, 200, 150, 50]
        ],
        type: 'bar'
    },
    bar: {
        width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    }
}))`,
  areaChart: `plot(({
    data: {
        columns: [
            ['data1', 300, 350, 300, 0, 0, 0],
            ['data2', 130, 100, 140, 200, 150, 50]
        ],
        types: {
            data1: 'area',
            data2: 'area-spline'
        }
    }
}))`,
  donutChart: `plot(({
    data: {
        columns: [
            ['data1', 30],
            ['data2', 120],
        ],
        type : 'donut',
    },
    donut: {
        title: "Iris Petal Width"
    }
}))`,
  xyChart: `plot({
    data: {
        x: 'x',
        columns: [
            ['x', 30, 50, 100, 230, 300, 310],
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 300, 200, 300, 250, 450]
        ]
    }
}`,
  scatter: `plot(({
    data: {
        xs: {
            setosa: 'setosa_x',
            versicolor: 'versicolor_x',
        },
        // iris data from R
        columns: [
            ["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
            ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
            ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
            ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
        ],
        type: 'scatter'
    },
    axis: {
        x: {
            label: 'Sepal.Width',
            tick: {
                fit: false
            }
        },
        y: {
            label: 'Petal.Width'
        }
    }
}))`,
  stackedBar: `plot(({
    data: {
        columns: [
            ['data1', -30, 200, 200, 400, -150, 250],
            ['data2', 130, 100, -100, 200, -150, 50],
            ['data3', -230, 200, 200, -300, 250, 250]
        ],
        type: 'bar',
        groups: [
            ['data1', 'data2']
        ]
    },
    grid: {
        y: {
            lines: [{value:0}]
        }
    }
}))`,
};

export function getCompletions(contextData) {
  return [
    ...Object.entries(contextData).map(([key, value]) => ({
      value: `getContext('${key}')`,
    })),
    ...Object.entries(contextData).map(([key, value]) => ({
      value: `removeContext('${key}')`,
    })),
    ...Object.values(stats)
      .map((x) => x.prototype?.constructor?.name)
      .filter((x) => x)
      .map((x) => ({
        value: "stats." + x,
      })),
    ...Object.keys(Object.getOwnPropertyDescriptors(Math)).map((x) => ({
      value: "Math." + x,
    })),
    { value: "setContext" },
    ...Object.entries(chartHelpers).map(([key, value]) => ({
      caption: key,
      value,
    })),
  ];
}
