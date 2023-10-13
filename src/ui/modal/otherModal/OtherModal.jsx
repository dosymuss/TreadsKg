import "./otherModal.css";

const OtherModal = ({ active, children, setActive }) => {
    return (
      <div onClick={()=>{setActive(!active)}} className={active ? "modal-active" : "modal"}>
        <div className={"modal__content"}>{children}</div>
      </div>
    );
};

export default OtherModal;
