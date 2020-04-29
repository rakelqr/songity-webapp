import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function ErrorMessage() {
    const [openErrorDIalog, setErroDialog] = React.useState(false);

    return (
        <div>
            <Dialog>
                <DialogTitle>
                    What? I see an error in this app? Sorry!
                </DialogTitle>
                <DialogContent>

                </DialogContent>
            </Dialog>
        </div>
    )
};
