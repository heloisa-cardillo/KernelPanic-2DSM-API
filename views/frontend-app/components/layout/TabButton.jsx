import React from "react";

const TabButton = ({active,selectTab,children}) => {
  const buttonClasses = active
  ? "menu-item menu-item-ativo"
  : "menu-item";

  return (
    <button onClick={selectTab} className={buttonClasses}>
      {children}
    </button>

  );
};

export default TabButton;