import { Medication } from '../utils/types/types'

/**
 * Fetch medications from the API.
 * @returns {Promise<Medication[]>} A promise that resolves to an array of medications.
 */
export const fetchMedications = async (): Promise<Medication[]> => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/table-data`
        )
        if (!response.ok) {
            throw new Error(
                `Error fetching medications: ${response.statusText}`
            )
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}
