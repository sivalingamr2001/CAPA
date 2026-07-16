import type { Source, RcaSource, RcaDetail, CapaDetail } from '../types';

export const initialSources: Source[] = [
  { SOURCE_ID: 1, SOURCE_NAME: 'Internal Audit', CREATION_DATE: '2024-01-15', LAST_UPDATE_DATE: '2024-06-20', INACTIVE_DATE: null, CREATED_BY: 101 },
  { SOURCE_ID: 2, SOURCE_NAME: 'Customer Complaint', CREATION_DATE: '2024-02-10', LAST_UPDATE_DATE: '2024-05-12', INACTIVE_DATE: null, CREATED_BY: 102 },
  { SOURCE_ID: 3, SOURCE_NAME: 'Supplier Issue', CREATION_DATE: '2024-03-05', LAST_UPDATE_DATE: '2024-04-18', INACTIVE_DATE: '2025-01-01', CREATED_BY: 103 },
];

export const initialRcaSources: RcaSource[] = [
  { SOURCE_ID: 1, RCA_SOURCE_ID: 1, RCA_SOURCE: 'Equipment', RCA_CODE: 'EQ-001', RCA_DESCRIPTION: 'Equipment malfunction or breakdown', CREATED_BY: 101, CREATION_DATE: '2024-01-20', LAST_UPDATE_DATE: '2024-06-22', RCA_LIVE_FLAG: 1, RCA_INACTIVE_DATE: null },
  { SOURCE_ID: 2, RCA_SOURCE_ID: 2, RCA_SOURCE: 'Human Error', RCA_CODE: 'HE-001', RCA_DESCRIPTION: 'Mistake made by personnel', CREATED_BY: 102, CREATION_DATE: '2024-02-15', LAST_UPDATE_DATE: '2024-05-14', RCA_LIVE_FLAG: 1, RCA_INACTIVE_DATE: null },
  { SOURCE_ID: 3, RCA_SOURCE_ID: 3, RCA_SOURCE: 'Process', RCA_CODE: 'PR-001', RCA_DESCRIPTION: 'Inadequate or missing process', CREATED_BY: 103, CREATION_DATE: '2024-03-10', LAST_UPDATE_DATE: '2024-04-20', RCA_LIVE_FLAG: 0, RCA_INACTIVE_DATE: '2025-01-01' },
];

export const initialRcaDetails: RcaDetail[] = [
  { RCA_ID: 1, RCA_SOURCE_ID: 1, RCA_DATE: '2024-06-01', RCA_CODE: 'RCA-2024-001', RCA_DETAILS: 'Production line A stopped due to motor failure', RESPONSIBLE_DEPT: 'Production', RCA_SEVERITY: 'High', RCA_TARGET_DATE: '2024-06-15', RCA_APPROVED_USER: 201, RCA_CLOSED_DATE: null, LAST_UPDATE_DATE: '2024-06-10' },
  { RCA_ID: 2, RCA_SOURCE_ID: 2, RCA_DATE: '2024-06-05', RCA_CODE: 'RCA-2024-002', RCA_DETAILS: 'Wrong component assembled in batch #4452', RESPONSIBLE_DEPT: 'Assembly', RCA_SEVERITY: 'Critical', RCA_TARGET_DATE: '2024-06-20', RCA_APPROVED_USER: 202, RCA_CLOSED_DATE: null, LAST_UPDATE_DATE: '2024-06-12' },
  { RCA_ID: 3, RCA_SOURCE_ID: 1, RCA_DATE: '2024-05-20', RCA_CODE: 'RCA-2024-003', RCA_DETAILS: 'Temperature sensor calibration drift detected', RESPONSIBLE_DEPT: 'Quality', RCA_SEVERITY: 'Medium', RCA_TARGET_DATE: '2024-06-10', RCA_APPROVED_USER: 203, RCA_CLOSED_DATE: '2024-06-08', LAST_UPDATE_DATE: '2024-06-08' },
];

export const initialCapaDetails: CapaDetail[] = [
  { RCA_ID: 1, CAPA_ID: 1, CAPA_DATE: '2024-06-02', ROOT_CAUSE: 'Motor bearing wear due to lack of lubrication schedule', CORRECTIVE_DETAILS: 'Replaced motor bearing and resumed production', PREVENTIVE_DETAILS: 'Implement weekly lubrication checklist', CAPA_REMARKS: 'Under monitoring', CAPA_ATTACHMENT: 'motor_report.pdf', LAST_UPDATE_DATE: '2024-06-10' },
  { RCA_ID: 1, CAPA_ID: 2, CAPA_DATE: '2024-06-05', ROOT_CAUSE: 'Vendor supplied substandard lubricant', CORRECTIVE_DETAILS: 'Switched to certified vendor', PREVENTIVE_DETAILS: 'Add vendor qualification step', CAPA_REMARKS: 'Completed', CAPA_ATTACHMENT: 'vendor_cert.pdf', LAST_UPDATE_DATE: '2024-06-10' },
  { RCA_ID: 2, CAPA_ID: 3, CAPA_DATE: '2024-06-06', ROOT_CAUSE: 'Operator misread BOM revision', CORRECTIVE_DETAILS: 'Recalled batch and reworked components', PREVENTIVE_DETAILS: 'Digital BOM verification system', CAPA_REMARKS: 'In progress', CAPA_ATTACHMENT: 'bom_check.pdf', LAST_UPDATE_DATE: '2024-06-12' },
];