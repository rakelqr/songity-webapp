import React from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import validator from 'validator';
import useErrorHandler from '../hooks/useError';
import { authContext } from '../context/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import { apiRequest } from '../utils/helpers';

const useStylesSongDialog = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

const SongDialog = (props) =>  {
    const [songName, setSongName] = React.useState('');
    const [songSession, setSongSession] = React.useState('');
    const [songGoodIdea, setSongGoodIdea] = React.useState(false);
    const [userId, setUserId] = React.useState('');
    const { error, showError } = useErrorHandler(null);
    const auth = React.useContext(authContext);

    const clearData = () => {
        setSongName('');
        setSongSession('');
        setSongGoodIdea('');
    };

    const fillEditedSong = (song) => {
        const editedData = song;
        if (!validator.isEmpty(songName)) {
            editedData['name'] = songName;
        }
        if (!validator.isEmpty(songSession)) {
            editedData['session'] = songSession;
        }
        if(songGoodIdea !== song.goodIdea ) {
            editedData['goodIdea'] = songGoodIdea;
        }
        return editedData;
    }

    const editSong = async (song) => {
        const editedData = fillEditedSong(song);
        try {
            const sendSongToEdit = await apiRequest(
                '/profile/songs/editSong',
                'put',
                editedData,
            );
            console.log('data from my res to edit Song', sendSongToEdit);
        } catch (err) {
            showError(err.message);
        }
    };

    const createSong = async () => {
        const newSong = {
            name: songName,
            session: songSession,
            goodIdea: songGoodIdea,
            userId: auth.id
        };
        try {
            const sendSongToCreate = await apiRequest(
                '/profile/songs/createSong',
                'post',
                newSong,
            );
            console.log('data from my res to new Song', sendSongToCreate);

        } catch (err) {
            showError(err.message)
        }
    };
    const { isEditing, song } = props;
    const classes = useStylesSongDialog();

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>
                    {isEditing ? 'Change your actual data from this song' : 'Please, fill the fields for your new song'}
                </DialogTitle>
                <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="nameSong"
                                    label="Name of your Song"
                                    name="nameSong"
                                    margin="dense"
                                    defaultValue={isEditing ? song.name : ''}
                                    autoFocus
                                    required
                                    fullWidth
                                    // value={songName}
                                    onChange={e => setSongName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="session"
                                    label="Session of your song"
                                    name="session"
                                    defaultValue={isEditing ? song.session : ''}
                                    required
                                    fullWidth
                                    // value={songSession}
                                    onChange={e => setSongSession(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    className={classes.formControlLabel}
                                    control={
                                        <Switch
                                            color="primary"
                                            checked={isEditing ? song.goodIdea : false} 
                                            onChange={e => setSongGoodIdea(e.target.checked)}
                                        />}
                                    label="It was a good idea? Tell us"
                                />
                            </Grid>
                            </Grid>
                </DialogContent>
                <DialogActions>
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary" className={classes.submit}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={isEditing ? editSong(song) : createSong}
                        >
                            {isEditing ? 'Edit your song' : 'Create a new song'}
                        </Button>
                    </DialogActions>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default SongDialog;
