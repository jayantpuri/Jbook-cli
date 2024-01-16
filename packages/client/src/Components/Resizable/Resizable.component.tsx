import React from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.style.css";

interface resizableProps {
  children?: React.ReactNode;
  direction: "vertical" | "horizontal";
}

export const Resizable = ({ direction, children }: resizableProps) => {
  let resizableProps: ResizableBoxProps;

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ["e"],
    };
  } else {
    resizableProps = {
      className: 'black',
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, window.innerHeight],
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
