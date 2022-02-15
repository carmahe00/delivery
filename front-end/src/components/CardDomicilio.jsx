import React from 'react'
import { Card, CardContent, CardActions, IconButton, Collapse } from '@mui/material'
import { ModeEdit as ModeEditIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Typography } from '@material-ui/core'
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const CardPedido = ({ pedido }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Grid item xs={12} sm={3} >
            <Card elevation={6} >
                <CardContent sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridAutoRows: '30px', justifyItems: 'space-between', maxWidth: '100%' }} >
                    <Typography variant="body2" >
                        Servicio:
                    </Typography>
                    <Typography variant="body2" >
                        {pedido.id_pedido}
                    </Typography>

                    <Typography variant="body2" >
                        Estado:
                    </Typography>
                    <Typography variant="body2" >
                        {pedido.estado}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing >
                    <IconButton>
                        <ModeEditIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit >
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                            aside for 10 minutes.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    )
}

export default CardPedido