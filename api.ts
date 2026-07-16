import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // Assuming your API is served from the same origin under /api
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling helper
apiClient.interceptors.response.use(
  response => response,
  error => {
    // You can add global error handling here, e.g., for 401 Unauthorized
    console.error('API call error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// --- Type Definitions based on DTOs and Frontend Usage ---

// Master (Source) Types
export interface Master {
  sourceId: number;
  // Add other Master properties here based on your actual DTO
  name: string;
}
export type CreateMasterDto = Omit<Master, 'sourceId'>;
export type UpdateMasterDto = Partial<CreateMasterDto>;

// Master Detail (Source Detail) Types
export interface MasterDetail {
  rcaSourceId: number;
  // Add other MasterDetail properties here
  detailName: string;
}
export type CreateSourceDetailDto = Omit<MasterDetail, 'rcaSourceId'>;
export type UpdateSourceDetailDto = Partial<CreateSourceDetailDto>;

// RCA Types
export interface Rca {
  rcaId: number;
  rcaDate: string; // 'YYYY-MM-DD'
  rcaCode: string;
  rcaDetails: string;
  responsibleDept: string;
  rcaSeverity: 'Critical' | 'High' | 'Medium' | 'Low';
  rcaTargetDate: string; // 'YYYY-MM-DD'
  rcaClosedDate?: string | null;
  lastUpdateDate: string;
  rcaApprovedUser?: number;
}

export type CreateRcaDto = Omit<Rca, 'rcaId' | 'lastUpdateDate'>;
export type UpdateRcaDto = Partial<CreateRcaDto>;

// CAPA Types
export interface Capa {
  capaId: number;
  rcaId: number;
  capaDate: string; // 'YYYY-MM-DD'
  rootCause: string;
  correctiveDetails: string;
  preventiveDetails: string;
  capaRemarks?: string | null;
  capaAttachment?: string | null;
  lastUpdateDate: string;
}

export type CreateCapaDto = Omit<Capa, 'capaId' | 'lastUpdateDate'>;
export type UpdateCapaDto = Partial<CreateCapaDto>;


// --- API Service Functions ---

// Master API
export const masterApi = {
  getAll: () => apiClient.get<Master[]>('/master/sources'),
  getById: (id: number) => apiClient.get<Master>(`/master/sources/${id}`),
  create: (data: CreateMasterDto) => apiClient.post<Master>('/master/sources', data),
  update: (id: number, data: UpdateMasterDto) => apiClient.put(`/master/sources/${id}`, data),
  delete: (id: number) => apiClient.delete(`/master/sources/${id}`),
};

// Master Detail API
export const masterDetailApi = {
  getAll: () => apiClient.get<MasterDetail[]>('/master/details'),
  getById: (id: number) => apiClient.get<MasterDetail>(`/master/details/${id}`),
  create: (data: CreateSourceDetailDto) => apiClient.post<MasterDetail>('/master/details', data),
  update: (id: number, data: UpdateSourceDetailDto) => apiClient.put(`/master/details/${id}`, data),
  delete: (id: number) => apiClient.delete(`/master/details/${id}`),
};

// RCA API
export const rcaApi = {
  getAll: () => apiClient.get<Rca[]>('/rca'),
  getById: (id: number) => apiClient.get<Rca>(`/rca/${id}`),
  create: (data: CreateRcaDto) => apiClient.post<Rca>('/rca', data),
  update: (id: number, data: UpdateRcaDto) => apiClient.put(`/rca/${id}`, data),
  delete: (id: number) => apiClient.delete(`/rca/${id}`),
};

// CAPA API
export const capaApi = {
  getAll: () => apiClient.get<Capa[]>('/capa'),
  getById: (id: number) => apiClient.get<Capa>(`/capa/${id}`),
  create: (data: CreateCapaDto) => apiClient.post<Capa>('/capa', data),
  update: (id: number, data: UpdateCapaDto) => apiClient.put(`/capa/${id}`, data),
  delete: (id: number) => apiClient.delete(`/capa/${id}`),
};


/**
 * Example Usage in a React Component:
 *
 * import { rcaApi, Rca } from './services/api';
 * import { useState, useEffect } from 'react';
 *
 * const MyComponent = () => {
 *   const [rcas, setRcas] = useState<Rca[]>([]);
 *   const [loading, setLoading] = useState(true);
 *
 *   useEffect(() => {
 *     const fetchRcas = async () => {
 *       try {
 *         setLoading(true);
 *         const response = await rcaApi.getAll();
 *         setRcas(response.data);
 *       } catch (error) {
 *         console.error("Failed to fetch RCAs", error);
 *         // show error message to user
 *       } finally {
 *         setLoading(false);
 *       }
 *     };
 *
 *     fetchRcas();
 *   }, []);
 *
 *   if (loading) return <div>Loading...</div>;
 *
 *   return (
 *     <ul>
 *       {rcas.map(rca => (
 *         <li key={rca.rcaId}>{rca.rcaCode}: {rca.rcaDetails}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 */

/**
 * Example of creating a new RCA record:
 *
 * import { rcaApi, CreateRcaDto } from './services/api';
 *
 * const handleCreateRca = async (values: any) => {
 *    const newRca: CreateRcaDto = {
 *        rcaDate: values.RCA_DATE.format('YYYY-MM-DD'),
 *        rcaTargetDate: values.RCA_TARGET_DATE.format('YYYY-MM-DD'),
 *        rcaCode: values.RCA_CODE,
 *        rcaDetails: values.RCA_DETAILS,
 *        responsibleDept: values.RESPONSIBLE_DEPT,
 *        rcaSeverity: values.RCA_SEVERITY,
 *        // Fill other required fields from your form
 *    };
 *
 *    try {
 *        const response = await rcaApi.create(newRca);
 *        console.log('Created new RCA:', response.data);
 *        // Add new RCA to state, show success message, etc.
 *    } catch (error) {
 *        console.error('Failed to create RCA', error);
 *        // Show error message
 *    }
 * }
 */
