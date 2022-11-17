import React from 'react';
import Grid from "@mui/material/Grid";

const Characteristic = ({characteristic}) => {
    return (
        <Grid item className="characteristic">
            {characteristic === undefined && <span className="Montserrat-text medium small-padding">{"product.not-found.characteristic"}</span>}
            {characteristic && (
                Object.entries(characteristic).map(([key, value]) => {
                    return (<div>
                        <span className="Montserrat-text medium small-padding">{key === "additionalParams" ? "Additonal infromation" : key}</span>
                        <span className="Montserrat-text medium small-padding">:</span>
                        <span className="Montserrat-text medium small-padding">{value}</span>
                    </div>)
                })
            )}
        </Grid>
    )
}

export default Characteristic;