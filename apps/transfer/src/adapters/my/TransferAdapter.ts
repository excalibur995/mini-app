import { TransferAdapter, TransferMode } from '../base';

export class MYTransferAdapter extends TransferAdapter {
  constructor() {
    super('MY');
  }

  getTransferModes(): TransferMode[] {
    return [
      {
        id: '1',
        title: 'DuitNow',
        name: 'DuitNow',
        description: 'Instant transfer via phone number or MyKad',
        currency: 'MYR',
        serviceFee: 0.5,
        transactionLimit: 5000,
        operatingHours: '24/7',
        logoSource: { uri: 'https://example.com/duitnow.png' },
      },
      {
        id: '2',
        title: 'Interbank GIRO',
        name: 'Interbank GIRO',
        description: 'Standard interbank transfer',
        currency: 'MYR',
        serviceFee: 1.0,
        transactionLimit: 10000,
        operatingHours: 'Monday-Friday 09:00-17:00',
        logoSource: { uri: 'https://example.com/giro.png' },
      },
      {
        id: '3',
        title: 'Instant Transfer',
        name: 'Instant Transfer',
        description: 'Real-time transfer to other banks',
        currency: 'MYR',
        serviceFee: 1.0,
        transactionLimit: 3000,
        operatingHours: '24/7',
        logoSource: { uri: 'https://example.com/instant.png' },
      },
      {
        id: '4',
        title: 'RENTAS',
        name: 'RENTAS',
        description: 'Real-time electronic transfer for large amounts',
        currency: 'MYR',
        serviceFee: 2.0,
        transactionLimit: 100000,
        operatingHours: 'Monday-Friday 08:30-17:30',
        logoSource: { uri: 'https://example.com/rentas.png' },
      },
    ];
  }

  getMockBalance(): number {
    return 15250; // MYR 15,250
  }
}
