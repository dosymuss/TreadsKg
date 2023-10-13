import "./LogOutModal.css";

const LogOutModal = ({ active, children, setActive }) => {
  
  if (setActive === undefined) {
    return (
      <div className={active ? "modal-active" : "modal"}>
        <div className={"modal__content"}>{children}</div>
      </div>
    );
  } else {
    return (
      <div
        onClick={() => {
          setActive(!active);
        }}
        className={active ? "modal-active" : "modal"}
      >
        <div className={"modal__content"}>{children}</div>
      </div>
    );
  }
};

export default LogOutModal;
