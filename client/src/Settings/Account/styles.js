import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			marginTop: theme.spacing(2),
		},
	},
	paper: {
		padding: theme.spacing(3),
	},
	form: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	buttonSubmit: {
		marginTop: theme.spacing(2),
	},
}))
