import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SongDialog from '../components/SongDialog';
import { apiRequest } from '../utils/helpers';
import useErrorHandler from '../hooks/useError';


const songs = [
    {
        _id: '123',
        name: 'test',
        session: '242',
        goodIdea: true,
        soundAttachmentUrl: 'http://example.com/awesome.mp3',
    }, {
        _id: '345',
        name: 'test2',
        session: 'una',
        goodIdea: false,
        soundAttachmentUrl: 'http://example.com/awesome.mp3',
    }, {
        _id: '567',
        name: 'test3',
        session: 'otra',
        goodIdea: true,
        soundAttachmentUrl: 'http://example.com/awesome.mp3',
    }
];



const onDeleteClicked = index => {
    console.log('Clicked in Delete');
};

const useStylesLoggedHome = makeStyles((theme) => ({
    containerOne: {
        padding: theme.spacing(8, 0, 6),
    },
    containerThree: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableGrid:{
        display: 'flex',
    },
}));

const LoggedHome = () => {
    const [userSongs, setUserSongs] = React.useState([]);
    const [openSongDialog, setOpenSongDialog] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const { error, showError } = useErrorHandler(null);

    const closeSongDialog = () => {
        setOpenSongDialog(false);
    };

    const addSong = (e) => {
        e.preventDefault();
        console.log('Clicked in en Add');
        setOpenSongDialog(true);
    };

    const editSong = (e) => {
        e.preventDefault();
        setIsEditing(true);
        setOpenSongDialog(true);
        console.log('Clicked in en Edit');
    };

    const deleteSongHandler = async (e, id) => {
        try {
            e.preventDefault();
            const songToDelete = userSongs.find(song => song._id === id);
            await apiRequest(
                '/login',
                'delete',
                songToDelete,
            );
            console.log('Clicked in en Delete');
        } catch(error) {
            showError(error);
        }
    };


    const classes = useStylesLoggedHome();

    return (
        <div>
            <Container component="main" maxWidth="sm" className={classes.containerOne}>
                <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                    Welcome to your Songity account
                </Typography>
            </Container>
            <Container maxWidth="md" component="main">
                <Grid container className={classes.tableGrid}>
                <Grid item xs={11}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>NAME</TableCell>
                                <TableCell>SESSION</TableCell>
                                <TableCell>GOOD IDEA</TableCell>
                                <TableCell>URL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {songs.map((song, index) => (
                                <TableRow key={song._id}>
                                    <TableCell component="p" variant="h6">{song.name}</TableCell>
                                    <TableCell component="p" variant="h6">{song.session}</TableCell>
                                    <TableCell component="p" variant="h6">{song.goodIdea ? 'Yes' : 'No'}</TableCell>
                                    <TableCell component="p" variant="h6">{song.soundAttachmentUrl}</TableCell>
                                    <TableCell
                                        component={() => (
                                            <div>
                                                <Tooltip title="Edit song">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={(e) => {
                                                            editSong(e, song._id);
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete song">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={(e) => {
                                                            deleteSongHandler(e, song._id);
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <SongDialog
                                                    open={openSongDialog}
                                                    handleClose={closeSongDialog}
                                                    song={song}
                                                    isEditing={isEditing}
                                                />
                                            </div>
                                        )}
                                    />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="Add new song">
                        <IconButton onClick={e => addSong}>
                            <AddIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                </Grid>
                </Grid>
                <SongDialog open={openSongDialog && !isEditing} handleClose={closeSongDialog}/>
            </Container>
            {/* <Container maxWidth="md" component="main" className={classes.containerThree}>
                <Grid>

                </Grid>
                <Grid>

                </Grid>
            </Container> */}
        </div>
    )
}
export default LoggedHome;