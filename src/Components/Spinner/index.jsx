import React, { useEffect, useState } from 'react';

function Delayed({ children, wait = 500 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeOut = window.setTimeout(() => { setShow(true); }, wait);
    return () => window.clearTimeout(timeOut);
  });

  return show === true ? children : null;
}
function Spinner() {
  return (
    <Delayed>
      <div className="w-full h-1/2 flex justify-center items-center ">
        <div className="animate-spin w-0 h-0 p-4 border-2 rounded-full border-r-blue-600" />
      </div>
    </Delayed>
  );
}

export default Spinner;
