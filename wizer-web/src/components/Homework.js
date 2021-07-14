import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
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
    <Card className={props.finished!=='False'? classes.finishedRoot: classes.root}>
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
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
    </Card>
    );
}

export default Homework;
