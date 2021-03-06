import actions from './creators'

export const getCampuses = (offset = 0, limit = 5, callback) => (dispatch, _, { axios }) => {
    dispatch(actions.loading(true))
    axios.get(`/api/campuses?offset=${offset}&limit=${limit}`)
        .then(({ data }) => {
            dispatch(actions.campuses(data))
            dispatch(actions.loading(false))
            if (callback) callback()
        })
        .catch(() => {
            dispatch(actions.error(true, 'Could not get the campuses'))
            dispatch(actions.loading(false))
        })
}
export const getStudents = (offset = 0, limit = 5, callback) => (dispatch, _, { axios }) => {
    dispatch(actions.loading(true))
    axios.get(`/api/students?offset=${offset}&limit=${limit}`)
        .then(({ data }) => {
            dispatch(actions.students(data))
            dispatch(actions.loading(false))
            if (callback) callback()
        }).catch(() => {
            dispatch(actions.error(true, 'Could not get the students'))
            dispatch(actions.loading(false))
        })
}
export const getSingleCampus = id => (dispatch, _, { axios }) => {
    dispatch(actions.loading(true))
    axios.get(`/api/campuses/` + id)
        .then(({ data }) => {
            dispatch(actions.singleCampus(data))
            dispatch(actions.loading(false))
        }).catch(() => {
            dispatch(actions.error(true, 'Could not find that campus'))
            dispatch(actions.loading(false))
        })
}
export const getSingleStudent = id => (dispatch, _, { axios }) => {
    dispatch(actions.loading(true))
    axios.get(`/api/students/` + id)
        .then(({ data }) => {
            dispatch(actions.singleStudent(data))
            dispatch(actions.loading(false))
        }).catch((e) => {
            dispatch(actions.error(true, 'Could not find that student'))
            dispatch(actions.loading(false))
        })
}
export const deleteCampus = id => (dispatch, _, { axios }) => {
    dispatch(actions.loading(true))
    axios.delete('/api/campuses/' + id)
        .then(() => {
            dispatch(actions.deleteCampus(id))
            dispatch(actions.modal(false, '', null))
            dispatch(actions.loading(false))

        }).catch((e) => {
            dispatch(actions.error(true, 'Couldnt do that.'))
            dispatch(actions.modal(false, '', null))
            dispatch(actions.loading(false))
        })
}
export const deleteStudent = id => (dispatch, _, { axios }) => {
    dispatch(actions.loading(true))
    axios.delete('/api/students/' + id)
        .then(() => {
            dispatch(actions.deleteStudent(id))
            dispatch(actions.modal(false, '', null))
            dispatch(actions.loading(false))

        }).catch(() => {
            dispatch(actions.error(true, 'Couldnt do that.'))
            dispatch(actions.modal(false, '', null))
            dispatch(actions.loading(false))
        })
}
export const addCampus = (formValues, redirect) => (dispatch, _, { axios }) => {
    dispatch(actions.loading(true))
    axios.post('/api/campuses', formValues)
        .then(({ data }) => {
            dispatch(actions.addCampus(data))
            dispatch(actions.loading(false))
            redirect('/campuses/' + data.id)
        }).catch((e) => {
            dispatch(actions.error(true, 'Could not create the campus'))
            dispatch(actions.loading(false))
        })
}
export const addStudent = (formValues, redirect) => (dispatch, _, { axios }) => {
    dispatch(actions.loading(true))
    axios.post('/api/students', formValues)
        .then(({ data }) => {
            dispatch(actions.addStudent(data))
            dispatch(actions.loading(false))
            redirect('/students/' + data.id)
        }).catch(() => {
            dispatch(actions.error(true, 'Could not create the student'))
            dispatch(actions.loading(false))
        })
}
export const updateCampus = (id, formValues) => (dispatch, _, { axios }) => {
    dispatch(actions.loading(true))
    axios.put('/api/campuses/' + id, formValues)
        .then(({ data }) => {
            dispatch(actions.updateCampus(data))
            dispatch(actions.loading(false))
        }).catch(() => {
            dispatch(actions.error(true, 'Could not update the campus'))
            dispatch(actions.loading(false))
        })
}
export const updateStudent = (id, formValues, campusWasUpdated) => (dispatch, _, { axios }) => {
    dispatch(actions.loading(true))
    axios.put('/api/students/' + id, formValues)
        .then(async ({ data }) => {
            if (campusWasUpdated) {
                const { data: campus } = await axios.get('/api/campuses/' + formValues.campusId).catch(() => null)
                if (campus) {
                    data.campus = campus
                }
            }
            dispatch(actions.updateStudent(data))
            dispatch(actions.loading(false))
        }).catch(() => {
            dispatch(actions.error(true, 'Could not update the student'))
            dispatch(actions.loading(false))
        })
}
export const getRecentCampuses = () => (dispatch, _, { axios }) => {
    dispatch(actions.loading(true))
    axios.get('/api/campuses/recent')
        .then(({ data }) => {
            dispatch(actions.recentCampuses(data))
            dispatch(actions.loading(false))
        }).catch(e => {
            console.log(e)
            dispatch(actions.loading(false))
            dispatch(actions.error(true, 'Could not get the campuses'))
        })
}
export const getRecentStudents = () => (dispatch, _, { axios }) => {
    dispatch(actions.loading(true))
    axios.get('/api/students/recent')
        .then(({ data }) => {
            dispatch(actions.recentStudents(data))
            dispatch(actions.loading(false))
        }).catch(e => {
            console.log(e)
            dispatch(actions.loading(false))
            dispatch(actions.error(true, 'Could not get the students'))
        })
}
export const setModal = (active, message, confirmationCallback) => actions.modal(active, message, confirmationCallback)

export const setError = (exists, message) => actions.error(exists, message)