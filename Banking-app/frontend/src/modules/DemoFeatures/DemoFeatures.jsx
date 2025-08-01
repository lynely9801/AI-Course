import React from 'react';
import NfcDemo from './NfcDemo';
import SavingDemo from './SavingDemo';
import EkycDemo from './EkycDemo';
import VisaDemo from './VisaDemo';
import QrDemo from './QrDemo';

const DemoFeatures = () => (
  <div className="container py-4 fintech-bg">
    <h2 className="mb-4 text-center fintech-title">Demo các công nghệ ngân hàng</h2>
    <div className="row g-4">
      <div className="col-12 col-md-6">
        <NfcDemo />
        <SavingDemo />
        <EkycDemo />
      </div>
      <div className="col-12 col-md-6">
        <VisaDemo />
        <QrDemo />
      </div>
    </div>
  </div>
);

export default DemoFeatures;
