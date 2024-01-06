import "./loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <svg
        width="60"
        height="50"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="15" height="50" rx="7.5" fill="#3498db">
          <animate
            attributeName="height"
            values="50;10;50"
            begin="0s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values="0;20;0"
            begin="0s"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="20" width="15" height="50" rx="7.5" fill="#e74c3c">
          <animate
            attributeName="height"
            values="50;10;50"
            begin="0.2s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values="0;20;0"
            begin="0.2s"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="40" width="15" height="50" rx="7.5" fill="#f39c12">
          <animate
            attributeName="height"
            values="50;10;50"
            begin="0.4s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values="0;20;0"
            begin="0.4s"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
};

export default Loader;
