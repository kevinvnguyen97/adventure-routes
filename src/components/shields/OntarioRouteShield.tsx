import type { RouteShieldProps } from "@components/shields";

export const OntarioRouteShield = (props: RouteShieldProps) => {
  const { routeNumber } = props;
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        verticalAlign: "middle",
        width: "35px",
      }}
    >
      <img src="/images/Ontario_Route_Shield.png" height="100%" width="100%" />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -35%)`,
          color: "black",
          fontFamily: `Highway Gothic ${
            routeNumber.length > 2 ? "Condensed" : "Narrow"
          }`,
          fontSize: "26px",
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
