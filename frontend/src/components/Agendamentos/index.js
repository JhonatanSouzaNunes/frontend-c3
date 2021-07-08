import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Titulo from '../Titulo';
import axios from 'axios';

async function getAgendamentos() {
  try {
    const response = await axios.get('http://localhost:4000/api/agendamentopg');
    console.log(response);
    return response.data.agenda
  } catch (error) {
    console.error(error);
  }
}



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Agendamentos() {
  const classes = useStyles();

  const [agendamento, setAgendamentos] = useState([]);

  useEffect(async () => {
    try {
      let a = await getAgendamentos();
      setAgendamentos(a);
    } catch (error) {
      console.log(error)
    }

  }, []);
  console.log(agendamento)


  return (
    <React.Fragment>
      <Titulo>Agendamentos</Titulo>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>CPF</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Observação</TableCell>
            <TableCell>Nescess. Especiais</TableCell>
            <TableCell align="right">Data/Hora</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agendamento?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.cpf_pessoa}</TableCell>
              <TableCell>{row.nome_pessoa}</TableCell>
              <TableCell>{row.obs_agendamento}</TableCell>
              <TableCell>{row.necess_especiais}</TableCell>
              <TableCell align="right">{row.data_hora_agendamento}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}