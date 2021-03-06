import {
    CAMPUSES,
    STUDENTS,
    ERROR,
    LOADING,
    SINGLE_CAMPUS,
    SINGLE_STUDENT,
    MODAL,
    DELETE_CAMPUS,
    DELETE_STUDENT,
    ADD_CAMPUS,
    ADD_STUDENT,
    UPDATE_CAMPUS,
    UPDATE_STUDENT,
    RECENT_CAMPUSES,
    RECENT_STUDENTS
} from './types'

export default {
    campuses: ({ offset, data }) => ({
        type: CAMPUSES,
        offset,
        data
    }),
    students: ({ offset, data }) => ({
        type: STUDENTS,
        offset,
        data
    }),
    error: (exists, message = 'There was an error') => ({
        type: ERROR,
        exists,
        message
    }),
    loading: (isLoading = false) => ({
        type: LOADING,
        isLoading
    }),
    singleStudent: student => ({
        type: SINGLE_STUDENT,
        student
    }),
    singleCampus: campus => ({
        type: SINGLE_CAMPUS,
        campus,
    }),
    modal: (active, message, confirmationCallback) => ({
        type: MODAL,
        active, message, confirmationCallback
    }),
    deleteCampus: id => ({
        type: DELETE_CAMPUS,
        id
    }),
    deleteStudent: id => ({
        type: DELETE_STUDENT,
        id
    }),
    addCampus: campus => ({
        type: ADD_CAMPUS,
        campus
    }),
    addStudent: student => ({
        type: ADD_STUDENT,
        student
    }),
    updateCampus: campus => ({
        type: UPDATE_CAMPUS,
        campus
    }),
    updateStudent: student => ({
        type: UPDATE_STUDENT,
        student
    }),
    recentCampuses: campuses => ({
        type: RECENT_CAMPUSES,
        campuses
    }),
    recentStudents: students => ({
        type: RECENT_STUDENTS,
        students
    })
}