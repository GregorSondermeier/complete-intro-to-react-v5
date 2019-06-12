// "how to trap focus within a modal" is not easy and is not part of this example

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  // useRef() is an interesting thing:
  // we will create an element and always want to refer to that same element.
  // because when we create a modal, we will create markup;
  // and when we destroy the modal, we want to destroy that markup and un-render it.
  // if we don't destroy the markup, we will leak memory if we open and close modals a bunch of times.
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  /**
   * we only want this effect to be run once, so the second argument (inputs) is an empty array
   */
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    // if you return a function in useEffect(), that is the cleanup function.
    // it will run it when it unmounts, so this is the componentWillUnmount() of hooks.
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
