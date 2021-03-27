import React, { useState, useEffect, useRef } from "react";
import D3Component from "./d3-component";
import { useThrottle } from "@react-hook/throttle";
import fakeData from "./fakeData";
let vis;

export default function ReactComponent() {
  const [data, setData] = useState(null);
  const [width, setWidth] = useThrottle(600, 15);
  const [height, setHeight] = useThrottle(600, 15);
  const [active, setActive] = useState(null);
  const refElement = useRef(null);

  useEffect(fetchData, []);
  useEffect(handleResizeEvent, []);
  useEffect(initVis, [data]);
  useEffect(updateVisOnResize, [width, height]);

  function fetchData() {
    Promise.resolve().then(() => setData(fakeData));
  }

  function handleResizeEvent() {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }

  function initVis() {
    if (data && data.length) {
      const d3Props = {
        data,
        width,
        height,
        onDatapointClick: setActive
      };
      vis = new D3Component(refElement.current, d3Props);
    }
  }

  function updateVisOnResize() {
    vis && vis.resize(width, height);
  }

  return (
    <div className="react-world">
      <div>{active}</div>
      <div ref={refElement} />
    </div>
  );
}
