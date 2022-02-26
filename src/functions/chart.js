import generateColor from "./generate-color";

const randomColor = [
  "#e60909",
  "#0933e6",
  "#ef9700",
  "#e9f626",
  "#14ea17",
  "#a631e3",
  "#2C7BFD",
  "#131A7F",
  "#80BD46",
  "#B51344",
  "#1B6FD2",
  "#3CB0A2",
  "#7C87CE",
  "#2AD69B",
  "#9407AA",
  "#91DF97",
  "#BB596C",
  "#373692",
  "#10DE52",
  "#24E4A9",
  "#0FEB19",
  "#0C3D0B",
  "#7C121F",
  "#6F0746",
  "#2DCE78",
  "#309EF2",
  "#97850F",
  "#36E1C7",
  "#68329F",
  "#0B88F9",
  "#1B54E5",
  "#9A0E05",
  "#CAB9EA",
  "#FD3362",
  "#AAFA47",
  "#524AA8",
  "#8A0505",
  "#C599C3",
  "#D7FAEB",
  "#8432FB",
  "#FA2B16",
  "#34B368",
  "#4798E0",
  "#1AE4DC",
  "#FD740F",
  "#E9B1DF",
  "#C9BD22",
  "#273614",
  "#4432E1",
  "#5C2B35",
  "#E42769",
  "#D2B947",
  "#D7CE59",
  "#8F93CB",
  "#2D7909",
  "#2A8C27",
  "#1541C5",
  "#84C8F0",
  "#B18B7A",
  "#479511",
  "#BCCC42",
  "#235582",
  "#FDCBA1",
  "#C0A829",
  "#DD0ECC",
  "#8590DD",
  "#CF2717",
  "#C22317",
  "#EEF0F4",
  "#31973E",
  "#6C501E",
  "#9B7DD6",
  "#606B65",
  "#221C70",
  "#924F9E",
  "#2467B2",
  "#A46488",
  "#FACADB",
  "#74B82B",
  "#1F2374",
  "#2BD142",
  "#1D6101",
  "#A457E5",
  "#BC4D10",
  "#819D02",
  "#DC7656",
  "#C4A891",
  "#2A9E0B",
  "#7FDC73",
  "#DFC446",
  "#8F1EA3",
  "#C6C4CD",
  "#E5375D",
  "#79E3AA",
  "#5EBBAA",
  "#8F24DD",
  "#C42BE8",
  "#1BB132",
  "#574BB9",
  "#B57566",
  "#05F083",
  "#44102B",
  "#DB8D27",
  "#A221EA",
  "#1D6BCE"];

function movingAvg (array, count, qualifier) {
  let avg = function (array, qualifier) {

    let sum = 0, count = 0, val;
    for (let i in array) {
      val = array[i];
      if (!qualifier || qualifier(val)) {
        sum += val;
        count++;
      }
    }

    return sum / count;
  };

  let result = [], val;

  for (let i = 0; i < count - 1; i++)
    result.push(null);

  for (let i = 0, len = array.length - count; i <= len; i++) {

    val = avg(array.slice(i, i + count), qualifier);
    if (isNaN(val))
      result.push(null);
    else
      result.push(val.toFixed(2));
  }

  return result;
}

function loadFilterChartByVisualization (
  elements, mapCallBack, filterCallBack, typeChart) {
  let labels;
  let dataSet = [];
  if (typeChart === "date") {
    labels = elements.map(item => item.duedate);
    labels = [...new Set(labels)];

    let visualizations = elements.map(mapCallBack);
    visualizations = [...new Set(visualizations)];
    visualizations.forEach(function (vi, index) {
      let count = labels.map(date => elements.filter(
        item => filterCallBack(item, vi) && item.duedate === date).length);
      dataSet.push({
        label: vi ? vi : "-----",
        backgroundColor: randomColor[index],
        borderColor: randomColor[index],
        data: count,
        fill: false

      });
    });
  } else {
    labels = elements.map(item => item.assign);
    labels = [...new Set(labels)];
    let gradient = generateColor("#ff0000", "#00ff08", labels.length);

    let dataLabels = labels.map(label => {
      return {
        label: label,
        data: elements.filter(element => element.assign === label).length
      };
    });
    dataLabels = dataLabels.sort((a, b) => a.data - b.data);
    dataSet = [
      {
        label: "Count",
        backgroundColor: gradient,
        borderColor: gradient,
        data: dataLabels.map(item => item.data),
        fill: true
      }];
    labels = dataLabels.map(item => item.label);
  }

  return {
    labels: labels.map(label => label ? label : "-----"),
    datasets: dataSet
  };
}

function getWeekNumber (d) {
  if (!d) {
    return;
  }
  if (d.includes("T")) {
    d = d.substring(0, d.indexOf("T"));
  }
  d = new Date(d.replace(new RegExp("-", "g"), "/"));
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getMonthNumber (d) {
  if (!d) {
    return;
  }
  if (d.includes("T")) {
    d = d.substring(0, d.indexOf("T"));
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  d = new Date(d.replace(new RegExp("-", "g"), "/"));

  return `${d.getFullYear()}/${monthNames[d.getMonth()]}`;

}

export function getWeeks (elements) {
  elements.forEach(element => {
    element.weekCreate = getWeekNumber(element.duedate);
    element.weekClose = getWeekNumber(element.resolutiondate);
  });

  let weeks = elements.map(item => item.weekCreate).
    concat(elements.map(item => item.weekClose)).
    filter(week => week);
  return [...new Set(weeks)].sort((a, b) => a - b);
}

function loadFilterChartByBacklog (elements) {
  let weeks = getWeeks(elements);

  let created = weeks.map(week => elements.filter(
    item => item.weekCreate && item.weekCreate === week).length);
  let createdComplete = weeks.map(week => elements.filter(
    item => item.weekCreate && item.weekCreate === week &&
      item.issueType?.toLowerCase().includes("complete")).length);
  let createdRequirement = weeks.map(week => elements.filter(
    item => item.weekCreate && item.weekCreate === week &&
      item.issueType?.toLowerCase().includes("requirement")).length);
  let createdMps = weeks.map(week => elements.filter(
    item => item.weekCreate && item.weekCreate === week &&
      item.issueType?.toLowerCase().includes("mps")).length);

  let closed = weeks.map(week => elements.filter(
    item => item.weekClose && item.weekClose === week).length);
  let closedComplete = weeks.map(week => elements.filter(
    item => item.weekClose && item.weekClose === week &&
      item.issueType?.toLowerCase().includes("complete")).length);
  let closedRequirement = weeks.map(week => elements.filter(
    item => item.weekClose && item.weekClose === week &&
      item.issueType?.toLowerCase().includes("requirement")).length);
  let closedMps = weeks.map(week => elements.filter(
    item => item.weekClose && item.weekClose === week &&
      item.issueType?.toLowerCase().includes("mps")).length);

  let backlog = created.map((cCount, index) => cCount - closed[index]);
  backlog = backlog.map(
    (sum => value => sum += ((value * -1) > sum ? (sum * -1) : value))(0));

  let labels = weeks.map(item => `w${item}`);

  return {
    labels: labels,
    datasets: [
      {
        label: "Backlog",
        borderColor: "#41464e",
        backgroundColor: "#41464e",
        data: backlog,
        type: "line",
        order: 0,
        tension: 0,
        fill: false
      },
      {
        label: "4 Point Moving Average Due",
        borderColor: "#fc1a1a",
        backgroundColor: "#724c01",
        data: movingAvg(created, 4, function (val) {
          return val !== 0;
        }),
        type: "line",
        order: 1,
        tension: 0,
        fill: false
      }, {
        label: "4 Point Moving Average Closed",
        borderColor: "#27e1f3",
        backgroundColor: "#002992",
        data: movingAvg(closed, 4, function (val) {
          return val !== 0;
        }),
        type: "line",
        order: 2,
        tension: 0,
        fill: false
      }, {
        label: "Due Complete",
        backgroundColor: "rgba(255,78,78,0.84)",
        data: createdComplete,
        order: 3,
        stack: "a"
      }, {
        label: "Due Requirement",
        backgroundColor: "rgba(78,255,93,0.84)",
        data: createdRequirement,
        order: 3,
        stack: "a"
      }, {
        label: "Due MPS",
        backgroundColor: "rgba(234,200,0,0.84)",
        data: createdMps,
        order: 3,
        stack: "a"
      },

      {
        label: "Closed Complete",
        backgroundColor: "rgba(255,78,78,0.84)",
        data: closedComplete,
        order: 4,
        stack: "b"
      }, {
        label: "Closed Requirement",
        backgroundColor: "rgba(78,255,93,0.84)",
        data: closedRequirement,
        order: 4,
        stack: "b"
      }, {
        label: "Closed MPS",
        backgroundColor: "rgba(234,200,0,0.84)",
        data: closedMps,
        order: 4,
        stack: "b"
      }]
  };
}

function loadFilterChart (elements) {
  let dates = elements.map(item => item.duedate);
  dates = [...new Set(dates)];
  let submitted = dates.map(date => elements.filter(
    item => item.duedate === date && item.status === "Submitted").length);
  let progress = dates.map(date => elements.filter(
    item => item.duedate === date &&
      (item.status === "In Progress" || item.status === "Opened" ||
        item.status === "Em Andamento")).length);
  let closed = dates.map(date => elements.filter(
    item => item.duedate === date &&
      (item.status === "Closed" || item.status === "Resolved" || item.status ===
        "Resolvido" || item.status === "Fechado")).length);
  let review = dates.map(date => elements.filter(
    item => item.duedate === date && item.status === "Review").length);
  let hold = dates.map(date => elements.filter(
    item => item.duedate === date && item.status === "On Hold").length);
  let others = dates.map(date => elements.filter(
    item => item.duedate === date && item.status !== "Submitted" &&
      item.status !== "Closed" && item.status !== "Resolved" && item.status !==
      "Resolvido" && item.status !== "Fechado"
      && item.status !== "In Progress" && item.status !== "Opened" &&
      item.status !== "Em Andamento" && item.status === "On Hold" &&
      item.status === "Review").length);

  let labels = dates.map(item => item ? item : "------");
  return {
    labels: labels,
    datasets: [
      {
        label: "Submitted",
        backgroundColor: "#e60909",
        data: submitted
      }, {
        label: "In Progress",
        backgroundColor: "#0933e6",
        data: progress
      }, {
        label: "Review",
        backgroundColor: "#e9f626",
        data: review
      }, {
        label: "On Hold",
        backgroundColor: "#ef9700",
        data: hold
      }, {
        label: "Closed",
        backgroundColor: "#14ea17",
        data: closed
      }, {
        label: "Others",
        backgroundColor: "#a631e3",
        data: others
      }]
  };
}

function loadFilterChartByMonth (elements) {
  elements = elements.sort((a, b) => ("" + a.createdate).localeCompare(b.createdate))
  let months = elements.map(element => getMonthNumber(element.createdate));
  months = [...new Set(months)];
  let tasksMonth = months.map(date => elements.filter(
    item => getMonthNumber(item.createdate) === date).length);

  let labels = months.map(item => item ? item : "------");

  return {
    labels: labels,
    datasets: [
      {
        label: "Count By Month",
        backgroundColor: "#e60909",
        data: tasksMonth

      }]
  };
}

function loadFollowByStatus (results) {
  let submitted = results.filter(item => item.status === "Submitted");
  let inProgress = results.filter(
    item => (item.status === "In Progress" || item.status === "Opened" ||
      item.status === "Em Andamento"));
  let onHold = results.filter(result => result.status === "On Hold");
  let review = results.filter(result => result.status === "Review");
  let closed = results.filter(
    item => (item.status === "Closed" || item.status === "Resolved" ||
      item.status === "Resolvido" || item.status === "Fechado"));
  let others = results.filter(item => item.status !== "Submitted" &&
    item.status !== "Closed" && item.status !== "Resolved" && item.status !==
    "Resolvido" && item.status !== "Fechado"
    && item.status !== "In Progress" && item.status !== "Opened" &&
    item.status !== "Em Andamento" && item.status === "On Hold" &&
    item.status === "Review");

  return {
    labels: [
      "Submitted",
      "In Progress",
      "On Hold",
      "Review",
      "Closed",
      "Others"],
    data: [submitted, inProgress, onHold, review, closed, others]
  };
}

function loadFollowByDev (results) {
  let group = {};
  results.forEach(item => {
    group[item.assign] = group[item.assign]
      ? group[item.assign].concat(item)
      : [item];
  });

  let labels = Object.keys(group);
  return {
    labels: labels,
    data: labels.map(label => group[label])
  };
}

function loadFollowByDevice (results) {
  let group = {};
  results.forEach(item => {
    group[item.modelName] = group[item.modelName]
      ? group[item.modelName].concat(item)
      : [item];
  });

  let labels = Object.keys(group);
  return {
    labels: labels,
    data: labels.map(label => group[label])
  };
}

function loadFollowByDate (results) {
  let group = {};
  results.forEach(item => {
    group[item.duedate] = group[item.duedate]
      ? group[item.duedate].concat(item)
      : [item];
  });

  let labels = Object.keys(group);
  let sortable = labels.map(key => [key, group[key]]);

  sortable.sort();
  return {
    labels: sortable.map(item => item[0]),
    data: sortable.map(item => item[1])
  };
}

function loadFollowChart (results, loadFunction, chartType) {
  let dataResults = loadFunction(results);
  let data;
  if (chartType === "bar") {
    data = {
      labels: dataResults.labels,
      datasets: [
        {
          label: "Due Date",
          backgroundColor: randomColor,
          data: dataResults.data.map(d => d.length)
        }]
    };

  } else {
    data = {
      labels: dataResults.labels,
      datasets: [
        {
          backgroundColor: randomColor,
          data: dataResults.data.map(d => d.length)
        }]
    };
  }

  return data;
}

export function loadData (type, elements) {
  const options = {
    "status-by-date": loadFilterChart,
    "count-by-month": loadFilterChartByMonth,
    "developer-by-date": (elements) => loadFilterChartByVisualization(elements,
      item => item.assign, (item, vi) => item.assign === vi, "date"),
    "developer-by-count": (elements) => loadFilterChartByVisualization(elements,
      item => item.assign, (item, vi) => item.assign === vi, "count"),
    "device-by-date": (elements) => loadFilterChartByVisualization(elements,
      item => item.modelName, (item, vi) => item.modelName === vi, "date"),
    "backlog": (elements) => loadFilterChartByBacklog(elements),
    "follow-by-status": (elements) => loadFollowChart(elements,
      loadFollowByStatus, "doughnut"),
    "follow-by-device": (elements) => loadFollowChart(elements,
      loadFollowByDevice, "doughnut"),
    "follow-by-developer": (elements) => loadFollowChart(elements,
      loadFollowByDev, "doughnut"),
    "follow-by-date": (elements) => loadFollowChart(elements,
      loadFollowByDate, "bar")
  };
  return options[type](elements);
}