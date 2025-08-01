import type { RouteShieldProps } from "@components/shields";

export const CaliforniaRouteShield = (props: RouteShieldProps) => {
  const { routeNumber } = props;
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        verticalAlign: "middle",
        width: `${routeNumber.length > 2 ? "40" : "35"}px`,
      }}
    >
      <img
        src={`/images/${
          routeNumber.length > 2
            ? "California_Route_Shield_Wide"
            : "California_Route_Shield"
        }.png`}
        height="100%"
        width="100%"
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -30%)`,
          color: "white",
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
