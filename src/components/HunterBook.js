import React from "react";
import "../App.css";
import Row from "./Row";
import { useDrop } from "react-dnd";

function HunterBook(props) {
  const [, drop] = useDrop(() => ({
    accept: "image",
    drop: () => {
      return props;
    },
    collect: (monitor) => ({
      isOverR: !!monitor.isOver(),
    }),
  })); 

  return (
    <div className="hunterbook" ref={drop} style={props.bookStyle}>
      <div className="s_tier">
        <Row globalList={props.globalList} pictures={props.PictureList}  update={props.update}  needUpdate={props.needUpdate} type="hunter_s" />
      </div>
      <div className="a_tier">
        <Row globalList={props.globalList} pictures={props.PictureList}  update={props.update}  needUpdate={props.needUpdate} type="hunter_a" />
      </div>
      <div className="b_tier">
        <Row globalList={props.globalList} pictures={props.PictureList}  update={props.update}  needUpdate={props.needUpdate} type="hunter_b" />
      </div>
      <div className="c_tier">
        <Row globalList={props.globalList} pictures={props.PictureList}  update={props.update}  needUpdate={props.needUpdate} type="hunter_c" />
      </div>
      <div className="d_tier">
        <Row globalList={props.globalList} pictures={props.PictureList}  update={props.update}  needUpdate={props.needUpdate} type="hunter_d" />
      </div>
    </div>
  );
}

export default HunterBook;