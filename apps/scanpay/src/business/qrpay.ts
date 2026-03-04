import axios from 'axios';
import { ValidationParams, QRValidationResponse } from '../types';

/**
 * API base URL - should be moved to environment configuration
 */
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.example.com';

/**
 * Validate QR code string
 */
export const validateQR = async (
  params: ValidationParams
): Promise<QRValidationResponse> => {
  try {
    const response = await axios.post<QRValidationResponse['data']>(
      `${API_BASE_URL}/qr/validate`,
      {
        qrString: params.qrString,
        fromAccountNumber: params.fromAccount.accountNumber,
        statusCode: params.qrStatusData.statusCode,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 seconds timeout
      }
    );

    return { data: response.data };
  } catch (error) {
    throw error;
  }
};

/**
 * Mock validation for testing - remove in production
 */
export const mockValidateQR = async (
  params: ValidationParams
): Promise<QRValidationResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: {
      statusCode: '0000',
      statusDesc: 'Success',
      data: {
        destAcc: '1234567890',
        txnType: 'DUITNOW',
        isStaticQr: false,
        multiCurrency: false,
        amount: '100.00',
        merchantName: 'Test Merchant',
      },
    },
  };
};
