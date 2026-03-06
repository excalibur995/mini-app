// SVG icons imported as React components via @svgr/webpack
// @svgr/webpack converts SVG files to react-native-svg components automatically
import AIIcon from "./icons/ai_icon.svg";
import BankIcon from "./icons/bank.svg";
import BellIcon from "./icons/bell.svg";
import BottomNavigation from "./icons/BottomNavigation.svg";
import CheckCircleIcon from "./icons/check-circle.svg";
import ChevronLeft from "./icons/chevron_left.svg";
import Close from "./icons/close.svg";
import EyeIcon from "./icons/eye.svg";
import GridIcon from "./icons/grid.svg";
import LogoutIcon from "./icons/logout.svg";
import MoreOutlined from "./icons/more_outlined_icon.svg";
import PhoneIcon from "./icons/phone.svg";
import ChevronRight from "./icons/right_chev.svg";
import ScanIcon from "./icons/scan_icon.svg";
import SearchIcon from "./icons/search.svg";
import SGIcon from "./icons/sg_icon.svg";
import ShieldIcon from "./icons/sheild.svg";
import StarIcon from "./icons/star.svg";

// Re-export subdirectory icons
export * from "./banks/index";
export * from "./icons/mbb_icons/index";
export * from "./icons/navigation/index";
export * from "./icons/quickActions/index";

// Export core icons
export {
  AIIcon,
  BankIcon,
  BellIcon,
  BottomNavigation,
  CheckCircleIcon,
  ChevronLeft,
  ChevronRight,
  Close,
  EyeIcon,
  GridIcon,
  LogoutIcon,
  MoreOutlined,
  PhoneIcon,
  ScanIcon,
  SearchIcon,
  SGIcon,
  ShieldIcon,
  StarIcon,
};
