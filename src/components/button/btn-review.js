import { shallowEqual, useSelector } from "react-redux";

const BtnReview = ({ onApproveReview, task, title, color }) => {
  const taskReviewInfo = `${task}_REVIEW`;
  const { page } = useSelector(
    (state) => ({
      page: state.page
    }),
    shallowEqual
  );
  const dataReview = page[taskReviewInfo];
  const allowReview = (dataReview?.comment.includes("REVIEW_SUCCESS") ||
    (dataReview?.comment.includes("EXECUTION_ERROR") &&
      dataReview?.comment.includes("TEST_ERROR")) ||
    (dataReview?.comment.includes("REQUIREMENT_ERROR") &&
      dataReview?.comment.includes("MATCH_ERROR")));
  return <button
    disabled={!allowReview}
    onClick={onApproveReview}
    className={`btn btn-default btn-rounded btn-icon ${color} text-white space-x-1`}>
    <span>{title}</span>
  </button>;
};

export default BtnReview;