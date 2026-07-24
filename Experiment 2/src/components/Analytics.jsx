import { useSelector } from "react-redux";

import {
  selectPostAnalytics,
} from "../features/posts/postsSelectors";

function Analytics() {
  const analytics = useSelector(
    selectPostAnalytics
  );

  return (
    <div className="analytics">
      <h2>Post Analytics</h2>

      <div className="analytics-grid">
        <div>
          <h3>Total Posts</h3>
          <p>{analytics.total}</p>
        </div>

        <div>
          <h3>Published</h3>
          <p>{analytics.published}</p>
        </div>

        <div>
          <h3>Drafts</h3>
          <p>{analytics.drafts}</p>
        </div>

        <div>
          <h3>Scheduled</h3>
          <p>{analytics.scheduled}</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;