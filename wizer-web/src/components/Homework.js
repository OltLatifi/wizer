import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        minWidth: 250,
        maxWidth: 350,
        margin: '2%',
        color: 'black',
        borderLeft: '6px solid black',
        backgroundColor: '#ebebeb',
    },

    finishedRoot: {
        minWidth: 250,
        maxWidth: 350,
        margin: '2%',
        color: 'black',
        borderLeft: '6px solid black',
        backgroundColor: 'white',
      },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    secondary: {
        fontSize: 14,
        color: '#343536',
        marginBottom: 12,
    },
  });

function Homework(props) {
    const classes = useStyles();

    

    return (
    <Card className={props.finished!=='✅'? classes.root: classes.finishedRoot}>
        <CardContent>
          <Typography className={classes.secondary} gutterBottom>
            Due: {props.due_date} | Finished: {props.finished}
          </Typography>
          <Typography variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography className={classes.secondary}>
            In the {props.subject} subject
          </Typography>
          <Typography variant="body2" component="p">
            {props.description}
          </Typography>
        </CardContent>
        {props.deleteButton}
        
    </Card>
    );
}

export default Homework;
