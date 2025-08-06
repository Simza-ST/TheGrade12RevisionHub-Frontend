import { debounce } from 'lodash';

export const recordActivity = debounce(async (description, API_BASE_URL, setActivities = null) => {
    try {
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        };
        // Remove /api/user suffix to avoid duplicate /api/user/user/activities
        const baseUrl = API_BASE_URL.replace(/\/api\/user$/, '');
        const response = await fetch(`${baseUrl}/user/activities`, {method: 'POST',
            headers,
            body: JSON.stringify(description),
        });
        const data = await response.json();
        if (response.ok && data.success) {
            if (setActivities) {
                setActivities((prev) => [
                    {
                        id: data.data.id,
                        description: data.data.description,
                        date: data.data.date,
                    },
                    ...prev.slice(0, 9), // Keep only the 10 most recent
                ]);
            }
        } else {
            console.error(data.message || 'Failed to save activity');
        }
    } catch (error) {
        console.error('Error saving activity:', error);
    }
},300);