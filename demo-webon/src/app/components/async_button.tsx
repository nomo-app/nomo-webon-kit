import React from "react";

export const AsyncButton: React.FC<{
  onClick: () => Promise<any>;
  children: any;
}> = (props) => {
  const [loading, setLoading] = React.useState(false);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          color: "gray",
        }}
      >
        <LoadingSpinner />
        <h2>{props.children}</h2>
      </div>
    );
  }

  const handleClick = async () => {
    try {
      setLoading(true);
      await props.onClick();
    } finally {
      setLoading(false);
    }
  };

  return <h2 onClick={handleClick}>{props.children}</h2>;
};

const spinnerStyle = {
  border: "4px solid rgba(0, 0, 0, 0.1)",
  width: "20px",
  height: "20px",
  marginTop: "2px",
  marginRight: "2px",
  borderRadius: "50%",
  borderLeftColor: "#09f",
  animation: "spin 1s ease-in-out infinite",
};

const keyframes = `
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingSpinner = () => {
  return (
    <>
      <style>{keyframes}</style>
      <div style={spinnerStyle}></div>
    </>
  );
};
