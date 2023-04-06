import Svg, { Path, Rect } from "react-native-svg";
import { globalStyles } from "../../components/utils/globalStyles";

const GridIcon = ({ focused }) => {
  const color = focused ? "#FFFFFF" : "#212121";
  const bgcBtn = focused ? "#FF6C00" : "#F6F6F6";

  return (
    <Svg style={globalStyles.menuBtn} fill="none">
      <Rect width="70" height="40" rx="20" fill={bgcBtn} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26 11H33V18H26V11Z"
        stroke={color}
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37 11H44V18H37V11Z"
        stroke={color}
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37 22H44V29H37V22Z"
        stroke={color}
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26 22H33V29H26V22Z"
        stroke={color}
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default GridIcon;
