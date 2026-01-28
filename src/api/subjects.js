import api from './client';

export const subjectsApi = {
    getAll: () => api.get('/subjects'),
    getById: (id) => api.get(`/subjects/${id}`),
    create: (data) => api.post('/subjects', data),
    delete: (id) => api.delete(`/subjects/${id}`),

    // Student enrollment
    getStudents: (id) => api.get(`/subjects/${id}/students`),
    addStudent: (id, studentId) => api.post(`/subjects/${id}/students`, { studentId }),
    removeStudent: (id, studentId) => api.delete(`/subjects/${id}/students/${studentId}`),
    getAvailableStudents: (id) => api.get(`/subjects/${id}/available-students`),
};
