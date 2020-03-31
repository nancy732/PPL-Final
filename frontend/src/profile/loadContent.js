import React, { useState } from "react";
import Onload from "./onload posts";
import ComplexList from "./complexList";
export default function LoadContent(props) {
  const [loading, setLoading] = useState(false);

  return (
    <ComplexList
      res={props.data}
      setLoading={setLoading}
      loading={loading}
      renderListItem={item => (
        <div>
          <Onload res={item} />
        </div>
      )}
      renderHeader={() => <span>{loading ? "Loading..." : ""}</span>}
    >
      <div>We have total {props.data.length} items</div>
    </ComplexList>
  );
}
