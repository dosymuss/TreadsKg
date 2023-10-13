import React from "react";
import { useEffect } from "react";
import { getPost } from "../api/post";
import { useState } from "react";
import TreadsAndReplies from "../ui/treads/TreadsAndReplies";

function Test() {
    const[data, setData] = useState([])
  useEffect(() => {
    getPost()
      .then((res) => {
        setData(res.data.results)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {data.map((item)=>{
        return <TreadsAndReplies author={item.author} image={item.image}  message={item.text}/>
      })}
    </div>
  );
}

export default Test;
