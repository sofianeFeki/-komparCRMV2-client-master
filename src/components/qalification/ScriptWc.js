import React, { useState } from "react";
import DraggableDialog from "../dialog";
import { Stack, Typography } from "@mui/material";
import { SupportAgent } from "@mui/icons-material";
import { useSelector } from "react-redux";
import moment from "moment";

const ScriptWc = ({ data }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [open, setOpen] = useState(false);

  const content = (
    <Stack spacing={2} width={830} mt={1}>
      <Typography variant="subtitle1">
        Je vous appelle pour vous souhaiter la bienvenue et vous confirmer la
        validation de votre contrat OHM Énergie. Afin de valider votre contrat
        de fourniture d'énergie, je dois réaliser un résumé de ce que mon
        collègue vous a présenté. M'autorisez-vous, à des fins de conformité,
        d'enregistrer les minutes qui viennent ? Pour avoir plus d'information
        sur la protection des données personnelles chez Ohm énergie vous pouvez
        consulter la politique de confidentialité sur notre site internet
        www.ohm-energie.com. Pour rappel, mon collègue vous a contacté le{" "}
        <strong>
          {moment(data.date_de_la_signature).format("DD/MM/YYYY")}
        </strong>{" "}
        pour vous proposer un contrat de <strong>{data.energie}</strong> .
        <ol>
          <li>
            Pouvez-vous me confirmer les coordonnées communiquées préalablement{" "}
            <br />
            <strong>
              - {data.Civility} {data.Prénom} {data.Nom} <br />- {data.Email}{" "}
              <br />- {data.Adresse} {data.Code_postal} {data.Commune}
            </strong>
          </li>
          <li>
            {" "}
            Pouvez-vous confirmer que vous avez bien donner votre autorisation
            pour accéder à vos données de consommation annuelles [Si
            électricité] et à votre puissance souscrite et votre option
            tarifaire ?
          </li>
          <li>
            {" "}
            L'offre que mon collègue vous a proposée est l'offre{" "}
            <strong>{data.Offre}</strong> <br />
            <strong>- si électricité</strong> : Vous avez indiqué choisir
            l'option (HP/HC - Base) et que la puissance souscrite choisie est de{" "}
            <strong>{data.Puissance}</strong> .
            <br />
            <strong>- si gaz</strong> : Vous me confirmez avoir bien compris que
            le prix de votre kWh HT de gaz est un prix du marché révisable
            jusqu’à 4 fois par an avec un délai de prévenance d’un mois.
          </li>
          <li>
            Dans ces conditions, je vous rappelle que votre mensualité est de{" "}
            <strong>{data.Mensualité} € TTC</strong> avec un prix du kWh en HT ,
            Taxes et Contributions et que le prix de l'abonnement hors TVA,Taxes
            et Contributions.
          </li>{" "}
          <br />
          <Typography variant="subtitle1">
            {" "}
            <strong>
              - Je me permets de vous faire les rappels suivants :
            </strong>{" "}
          </Typography>
          <br />
          <li>
            Le contrat est conclu pour une durée indéterminée, il est sans
            engagement. Il n'y a ni frais de rétractation ni de résiliation.
            Sachez que vous disposez d'un délai de rétractation de 14 jours.
          </li>
          <li>
            Vous me confirmez avoir bien compris Vous me confirmez avoir compris
            que vous changiez de fournisseur pour rejoindre Ohm énergie et que
            l'activation votre contrat sera le{" "}
            <strong>{moment(data.date_de_début).format("DD/MM/YYYY")}</strong> ?
          </li>
          <li>
            Sachez que les prix proposés peuvent faire l'objet d'une évolution
            tarifaire. Toute évolution tarifaire vous serait communiquée par
            e-mail 30 jours avant son entrée en vigueur, avec la possibilité de
            résilier sans frais, conformément à l'article L224-10 du Code de
            Consommation.
          </li>
          <li>
            Vous me confirmez avoir compris qu’un 1erprélèvement correspondant
            au prorata de votre 1èremensualité sera réalisé 14 jours avant
            l'activation de votre compteur ?
          </li>
          <li>
            Vous me confirmez avoir été informé de ne pas résilier votre contrat
            actuel par vos soins afin de ne pas risquer une interruption de
            service avant votre activation chez Ohm Energie ?{" "}
          </li>
          <li>
            Vous me confirmez avoir bien reçu les 4 mails relatifs à votre
            souscription (Mandat SEPA, Mail Signature, Mail de Bienvenue, Mail
            accès Espace Client) et les pièces jointes (CGV, Grille tarifaire,
            CPV) ?
          </li>
          <li>
            Enfin Pouvez-vous me confirmez votre accord de souscription à ce
            contrat, dont la mensualité est de{" "}
            <strong>{data.Mensualité} €</strong> ?
          </li>
        </ol>
      </Typography>
    </Stack>
  );
  return (
    <>
      {user && (user.role === "admin" || user.role === "wc") ? (
        <DraggableDialog
          variant="contained"
          startIcon=""
          chipIcon={<SupportAgent />}
          buttonText="script wc"
          title="script wc"
          text={content}
          setOpen={setOpen}
          open={open}
        />
      ) : null}
    </>
  );
};

export default ScriptWc;
