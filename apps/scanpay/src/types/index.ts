export interface Account {
  accountNumber: string;
  accountName: string;
  accountType: string;
  balance?: number;
  currency?: string;
}

export interface QRStatusObject {
  statusCode: string;
  statusDesc?: string;
}

export interface QRValidationResponse {
  data: {
    statusCode: string;
    statusDesc: string;
    data: {
      destAcc: string;
      txnType: string;
      isStaticQr: boolean;
      multiCurrency: boolean;
      [key: string]: any;
    };
  };
}

export interface QRScannerProps {
  defaultFromAccount: Account;
  qrStatusObj: QRStatusObject;
  onLoading: (loading: boolean) => void;
  filteredAccList: Account[];
}

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

export interface ValidationParams {
  qrString: string;
  fromAccount: Account;
  qrStatusData: QRStatusObject;
}
