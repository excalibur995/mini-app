// Image exports - using static imports for better bundler compatibility
// This allows rspack to properly resolve and bundle the images

const maybankLogo = require("./media/images/maybank-logo.png");
const cimbLogo = require("./media/images/cimb-logo.png");
const cimb = require("./media/images/cimb.png");
const publicBankLogo = require("./media/images/public-bank-logo.jpg");
const grabpayLogo = require("./media/images/grabpay-logo.png");
const tngLogo = require("./media/images/tng-logo.png");
const bankIcon = require("./media/images/bank-icon.jpg");
const xcel = require("./media/images/xcel.png");

export const images = {
  maybankLogo,
  cimbLogo,
  cimb,
  publicBankLogo,
  grabpayLogo,
  tngLogo,
  bankIcon,
  xcel,
};
