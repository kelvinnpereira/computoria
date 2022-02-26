import { useState } from "react";
import ContentLoader from "react-content-loader";
import { BiCopy } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";

import { usePush } from "../../hooks/push";
import Modal from "../modals";

const LoadView = () => (
  <ContentLoader viewBox="0 0 380 330">
    <rect x="10" y="20" width="350" height="40"/>
    <rect x="10" y="70" width="350" height="40"/>
    <rect x="10" y="120" width="350" height="40"/>
    <rect x="10" y="170" width="350" height="40"/>
    <rect x="10" y="220" width="350" height="40"/>
    <rect x="10" y="270" width="350" height="40"/>
  </ContentLoader>
);

const BtnAlreadyExecuted = ({ task, refresh }) => {
  const [open, setOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState({});
  const [textSearch, setTextSearch] = useState("");

  const {
    pushData,
    data,
    isLoading
  } = usePush(
    `/tasks/validations/${task}`);

  const contentChecklist = (checklist) => {
    return checklist?.tests.map((test, index2) =>
      <div
        className={`flex items-center justify-start p-2 space-x-4 ${index2 %
        2 ? "bg-gray-100" : ""}`}
        key={`list-already-executed-${index2}`}>
        <div className="flex flex-row w-full">
          <input
            type="checkbox"
            name="r1"
            onClick={() => {
              let newSelectedTasks = selectedTasks[checklist.jira_task] ??
                [];
              newSelectedTasks = newSelectedTasks.includes(
                test.id) ? newSelectedTasks.filter(
                t => t !== test.id) : [
                ...newSelectedTasks,
                test.id];
              setSelectedTasks(
                { [checklist.jira_task]: newSelectedTasks });
            }}
            className="form-checkbox text-blue-500 h-4 w-4 mr-2 self-center"
            value="0"/>
          <div
            className="text-sm">
            {test.id} - {test.status}
          </div>
        </div>
      </div>
    );
  };

  const contentRow = () => {
    return data?.checklists?.map((checklist, index) =>
      <>
        <h6
          className="font-bold"
          key={`title-already-executed-${index}`}>
          <BiCopy
            title="Use this task as already executed"
            onClick={async () => {
              await pushData(
                {
                  type: "save_already",
                  tasks: (
                    selectedTasks[checklist.jira_task]
                      ? selectedTasks
                      : {
                        [checklist.jira_task]: checklist.tests.map(
                          test => test.id)
                      })
                });
              refresh();
              pushData({ type: "already" });
              setTextSearch("");
              setSelectedTasks({});

            }}
            className="stroke-current inline align-middle cursor-pointer"/> - <a
          className="underline"
          target="_blank"
          href={`http://105.112.137.165:8080/browse/${checklist.jira_task}`}>{checklist.jira_task}</a>
        </h6>

        <br/>

        <span
          className="font-bold"
          key={`description-already-executed-${index}`}>
          {checklist.developer}
        </span>

        {contentChecklist(checklist)}
      </>
    );
  };

  return (<>
    <button
      onClick={() => {
        pushData({ type: "already" });
        setOpen(true);
      }}
      className="btn btn-default btn-rounded btn-icon bg-blue-500 hover:bg-blue-600 text-white space-x-1">
      <span>Already Executed</span>
    </button>
    <Modal
      title="Already Executed"
      body={
        <div className="text-sm">
          <div className="w-full mb-4 overflow-y-auto max-h-96 allow-scrollbar">
            {isLoading ? (
              LoadView()
            ) : (
              data?.checklists?.length ? (
                contentRow()
              ) : (
                <span className="text-center font-bold m-auto">No Already Executed</span>
              )
            )}
          </div>
        </div>
      }
      btns={
        <div className="flex items-end space-x-2">
          <div className="form-element" style={{ marginBottom: 0 }}>
            <input
              type="text"
              onChange={event => setTextSearch(event.target.value)}
              className="form-input"
              placeholder="Ex: BSC-513123"
              value={textSearch}
            />
          </div>
          <button
            className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
            type="button"
            onClick={() => {
              pushData({ type: "already_search", task: textSearch });
            }}>
            {isLoading
              ? (<FaSpinner
                className="spin-spinner stroke-current mr-2 inline align-middle"/>)
              : null}
            Search
          </button>
        </div>
      }
      open={open}
      setOpen={setOpen}
    />
  </>);
};

export default BtnAlreadyExecuted;