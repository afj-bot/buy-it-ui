import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const ProductUserInformation = ({createdBy}) => {
    const [isLoading, setLoading] = useState(createdBy !== undefined);

    useEffect(() => {
        setLoading(createdBy !== undefined);
    }, [createdBy]);
    

    return (
        <Grid item className="user">
            {isLoading && <ul style={{listStyle: "none"}}>
                <li className="Montserrat-text medium small-padding">User: {createdBy?.firstName} {createdBy?.lastName}</li>
                <li className="Montserrat-text medium small-padding">Email: {createdBy?.email}</li>
            </ul>}
            {!isLoading && (<CircularProgress />)}
        </Grid>
    )
}

export default ProductUserInformation;