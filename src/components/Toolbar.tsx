import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideToolbar, showToolbar } from '../redux/features/toolbarSlice'
import { IoDuplicate } from 'react-icons/io5'
import { BsChevronCompactDown, BsChevronCompactLeft, BsChevronCompactRight, BsChevronCompactUp } from 'react-icons/bs'
import { MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md'
import { TbRowInsertBottom, TbRowInsertTop } from 'react-icons/tb'
import { CgInsertAfterR } from 'react-icons/cg'
import { IoColorPaletteSharp, IoIosColorFill } from 'react-icons/io5'
import { RootState } from '../redux/store'

type ToolbarProps = {
    refresh: boolean,
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
}

const Toolbar = ({ refresh, setRefresh }: ToolbarProps) => {

    const dispatch = useDispatch()
    const { currentEl } = useSelector((state: RootState) => state.toolbar)

    const showToolbarHandler = (e: React.MouseEvent<HTMLElement>) => {
        console.log('showtoolbarr', e, e.currentTarget)
        dispatch(showToolbar(e.currentTarget))
    }

    const duplicateDown = () => {
        const newEl = currentEl?.cloneNode(true) as HTMLElement
        console.log(newEl, 'newEl')
        // const newElement = document.createElement('p')
        // newElement.innerHTML = newEl.innerHTML
        // newElement.setAttribute('contenteditable', 'true')
        // newElement.setAttribute('class', 'editable')
        // newElement.setAttribute('id', `editable-container-${(new Date()).getTime()}`)
        newEl.classList.remove('inline')
        newEl.classList.add('block')
        newEl.addEventListener('click', showToolbarHandler)
        // newElement.addEventListener('select', () => console.log('selectt'))
        // newEl?.children[1]?.addEventListener('select', showToolbarHandler)
        // newEl?.addEventListener('click', () => { console.log('hiii') })
        console.log(currentEl, 'currEl')
        console.log(currentEl?.parentNode, 'currElParent')
        // currentEl?.insertAdjacentHTML("afterend", newElement?.outerHTML);

        currentEl?.parentNode.insertBefore(newEl, currentEl?.nextSibling);

    }
    const duplicateUp = () => {
        const newEl = currentEl?.cloneNode(true) as HTMLElement
        newEl.classList.remove('inline')
        newEl.classList.add('block')
        newEl.addEventListener('click', showToolbarHandler)
        currentEl?.parentNode.insertBefore(newEl, currentEl?.previousSibling || currentEl);
    }
    const duplicateRight = () => {
        const newEl = currentEl?.cloneNode(true) as HTMLElement
        newEl.addEventListener('click', showToolbarHandler)
        currentEl?.parentNode.insertBefore(newEl, currentEl?.nextSibling);
    }
    const moveUp = () => {
        const newEl = currentEl as HTMLElement
        newEl.classList.remove('inline')
        newEl.classList.add('block')
        newEl.addEventListener('click', showToolbarHandler)
        currentEl?.parentNode.insertBefore(newEl, currentEl?.previousSibling);
    }
    const moveDown = () => {
        console.log('move down')
        const newEl = currentEl as HTMLElement
        newEl.classList.remove('inline')
        newEl.classList.add('block')
        newEl.addEventListener('click', showToolbarHandler)
        currentEl?.parentNode?.insertBefore(newEl, currentEl?.nextSibling);
    }
    const insertUp = () => {
        const newEl = currentEl?.cloneNode(true) as HTMLElement
        newEl.innerText = ''
        newEl.classList.remove('inline')
        newEl.classList.add('block')
        newEl.addEventListener('click', showToolbarHandler)
        currentEl?.parentNode.insertBefore(newEl, currentEl?.previousSibling || currentEl);
        newEl.focus()
    }
    const insertDown = () => {
        const newEl = currentEl?.cloneNode(true) as HTMLElement
        newEl.innerText = ''
        newEl.classList.remove('inline')
        newEl.classList.add('block')
        newEl.addEventListener('click', showToolbarHandler)
        currentEl?.parentNode.insertBefore(newEl, currentEl?.nextSibling);
        newEl.focus()
    }
    // const insertInside = () => {
    //     const newEl = currentEl?.cloneNode(true) as HTMLElement
    //     newEl.innerText = ''
    //     newEl.addEventListener('click', showToolbarHandler)
    //     currentEl.appendChild(newEl);
    //     newEl.focus()
    // }


    return (
        <div className='toolbar'>
            <button className='hide-toolbar' onClick={() => {
                dispatch(hideToolbar())
            }}>
                X
            </button>

            <button onClick={() => {
                document.execCommand('bold')
                setRefresh(!refresh)
            }}>
                B
            </button>
            <button onClick={() => {
                document.execCommand('underline')
                setRefresh(!refresh)
            }}>
                U
            </button>
            <button onClick={() => {
                document.execCommand('italic')
                setRefresh(!refresh)
            }}>
                I
            </button>
            <button onClick={() => {
                document.execCommand('indent')
                setRefresh(!refresh)
            }}>
                Id
            </button>
            <button onClick={() => {
                document.execCommand('outdent')
                setRefresh(!refresh)
            }}>
                Ou
            </button>
            <button className='btn' onClick={() => {
            }}>
                <IoColorPaletteSharp />
                <input type='color' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    document.execCommand('foreColor', false, e.target.value)
                }} />
            </button>
            <button className='btn' onClick={() => {
            }}>
                <IoIosColorFill />
                <input type='color' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    document.execCommand('backColor', false, e.target.value)
                }} />
            </button>
            <button style={{ display: 'flex', flexDirection: 'column' }} className='btn' onClick={duplicateDown}>
                <IoDuplicate />
                <BsChevronCompactDown />
            </button>
            <button style={{ display: 'flex', flexDirection: 'column' }} className='btn' onClick={duplicateUp}>
                <BsChevronCompactUp />
                <IoDuplicate />
            </button>
            <button style={{ display: 'flex', flexDirection: 'row' }} className='btn' onClick={duplicateRight}>
                <BsChevronCompactRight />
                <IoDuplicate />
            </button>
            <button className='btn' onClick={moveUp}>
                <MdOutlineKeyboardDoubleArrowUp />
            </button>
            <button className='btn' onClick={moveDown}>
                <MdOutlineKeyboardDoubleArrowDown />
            </button>
            <button className='btn' onClick={insertUp}>
                <TbRowInsertTop />
            </button>
            <button className='btn' onClick={insertDown}>
                <TbRowInsertBottom />
            </button>
            {/* <button className='btn' onClick={insertInside}>
                            <CgInsertAfterR />
                        </button> */}
            <button className='btn' onClick={() => {
                currentEl?.remove()

            }}>
                x
            </button>
        </div>
    )
}

export default Toolbar