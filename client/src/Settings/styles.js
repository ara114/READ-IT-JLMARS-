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
	paper1: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		paddingLeft: theme.spacing(6),
		paddingRight: theme.spacing(6),
	},
	form: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	card: {
		margin: theme.spacing(3),
	},
	buttonSubmit: {
		marginTop: theme.spacing(2),
	},
}))
