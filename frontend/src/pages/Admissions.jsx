import React from 'react';
import AdmissionsHero from '../components/AdmissionsHero';
import AdmissionProcedure from '../components/AdmissionProcedure';
import EligibilityAndFees from '../components/EligibilityAndFees';
import ImportantDates from '../components/ImportantDates';
import RequiredDocuments from '../components/RequiredDocuments';

const Admissions = () => {
  return (
    <main>
      <AdmissionsHero />
      <AdmissionProcedure />
      <EligibilityAndFees />
      <ImportantDates />
      <RequiredDocuments />
    </main>
  );
};

export default Admissions;
