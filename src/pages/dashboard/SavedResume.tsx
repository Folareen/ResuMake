import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { db } from '../../../firebase.config'
import ResumeContainer from '../../components/ResumeContainer'
import { showToolbar } from '../../redux/features/resumeSlice'
import { RootState } from '../../redux/store'

const SavedResume = () => {
    const [savedResume, setSavedResume] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState('')

    const { user } = useSelector((state: RootState) => state.auth)
    const { resumeID } = useParams()

    const resumeRef = useRef<React.MutableRefObject<HTMLDivElement> | null>(null)

    const dispatch = useDispatch()

    const showToolbarHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.currentTarget.classList.contains('editable')) {
            console.log('hi', e.currentTarget)
            dispatch(showToolbar(e.currentTarget))
        }
    }

    useEffect(
        () => {
            (
                async () => {
                    try {
                        const resDocSnap = await getDoc(doc(db, `${user.uid}-${user.email}`, resumeID))
                        console.log(resDocSnap.exists())
                        if (resDocSnap.exists()) {
                            setSavedResume(resDocSnap.data().resume)
                        } else {
                            setSavedResume(null)
                        }
                    } catch (error) {
                        setError(error?.message)
                    } finally {
                        setFetching(false)
                    }
                }
            )()
        }, [resumeID, user]
    )

    useEffect(() => {
        if (savedResume) {
            const __ = document.createElement('div')
            __.innerHTML = savedResume

            const __classList = __.firstChild.classList

            const undefinedResumeEl = document.querySelector('.undefined')

            if (undefinedResumeEl) {
                undefinedResumeEl.innerHTML = __.firstChild.innerHTML
                undefinedResumeEl.classList.remove('undefined')
                if (__classList[0] == 'resume') {
                    const last = __classList.length - 1
                    undefinedResumeEl.classList.add(__classList[last])
                } else {
                    undefinedResumeEl.classList.add(__classList[0])
                }


                document.querySelector('.resume-container > div')?.insertBefore(undefinedResumeEl, document.querySelector('.resume')?.nextSibling)
            }


            const allResElements = document.querySelectorAll('.resume-element')
            const allResElementsArr = [...allResElements]
            allResElementsArr.forEach(
                (el) => {
                    el.addEventListener('click', showToolbarHandler)
                }
            )
        }

        return () => {
            const allResElements = document.querySelectorAll('.resume-element')
            const allResElementsArr = [...allResElements]
            allResElementsArr.forEach(
                (el) => {
                    el.removeEventListener('click', showToolbarHandler)
                }
            )
        }
    }, [savedResume])

    if (fetching) {
        return (
            <div>
                fetching resume...
            </div>
        )
    }
    if (!fetching && !savedResume) {
        return (
            <div>
                resume not found...
            </div>
        )
    }

    if (error) {
        return (
            <div>
                {error}
            </div>
        )
    }

    return (
        <ResumeContainer
            resumeRef={resumeRef}
            isSectioned={true}
        >
        </ResumeContainer>
    )
}

export default SavedResume