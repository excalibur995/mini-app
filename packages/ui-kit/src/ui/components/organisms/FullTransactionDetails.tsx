import React from "react";
import { TransactionDetails } from "../molecules";
import { TransferDetails } from "../molecules";

export const FullTransactionDetails: React.FC<
  React.ComponentProps<typeof TransactionDetails> &
    React.ComponentProps<typeof TransferDetails>
> = (props) => {
  return (
    <React.Fragment>
      <TransactionDetails {...props} />
      <TransferDetails {...props} />
    </React.Fragment>
  );
};
