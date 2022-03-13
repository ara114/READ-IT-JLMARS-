import React, { useCallback, useEffect, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './TextEditor.css'
// import { io } from 'socket.io-client'
// import {useParams} from 'react-router-dom';

const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ font: [] }],
	[{ list: 'ordered' }, { list: 'bullet' }],
	['bold', 'italic', 'underline'],
	[{ color: [] }, { background: [] }],
	[{ script: 'sub' }, { script: 'super' }],
	[{ align: [] }],
	['blockquote', 'code-block'],
	['clean'],
]
export default function MashupTextEditor(props) {
	// const {id: docID} = useParams();
	const docID = props.docID
	const docID2 = props.docID2
	// const docIDslice = docID.slice(0, 7);
	// const docIDslice2 = docID.slice(7);
	// const [socket, setSocket] = useState()
	const [quill, setQuill] = useState()
	console.log(docID)

	// useEffect(() => {
	// 	const s = io('http://localhost:5000')
	// 	setSocket(s)

	// 	return () => {
	// 		s.disconnect()
	// 	}
	// }, [])

	useEffect(() => {
		if (props.socket == null || quill == null) return

		props.socket.once('load-document-mashup', (doc) => {
			props.setStoryData(doc)
			quill.setContents(doc.story)
			quill.enable()
			
		})
			props.socket.emit('get-document-mashup', {docID: docID, stry: {...props.storyData, storyID: docID2}})
	}, [props.socket,props.setStoryData, quill, docID])

	useEffect(() => {
		if (props.socket == null || quill == null) return

		const interval = setInterval(() => {
			props.socket.emit('save-document-mashup', quill.getContents())
			props.socket.emit('save-mashup', props.storyData)
		}, SAVE_INTERVAL_MS)
		return () => {
			clearInterval(interval)
			// props.setStoryData({...props.storyData, story: quill.getContents()});
			// console.log(props.storyData);
		}
	}, [props.socket,props.storyData, quill])

	useEffect(() => {
		if (props.socket == null || quill == null) return
		const handler = (delta) => {
			quill.updateContents(delta)
		}
		props.socket.on('receive-changes-mashup', handler)

		return () => {
			props.socket.off('receive-changes-mashup', handler)

		}
	}, [props.socket, quill])

	useEffect(() => {
		if (props.socket == null || quill == null) return
		const handler = (delta, oldDelta, source) => {
			if (source !== 'user') return
			props.socket.emit('send-changes-mashup', delta)
		}
		quill.on('text-change-mashup', handler)

		return () => {
			quill.off('text-change-mashup', handler)
		}
	}, [props.socket, quill])

	const wrapperRef = useCallback((wrapper) => {
		if (wrapper == null) return
		wrapper.innerHTML = ''
		const editor = document.createElement('div')
		wrapper.append(editor)
		const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } })
		q.disable()
		q.setText('Loading...')
		setQuill(q)
	}, [])

	return <div className='text-content' ref={wrapperRef}></div>
}
