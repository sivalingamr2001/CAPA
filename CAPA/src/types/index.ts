// ============================================
// TABLE 1: jan_sources (Master)
// ============================================
export interface Source {
  SOURCE_ID: number;
  SOURCE_NAME: string;
  CREATION_DATE: string;
  LAST_UPDATE_DATE: string;
  INACTIVE_DATE: string | null;
  CREATED_BY: number;
}

// ============================================
// TABLE 2: jan_rca_sources (Master)
// ============================================
export interface RcaSource {
  SOURCE_ID: number;
  RCA_SOURCE_ID: number;
  RCA_SOURCE: string;
  RCA_CODE: string;
  RCA_DESCRIPTION: string;
  CREATED_BY: number;
  CREATION_DATE: string;
  LAST_UPDATE_DATE: string;
  RCA_LIVE_FLAG: number;
  RCA_INACTIVE_DATE: string | null;
}

// ============================================
// TABLE 3: jan_rca_details (Transaction)
// ============================================
export interface RcaDetail {
  RCA_ID: number;
  RCA_SOURCE_ID: number;
  RCA_DATE: string;
  RCA_CODE: string;
  RCA_DETAILS: string;
  RESPONSIBLE_DEPT: string;
  RCA_SEVERITY: 'Critical' | 'High' | 'Medium' | 'Low';
  RCA_TARGET_DATE: string;
  RCA_APPROVED_USER: number;
  RCA_CLOSED_DATE: string | null;
  LAST_UPDATE_DATE: string;
}

// ============================================
// TABLE 4: jan_capa_details (Child Transaction)
// ============================================
export interface CapaDetail {
  RCA_ID: number;
  CAPA_ID: number;
  CAPA_DATE: string;
  ROOT_CAUSE: string;
  CORRECTIVE_DETAILS: string;
  PREVENTIVE_DETAILS: string;
  CAPA_REMARKS: string | null;
  CAPA_ATTACHMENT: string | null;
  LAST_UPDATE_DATE: string;
}

// ============================================
// UI / MODAL TYPES
// ============================================
export interface MasterFieldConfig {
  name: string;
  label: string;
  rules?: Array<{ required?: boolean; message?: string }>;
  isDate?: boolean;
  isSwitch?: boolean;
  component: React.ReactNode;
}

export interface ModalConfig {
  visible: boolean;
  table: 'sources' | 'rcaSources' | null;
  record: Source | RcaSource | null;
}

export interface SearchState {
  sources: string;
  rca: string;
}

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';