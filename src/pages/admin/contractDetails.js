import React, { useEffect, useState } from "react";
import { MainContainer } from "../../style/mainContainer";
import { useSelector } from "react-redux";
import { Box, Button, Chip, Divider, List, ListItem, ListItemText, ListSubheader, Paper, Skeleton, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import QualificationWc from "../../components/qalification/QualificationWc";
import QualificationQualité from "../../components/qalification/QualificationQualité";
import QualificationSav from "../../components/qalification/QualificationSav";
import { grey } from "@mui/material/colors";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getContract } from "../../functions/contract";
import moment from "moment";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';



const ContractDetails = () => {

    const {drawer, user  } = useSelector((state) => ({...state}))
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const navigate = useNavigate();


    const [data, setData] = useState([]);
    
    const {quality, sav, wc} = data

    const [loading, setLoading] = useState(false);

    const [otherContractLink, setOtherContractLink] = useState("");
    const history = useNavigate()

    const { slug, energie } = useParams();
 
    const loadContract = () => {
      setLoading(true)
      getContract(slug, energie).then((c) => {
        const {contract , otherContractLink} = c.data;
        setData(contract);
        setOtherContractLink(otherContractLink)
        setLoading(false)
         });
    };
    useEffect(() => {
      loadContract();
      console.log(slug, energie)
    }, [slug, energie]);

    const handleOtherContractClick = (event) => {
      event.preventDefault();
      history(otherContractLink)
    };

    const handleBackClick = () => {
      if (user.role === 'admin') {
        navigate('/admin');
      }
      if (user.role === 'sav') {
        navigate('/sav');
      }
      if (user.role === 'quality') {
        navigate('/quality');
      }
      if (user.role === 'wc') {
        navigate('/wc');
      }
    };

    return(
     <MainContainer open={drawer} sx={{  backgroundColor : darkMode ? grey[800]  : grey[100] , height:"100vh"}}>
        <Box sx={{ m: 2}}>
            <Box sx={{display : 'flex' , justifyContent:'space-between'}}>
            <Stack direction="row" spacing={1}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Détail de la souscription
      </Typography>
      {otherContractLink && <Chip
            onClick={handleOtherContractClick}
            label=" switch contrat"
            icon={<ChangeCircleIcon />}
            />
             
            }
              </Stack>
        
      
      <Stack direction="row" spacing={2}>
        {quality ? <QualificationQualité data={quality} /> : null}
        {wc ? <QualificationWc data={wc} /> : null}
        {sav ? <QualificationSav data={sav} /> : null}
  <Button variant="outlined" onClick={handleBackClick} size="small" >retour</Button>
</Stack>
</Box>
      <Grid container spacing={2} sx={{ mt: 2 }} >
        <Grid xs={6}>
        <Paper elevation={3} >
        <List
      sx={{ width: '100%' }}
      subheader={<ListSubheader>Détail contrat</ListSubheader>}
    >
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Ref contrat" />
        {!loading ?  <Typography >{data.contratRef}</Typography>
        :<Skeleton width={210} animation="wave" />
        }
       
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Ref client" />
        {!loading ? <Typography >{data.clientRef}</Typography>
         :<Skeleton width={210} animation="wave" />
        }
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Énergie" />
        {!loading ?<Typography >{data.energie}</Typography>
        :<Skeleton width={80} animation="wave" />
      }
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Point de livraison" />
        {!loading ? <Typography >{data.Point_de_livraison}</Typography>
        :<Skeleton width={150} animation="wave" />
      }
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Partenaire" />
        {!loading ?  <Typography >{data.Nom_du_partenaire}</Typography>
         :<Skeleton width={150} animation="wave" />
        }
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Date début" />
        {!loading ? <Typography >{moment(data.date_de_début).format('DD/MM/YYYY')}</Typography>
        :<Skeleton width={130} animation="wave" />
      }
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Date de signature" />
        {!loading ? <Typography >{moment(data.date_de_la_signature).format('DD/MM/YYYY')}</Typography>
         :<Skeleton width={130} animation="wave" />
        }
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Mensualité" />
        {!loading ? <Typography >{data.Mensualité}</Typography>
        :<Skeleton width={40} animation="wave" />
      }
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Statut" />
      {!loading ?<Typography >{data.Statut} </Typography>
        :<Skeleton width={80} animation="wave" />
      }
      </ListItem>
      <Divider  />
      <ListItem sx={{fontWeight : 700}} >
        <ListItemText sx={{fontWeight : 700}} id="switch-list-label-wifi" primary="Puissance" />
        {!loading ? <Typography >{data.Puissance}</Typography>
        :<Skeleton width={40} animation="wave" />
      }
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Offre" />
        {!loading ?  <Typography >{data.Offre}</Typography>
        :<Skeleton width={70} animation="wave" />
      }
      </ListItem>
    </List>
    </Paper>
        </Grid>
        <Grid xs={6}>
        <Paper elevation={3} >
        <List
      sx={{ width: '100%' }}
      subheader={<ListSubheader>Détail client</ListSubheader>}
    >
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Contact" />
        {!loading ?  <Typography >{data.Civility} {data.Prénom} {data.Nom}</Typography>
        :<Skeleton width={210} animation="wave" />
      }
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Tel" />
        {!loading ?  <Typography >{data.Tél}</Typography>
        :<Skeleton width={210} animation="wave" />
      }
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Email" />
        {!loading ? <Typography >{data.Email}</Typography>
        :<Skeleton width={210} animation="wave" />
      }
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Adresse" />
        {!loading ? <Typography >{data.Adresse} {data.Code_postal} {data.Commune}</Typography>
        :<Skeleton width={210} animation="wave" />
      }
      </ListItem>      
    </List>
    </Paper>
    
    {user && user.role === 'admin' && (
  <>
    <Paper elevation={3} sx={{mt:1}}>
        <List
      sx={{ width: '100%' }}
      subheader={<ListSubheader>Détail qualité </ListSubheader>}
    >
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Qualification " />
        <Typography >
        { quality &&  quality.qualification}
      </Typography>
      </ListItem>
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Comentaire" />
        <Typography >
        {quality && quality.comment && quality.comment.slice(0, 80) + (quality.comment.length > 50 ? '...' : '')}
        </Typography>
      </ListItem>
    </List>
    </Paper>
    <Paper elevation={3} sx={{mt:1}}>
        <List
      sx={{ width: '100%' }}
      subheader={<ListSubheader>Détail welcome call </ListSubheader>}
    >
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Qualification " />
        {!loading ? <Typography >{ wc &&  wc.qualification}</Typography>
        :<Skeleton width={210} animation="wave" />
      }
      </ListItem>
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Comentaire" />
        {!loading ?  <Typography >{ wc &&  wc.comment}</Typography>
        :<Skeleton width={210} animation="wave" />
      }
      </ListItem>
    </List>
    </Paper>
    <Paper elevation={3} sx={{mt:1}}>
        <List
      sx={{ width: '100%' }}
      subheader={<ListSubheader>Détail sav</ListSubheader>}
    >
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Qualification " />
        {!loading ? <Typography >{ sav &&  sav.qualification}</Typography>
        :<Skeleton width={210} animation="wave" />
      }
      </ListItem>
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Comentaire" />
        {!loading ? <Typography >{ sav &&  sav.comment} </Typography>
        :<Skeleton width={210} animation="wave" />
      }
      </ListItem>
    </List>
    </Paper>
  </>
)}

{user && user.role === 'quality' && (
  <>
     <Paper elevation={3} sx={{mt:1}}>
        <List
      sx={{ width: '100%' }}
      subheader={<ListSubheader>Détail welcome call </ListSubheader>}
    >
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Qualification " />
        {!loading ? <Typography >{ wc &&  wc.qualification}</Typography>
        :<Skeleton width={210} animation="wave" />
      }
      </ListItem>
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Comentaire" />
        {!loading ?  <Typography >{ wc &&  wc.comment}</Typography>
        :<Skeleton width={210} animation="wave" />
      }
      </ListItem>
    </List>
    </Paper>
  </>
)}

{user && user.role === 'wc' && (
  <>
     <Paper elevation={3} sx={{mt:1}}>
        <List
      sx={{ width: '100%' }}
      subheader={<ListSubheader>Détail qualité </ListSubheader>}
    >
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Qualification " />
        <Typography >
        { quality &&  quality.qualification}
      </Typography>
      </ListItem>
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Comentaire" />
        <Typography >
        {quality && quality.comment && quality.comment.slice(0, 80) + (quality.comment.length > 50 ? '...' : '')}
        </Typography>
      </ListItem>
    </List>
    </Paper>
  </>
)}

{user && user.role === 'sav' && (
  <>
  <Paper elevation={3} sx={{mt:1}}>
        <List
      sx={{ width: '100%' }}
      subheader={<ListSubheader>Détail qualité </ListSubheader>}
    >
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Qualification " />
        <Typography >
        { quality &&  quality.qualification}
      </Typography>
      </ListItem>
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Comentaire" />
        <Typography >
        {quality && quality.comment && quality.comment.slice(0, 80) + (quality.comment.length > 50 ? '...' : '')}
        </Typography>
      </ListItem>
    </List>
    </Paper> 
    <Paper elevation={3} sx={{mt:1}}>
        <List
      sx={{ width: '100%' }}
      subheader={<ListSubheader>Détail welcome call </ListSubheader>}
    >
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Qualification " />
        {!loading ? <Typography >{ wc &&  wc.qualification}</Typography>
        :<Skeleton width={210} animation="wave" />
      }
      </ListItem>
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Comentaire" />
        {!loading ?  <Typography >{ wc &&  wc.comment}</Typography>
        :<Skeleton width={210} animation="wave" />
      }
      </ListItem>
    </List>
    </Paper>
     </>
)}
   
        </Grid>
      </Grid>
      </Box>

        
     </MainContainer>
    )
}

export default ContractDetails
