import { TransferAdapter, TransferMode } from '../base';

export class IDTransferAdapter extends TransferAdapter {
  constructor() {
    super('ID');
  }

  getTransferModes(): TransferMode[] {
    return [
      {
        id: '1',
        title: 'BI-FAST',
        name: 'BI-FAST',
        description: 'Transfer instan antar bank dalam hitungan detik',
        currency: 'IDR',
        serviceFee: 2500,
        transactionLimit: 25000000,
        operatingHours: '24/7',
        logoSource: { uri: 'https://example.com/bifast.png' },
      },
      {
        id: '2',
        title: 'BI-SKN',
        name: 'BI-SKN',
        description: 'Transfer antar bank dengan proses 1-2 jam kerja',
        currency: 'IDR',
        serviceFee: 1500,
        transactionLimit: 50000000,
        operatingHours: 'Senin-Jumat 08:00-16:00',
        logoSource: { uri: 'https://example.com/biskn.png' },
      },
      {
        id: '3',
        title: 'Transfer Online',
        name: 'Transfer Online',
        description: 'Transfer online standar dengan biaya rendah',
        currency: 'IDR',
        serviceFee: 3000,
        transactionLimit: 10000000,
        operatingHours: '24/7',
        logoSource: { uri: 'https://example.com/online.png' },
      },
      {
        id: '4',
        title: 'RTGS',
        name: 'RTGS',
        description: 'Real-time transfer untuk jumlah besar',
        currency: 'IDR',
        serviceFee: 5000,
        transactionLimit: 100000000,
        operatingHours: 'Senin-Jumat 08:00-16:00',
        logoSource: { uri: 'https://example.com/rtgs.png' },
      },
    ];
  }

  getMockBalance(): number {
    return 25000000; // IDR 25,000,000 (~$1,600 USD)
  }
}
