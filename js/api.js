const API_URL = 'https://dvkvmjdefaytycdbsntd.supabase.co/rest/v1';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2a3ZtamRlZmF5dHljZGJzbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MjE1MjAsImV4cCI6MjA1OTI5NzUyMH0.wYHbfTAJyIp2CLfU4LcIJfJAMrVq41zUK6kw5GZ01ts';

const api = {
    headers: {
        'apikey': API_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    },

    async getAsignaturas() {
        try {
            const response = await fetch(`${API_URL}/asignatura?select=*`, {
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error('Failed to fetch asignaturas');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching asignaturas:', error);
            throw error;
        }
    },

    async getAsignatureByCode(codigo) {
        try {
            const response = await fetch(`${API_URL}/asignatura?codigo=eq.${codigo}&select=*`, {
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error('Failed to fetch asignature by code');
            }

            const data = await response.json();
            return data[0] || null;
        } catch (error) {
            console.error(`Error fetching asignature by code ${codigo}:`, error);
            throw error;
        }
    },

    async updateAsignature(codigo, asignature) {
        try {
            const response = await fetch(`${API_URL}/asignatura?codigo=eq.${codigo}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(asignature) 
            });

            if (!response.ok) {
                throw new Error('Failed to update materia');
            }

            return await response.json();
        } catch (error) {
            console.error(`Error updating materia with codigo ${codigo}:`, error);
            throw error;
        }
    },

    async getStudentsByAsignature(codigoMateria) {
        try {
            const response = await fetch(`${API_URL}/estudiantes?codigo_materia=eq.${codigoMateria}&select=*`, {
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error('Failed to fetch students by asignature');
            }

            return await response.json();
        } catch (error) {
            console.error(`Error fetching students for asignature ${codigoMateria}:`, error);
            throw error;
        }
    },
};
