import Link from "next/link";
import { Badge } from "../components/badges";
import { GoLinkExternal } from "react-icons/go";

export function loadIssues (elements, extraColumns) {
  return elements.map(function (item) {
    let extraTds = extraColumns.split(",").
      filter(item => item).
      map(column => extractInformation(item, column)).
      join(" - ");
    return insertIssue(item, extraTds);
  });
}

function extractInformation (element, column) {
  if (element[column]) {
    return element[column];
  }
  let target;
  switch (column) {
    case "target_date":
      target = "[Target Date]";
      break;
    case "target_model":
      return element.custom_fields.customfield_11216;
  }
  if (target && element.description.includes(target)) {
    let content = element.description.substring(
      element.description.indexOf(target) + target.length);
    content = content.substring(0, content.indexOf("["));
    content = content.replace("[", "").
      replace("]", "").
      replace("\n", "").
      replace("\r", "").
      replace(":", "").
      replace(new RegExp("\\*", "g"), "").
      replace(new RegExp(",", "g"), "").
      replace(new RegExp(";", "g"), "").
      replace(new RegExp("\n", "g"), "").
      replace(new RegExp("\r", "g"), "");
    return content;

  }
  return `No ${column}`;
}

function toDateFormat (date) {
  try {
    let d = new Date(date);
    return d.getFullYear() + "-" +
      (d.getMonth() + 1).toString().padStart(2, "0") + "-" +
      d.getDate().toString().padStart(2, "0");
  } catch (e) {
    return "";
  }
}

function insertIssue (item, extraTds) {
  let summary = item.summary + (extraTds ? ` - ${extraTds}` : "");
  let jiraLink = item.jiraID.includes("CAT") ||
  (item.jiraID.includes("RM") && !item.jiraID.includes("TGRM"))
    ? <a title="Open to JIRA"
         href={`http://105.112.137.165:8080/browse/${item.jiraID}`}
         target="_blank"><GoLinkExternal className="inline mb-1"/></a>
    : <a title="Open to JIRA"
         href={`http://105.112.137.165:8080/browse/${item.jiraID}`}
         target="_blank"><GoLinkExternal className="inline mb-1"/></a>;

  let link = item.summary.includes("[Type:") &&
  !item.summary.includes("Review") ? (
    <Link href={`/dashboard/tasks/${item.jiraID}`}>
      <a className="underline mr-2">{item.jiraID}</a>
    </Link>) : (
    item.jiraID.startsWith("TGRM-") ? (
      <Link href={`/dashboard/tgrms/review/${item.jiraID}`}>
        <a className="underline mr-2">{item.jiraID}</a>
      </Link>
    ) : <span className="mr-2">{item.jiraID}</span>
  );

  return {
    ...item,
    key: [link, jiraLink],
    summary: <p
      className="break-words whitespace-normal max-w-xl">{summary}</p>,
    status: item.status,
    date: <>{item.duedate ? <span>Due: {item.duedate}</span> : null} <br/> {
      <span>Create: {toDateFormat(item.createdate)} <br/> {isDelayed(
        item)}</span>}</>,
    assignLink: <a href={`mysingleim://${item.assign}`}
                   className="underline">{item.assign}</a>,
    group: item.carrier_group
  };
}

function isDelayed (item) {
  let due = item.duedate;
  let create = item.createdate;
  let summary = item.summary;
  if (!due || !create) {
    return;
  }
  if (create.includes("T")) {
    create = create.split("T")[0];
  }
  let dueDate = new Date(due.replace(new RegExp("-", "g"), "/"));
  dueDate.setHours(23, 0, 0);
  let createDate = new Date(create.replace(new RegExp("-", "g"), "/"));
  createDate.setHours(23, 0, 0);
  let dueDateWrong = "";
  let delayed = "";
  let plainDays = 0;
  let days;
  if (summary.includes("IMS")) {
    plainDays = 3;
  } else if (summary.includes("Requirement")) {
    plainDays = 3;
  } else if (summary.includes("Complete")) {
    plainDays = 5;
  } else if (summary.includes("MPS")) {
    plainDays = 1;
  }
  if (!item.resolutiondate) {
    if (dueDate < new Date() &&
      !(item.status === "Closed" || item.status === "Resolved" ||
        item.status === "Resolvido" || item.status === "Fechado")) {
      delayed = <Badge rounded
                       size="sm"
                       color="bg-red-200 text-red-600"
                       extraClass="mb-1 mr-1"
                       alt>Delayed</Badge>;
    }
  } else {
    let resolutionDate = new Date(item.resolutiondate);
    resolutionDate.setHours(22, 0, 0);
    if (dueDate < resolutionDate &&
      ["Closed", "Resolved", "Resolvido", "Fechado"].includes(item.status)) {
      delayed = <Badge rounded
                       size="sm"
                       color="bg-red-200 text-red-600"
                       extraClass="mb-1 mr-1"
                       alt>Delayed</Badge>;
    }
  }

  if (dueDate > createDate) {
    days = daysBetween(createDate, dueDate);
  } else {
    days = daysBetween(dueDate, createDate);
  }
  if (days < plainDays) {
    dueDateWrong = <Badge rounded
                          size="sm"
                          color="bg-yellow-200 text-yellow-600"
                          extraClass="mb-1 mr-1"
                          alt>Due Date Wrong</Badge>;
  }
  if (delayed || dueDateWrong) {
    return [delayed, dueDateWrong];
  }
}

export function statusDelayed (item) {
  let due = item.duedate;
  let create = item.createdate;
  let summary = item.summary;
  if (!due || !create) {
    return "";
  }
  if (create.includes("T")) {
    create = create.split("T")[0];
  }
  let dueDate = new Date(due.replace(new RegExp("-", "g"), "/"));
  dueDate.setHours(23, 0, 0);
  let createDate = new Date(create.replace(new RegExp("-", "g"), "/"));
  createDate.setHours(23, 0, 0);
  let plainDays = 0;
  let days;
  if (summary.includes("IMS")) {
    plainDays = 3;
  } else if (summary.includes("Requirement")) {
    plainDays = 3;
  } else if (summary.includes("Complete")) {
    plainDays = 5;
  } else if (summary.includes("MPS")) {
    plainDays = 1;
  }

  if (dueDate > createDate) {
    days = daysBetween(createDate, dueDate);
  } else {
    days = daysBetween(dueDate, createDate);
  }

  let delayed = (dueDate < new Date() &&
    !(item.status === "Closed" || item.status === "Resolved" || item.status ===
      "Resolvido" || item.status === "Fechado"));
  let dateWrong = (days < plainDays);
  if (delayed && !dateWrong) {
    return 1;
  } else if (!delayed && !dateWrong) {
    return 2;
  } else if (dateWrong) {
    return 3;
  }
}

export function daysBetween (date1, date2) {
  let one_day = 1000 * 60 * 60 * 24;
  let date1_ms = date1.getTime();
  let date2_ms = date2.getTime();
  let difference_ms = date2_ms - date1_ms;
  return Math.round(difference_ms / one_day);
}

export function filterElements (results, extraColumns = "", filterTable = "") {
  let elementsFilterDataTable = [];
  if (!results) {
    return [];
  }

  const search = (item, filterTableItem) => {
    if (item.jiraId && item.jiraId.includes(filterTableItem)) {
      return true;
    } else if (item.summary &&
      item.summary.toLowerCase().includes(filterTableItem.toLowerCase())) {
      return true;
    } else if (item.duedate && item.duedate.includes(filterTableItem)) {
      return true;
    } else if (item.createdate && item.createdate.includes(filterTableItem)) {
      return true;
    } else if (item.status &&
      item.status.toLowerCase().includes(filterTableItem.toLowerCase())) {
      return true;
    } else if (item.assign &&
      item.assign.toLowerCase().includes(filterTableItem.toLowerCase())) {
      return true;
    } else return !!(item.carrier_group &&
      item.carrier_group.toLowerCase().includes(filterTableItem.toLowerCase()));
  };

  elementsFilterDataTable = results.filter(item => filterTable.split(" ").
      filter(filterTableItem => search(item, filterTableItem)).length ===
    filterTable.split(" ").length);
  elementsFilterDataTable.forEach(function (element) {
    element["extra"] = extraColumns.split(",").
      filter(item => item).
      map(column => extractInformation(element, column)).
      join(" - ");
    element["extra_columns"] = extraColumns.split(",").map(column => {
      return { "column": column, "value": extractInformation(element, column) };
    });
  });

  return elementsFilterDataTable;
}