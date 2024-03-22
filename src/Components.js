let Buttons = ({ Icon, btnColor, innerText, onClick, backgroundColor }) => {
  return (
    <>
      <button
        className={`btn btn-${btnColor && btnColor} text-white shadow-sm border-0 rounded-5 text-center`}
        style={{ backgroundColor: backgroundColor }}
     
        onClick={onClick}
      >
        {Icon && <i className={`bi bi-${Icon}  ${Icon && 'pe-2'}`}></i>}
        {innerText && innerText}
        

      </button>
    </>
  );
};

export { Buttons };
