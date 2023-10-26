import React, {useState} from "react";
import style from "../styles/interviewFeedback.module.css";

function Accordion(props) {
  const [isHidden, setIsHidden] = useState(true);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div
      id="accordion-color"
      data-accordion="collapse"
      data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white"
    >
      <h2 id="accordion-color-heading-1">
        <button
          type="button"
          className="flex items-center justify-between mt-2 mb-2 w-full p-5 font-medium text-left text-gray-800 border border-b-0 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800"
          data-accordion-target="#accordion-color-body-1"
          aria-expanded="true"
          aria-controls="accordion-color-body-1"
          onClick={toggleHidden}
        >
          <span>
            {props.index + 1} . {props.title}
          </span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-color-body-1"
        hidden={isHidden}
        className="bg-white mt-2 mb-2"
        aria-labelledby="accordion-color-heading-1"
      >
        <div className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-2 text-gray-800 dark:text-gray-400">
            <div className={style.record_box}>
              <span className="leading-7 text-gray-900 dark:text-white">
                {props.content}
              </span>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
              <img src={props.source} alt="source" style={{borderRadius:"10px"}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;