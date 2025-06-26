import type { RouteShieldProps } from "@components/shields";

export const IllinoisRouteShield = (props: RouteShieldProps) => {
  const { routeNumber } = props;
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        height: "30px",
        verticalAlign: "bottom",
        width: `${routeNumber.length > 2 ? "40" : "30"}px`,
      }}
    >
      <img
        src={`/images/${
          routeNumber.length > 2
            ? "Illinois_Route_Shield_Wide"
            : "Illinois_Route_Shield"
        }.png`}
        height="100%"
        width="100%"
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -35%)`,
          color: "black",
          fontFamily: "Highway Gothic",
          fontSize: "20px",
          letterSpacing: "0.5px",
          textAlign: "center",
          fontWeight: "normal",
        }}
      >
        {routeNumber}
      </div>
    </div>
  );
};
